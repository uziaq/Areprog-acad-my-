/**
 * QCM de chapitre (F13, F14, F16) : tirage dans la banque, réponses masquées jusqu'à la soumission,
 * seuil de réussite et règle « 100 % sur les questions sécurité », remédiation.
 */
import { useState } from 'preact/hooks';
import { chargerCorrections } from '../lib/corrections.ts';
import { noterQcm, tirer, type ResultatQcm } from '../lib/evaluation/notation.ts';
import { libelleSection, pourcentage, urlSection } from '../lib/plan.ts';
import { enregistrerTentative, nouvelId } from '../lib/stockage/db.ts';
import type { Correction, Enonce, Plan, Reponse } from '../lib/types.ts';
import { ChampReponse, reponseInitiale, reponseRenseignee } from './ChampReponse.tsx';

interface Props {
  plan: Plan;
  chapitre: string;
  titreChapitre: string;
  version: string;
  banque: Enonce[];
  urlCorrections: string;
  tailleMinBanque: number;
}

type Phase =
  | { nom: 'accueil' }
  | { nom: 'questions'; avertissement?: string }
  | { nom: 'correction' }
  | { nom: 'resultat'; resultat: ResultatQcm; corrections: Record<string, Correction>; sauvegarde: boolean }
  | { nom: 'erreur'; message: string };

function texteReponse(e: Enonce, r: Reponse | null | undefined): string {
  if (!r) return 'sans réponse';
  if (r.kind === 'numerique') return r.valeur ? `${r.valeur} ${r.unite}` : 'sans réponse';
  const t = (id: string) => e.propositions?.find((p) => p.id === id)?.texte ?? id;
  if (r.kind === 'ordre') return r.ids.map((id, i) => `${i + 1}. ${t(id)}`).join(' ; ');
  return r.ids.length ? r.ids.map(t).join(' ; ') : 'sans réponse';
}

function texteCorrect(e: Enonce, c: Correction): string {
  const t = (id: string) => e.propositions?.find((p) => p.id === id)?.texte ?? id;
  if (c.valeur !== undefined) return `${c.valeur.toLocaleString('fr-FR')} ${c.unite ?? ''}`;
  if (c.ordre) return c.ordre.map((id, i) => `${i + 1}. ${t(id)}`).join(' ; ');
  return (c.bonnes ?? []).map(t).join(' ; ');
}

export default function Qcm({ plan, chapitre, titreChapitre, version, banque, urlCorrections, tailleMinBanque }: Props) {
  const [phase, setPhase] = useState<Phase>({ nom: 'accueil' });
  const [tirage, setTirage] = useState<Enonce[]>([]);
  const [reponses, setReponses] = useState<Record<string, Reponse | null>>({});
  const [debut, setDebut] = useState(0);
  const seuils = plan.seuils;

  function commencer() {
    const graine = Date.now() % 2147483647;
    const questions = tirer(banque, seuils.questions_par_tirage, graine).map((q) =>
      q.type === 'ordonnancement' && q.propositions ? { ...q, propositions: tirer(q.propositions, q.propositions.length, graine + 1) } : q,
    );
    setTirage(questions);
    setReponses(Object.fromEntries(questions.map((q) => [q.id, reponseInitiale(q)])));
    setDebut(Date.now());
    setPhase({ nom: 'questions' });
    window.scrollTo({ top: 0 });
  }

  async function soumettre(confirme: boolean) {
    const manquantes = tirage.filter((q) => q.type !== 'ordonnancement' && !reponseRenseignee(reponses[q.id] ?? null)).length;
    if (manquantes > 0 && !confirme) {
      return setPhase({ nom: 'questions', avertissement: `${manquantes} question(s) sans réponse : elles compteront comme fausses.` });
    }
    setPhase({ nom: 'correction' });
    try {
      const { corrections } = await chargerCorrections(urlCorrections);
      const resultat = noterQcm(tirage, reponses, corrections, seuils);
      let sauvegarde = true;
      try {
        await enregistrerTentative({
          id: nouvelId(),
          type: 'qcm',
          ref: chapitre,
          chapitre,
          version,
          date: new Date().toISOString(),
          score: resultat.score,
          reussi: resultat.reussi,
          securite_ok: resultat.securite_ok,
          duree_s: Math.round((Date.now() - debut) / 1000),
          details: resultat.details,
        });
      } catch {
        sauvegarde = false;
      }
      setPhase({ nom: 'resultat', resultat, corrections, sauvegarde });
      window.scrollTo({ top: 0 });
    } catch (e) {
      setPhase({ nom: 'erreur', message: `${(e as Error).message}. Vos réponses sont conservées : réessayez.` });
    }
  }

  if (phase.nom === 'accueil') {
    return (
      <div class="carte pile" data-testid="qcm-accueil">
        <p>
          {Math.min(banque.length, seuils.questions_par_tirage)} questions tirées au hasard dans une banque de {banque.length}.
          Réussite : au moins <strong>{pourcentage(seuils.qcm_reussite)}</strong> de bonnes réponses <strong>et</strong>{' '}
          {pourcentage(seuils.qcm_securite)} sur les questions marquées « sécurité ».
        </p>
        <p class="note">Le corrigé s'affiche seulement après la validation de vos réponses.</p>
        {banque.length < tailleMinBanque && (
          <p class="alerte">Banque en cours de rédaction : {banque.length} questions sur les {tailleMinBanque} prévues. Les reprises tireront souvent les mêmes questions.</p>
        )}
        <div class="actions">
          <button class="bouton" type="button" onClick={commencer}>Commencer le QCM</button>
        </div>
      </div>
    );
  }

  if (phase.nom === 'resultat') {
    const { resultat, corrections } = phase;
    return (
      <div class="pile" data-testid="qcm-resultat">
        <div class="carte" role="status">
          <p class="score">{pourcentage(resultat.score)}</p>
          <p class="verdict-titre">
            {resultat.reussi ? (
              <span class="badge badge--succes">✓ QCM réussi</span>
            ) : (
              <span class="badge badge--erreur">✗ QCM non réussi</span>
            )}
          </p>
          {!resultat.securite_ok && (
            <p class="alerte">Au moins une question de sécurité est fausse : la partie sécurité du chapitre est à revoir, quel que soit le score.</p>
          )}
          {resultat.score < seuils.qcm_reussite && <p>Seuil de réussite : {pourcentage(seuils.qcm_reussite)}.</p>}
          {!phase.sauvegarde && <p class="message-saisie">Résultat non enregistré : stockage local indisponible.</p>}
        </div>
        {resultat.remediation.length > 0 && (
          <div class="carte">
            <h2>À revoir</h2>
            <ul>
              {resultat.remediation.map((s) => {
                const url = urlSection(plan, s);
                return <li>{url ? <a href={url}>{libelleSection(plan, s)}</a> : libelleSection(plan, s)}</li>;
              })}
            </ul>
            <p class="note">Relisez ces sections et refaites les exercices associés avant une nouvelle tentative.</p>
          </div>
        )}
        <h2>Corrigé</h2>
        {tirage.map((q, i) => {
          const d = resultat.details.find((x) => x.id === q.id)!;
          const c = corrections[q.id]!;
          const r = reponses[q.id];
          const fausses = r?.kind === 'choix' ? r.ids.filter((id) => !(c.bonnes ?? []).includes(id)) : [];
          return (
            <section class={`question verdict--${d.correct ? 'correct' : 'incorrect'}`} data-testid={`correction-${q.id}`}>
              <h3>
                {d.correct ? '✓' : '✗'} Question {i + 1} {q.securite && <span class="badge badge--alerte">Sécurité</span>}
              </h3>
              <p>{q.enonce}</p>
              <p>Votre réponse : <strong>{texteReponse(q, r)}</strong></p>
              {!d.correct && <p>Bonne réponse : <strong>{texteCorrect(q, c)}</strong></p>}
              <p>{c.explication}</p>
              {fausses.map((id) => c.pourquoi_faux?.[id] && <p class="note">Pourquoi « {q.propositions?.find((p) => p.id === id)?.texte} » est faux : {c.pourquoi_faux[id]}</p>)}
            </section>
          );
        })}
        <div class="actions">
          <button class="bouton" type="button" onClick={commencer}>Nouvelle tentative</button>
          <a class="bouton bouton--secondaire" href="/">Tableau de bord</a>
        </div>
      </div>
    );
  }

  return (
    <form
      data-testid="qcm-questions"
      onSubmit={(e) => {
        e.preventDefault();
        void soumettre(phase.nom === 'questions' && !!phase.avertissement);
      }}
    >
      <p class="note">QCM du chapitre {chapitre} : {titreChapitre}</p>
      {tirage.map((q, i) => (
        <section class="question" aria-labelledby={`q-${q.id}`} data-testid={`question-${q.id}`}>
          <h3 id={`q-${q.id}`}>
            Question {i + 1} / {tirage.length} {q.securite && <span class="badge badge--alerte">Sécurité</span>}
          </h3>
          <p>{q.enonce}</p>
          {q.type === 'choix_multiple' && <p class="note">Plusieurs réponses possibles.</p>}
          <ChampReponse enonce={q} reponse={reponses[q.id] ?? null} onChange={(r) => setReponses({ ...reponses, [q.id]: r })} />
        </section>
      ))}
      {phase.nom === 'questions' && phase.avertissement && <p class="alerte" role="alert">{phase.avertissement}</p>}
      {phase.nom === 'erreur' && <p class="alerte" role="alert">{phase.message}</p>}
      <div class="actions">
        <button class="bouton" type="submit" disabled={phase.nom === 'correction'}>
          {phase.nom === 'correction'
            ? 'Correction…'
            : phase.nom === 'questions' && phase.avertissement
              ? 'Valider quand même'
              : 'Valider mes réponses'}
        </button>
      </div>
    </form>
  );
}
