/**
 * Exercice interactif : la correction n'est chargée qu'après la réponse (F14).
 */
import { useState } from 'preact/hooks';
import { chargerCorrections } from '../lib/corrections.ts';
import { noterReponse } from '../lib/evaluation/notation.ts';
import { convertir, lireNombre } from '../lib/evaluation/unites.ts';
import { enregistrerTentative, nouvelId } from '../lib/stockage/db.ts';
import type { Correction, Enonce, Reponse } from '../lib/types.ts';
import { ChampReponse, reponseInitiale, reponseRenseignee } from './ChampReponse.tsx';

export interface PropsExercice {
  enonce: Enonce;
  numero: number;
  chapitre: string;
  version: string;
  urlCorrections: string;
  /** URL de la section à relire (calculée à la génération). */
  urlSection: string | null;
}

type Etat =
  | { phase: 'saisie'; message?: string }
  | { phase: 'chargement' }
  | { phase: 'resultat'; correct: boolean; correction: Correction; sauvegarde: boolean }
  | { phase: 'erreur'; message: string };

export default function Exercice({ enonce, numero, chapitre, version, urlCorrections, urlSection }: PropsExercice) {
  const [reponse, setReponse] = useState<Reponse | null>(reponseInitiale(enonce));
  const [etat, setEtat] = useState<Etat>({ phase: 'saisie' });
  const [debut] = useState(() => Date.now());

  async function valider(ev: Event) {
    ev.preventDefault();
    if (!reponseRenseignee(reponse)) return setEtat({ phase: 'saisie', message: 'Saisissez une réponse avant de valider.' });
    if (reponse?.kind === 'numerique') {
      const n = lireNombre(reponse.valeur);
      if (n === null) return setEtat({ phase: 'saisie', message: 'Saisissez un nombre, par exemple 25,5.' });
      if (enonce.unite_attendue && convertir(n, reponse.unite, enonce.unite_attendue) === null) {
        return setEtat({ phase: 'saisie', message: 'Unité incompatible avec la grandeur demandée.' });
      }
    }
    setEtat({ phase: 'chargement' });
    try {
      const { corrections } = await chargerCorrections(urlCorrections);
      const correction = corrections[enonce.id];
      if (!correction) throw new Error('Correction introuvable');
      const correct = noterReponse(reponse, correction).statut === 'correct';
      let sauvegarde = true;
      try {
        await enregistrerTentative({
          id: nouvelId(),
          type: 'exercice',
          ref: enonce.id,
          chapitre,
          version,
          date: new Date().toISOString(),
          score: correct ? 1 : 0,
          reussi: correct,
          securite_ok: true,
          duree_s: Math.round((Date.now() - debut) / 1000),
          details: [{ id: enonce.id, correct, securite: false, competences: enonce.competences, section: enonce.section, reponse }],
        });
      } catch {
        sauvegarde = false;
      }
      setEtat({ phase: 'resultat', correct, correction, sauvegarde });
    } catch (e) {
      setEtat({ phase: 'erreur', message: `${(e as Error).message}. Vérifiez la connexion puis réessayez.` });
    }
  }

  const termine = etat.phase === 'resultat';
  return (
    <section class="exercice" aria-labelledby={`titre-${enonce.id}`} data-testid={`exercice-${enonce.id}`}>
      <h3 id={`titre-${enonce.id}`}>Exercice {numero} <span class="note">({enonce.id})</span></h3>
      <p>{enonce.enonce}</p>
      <form onSubmit={valider}>
        <ChampReponse enonce={enonce} reponse={reponse} onChange={setReponse} desactive={termine || etat.phase === 'chargement'} />
        {etat.phase === 'saisie' && etat.message && <p class="message-saisie" role="alert">{etat.message}</p>}
        {etat.phase === 'erreur' && <p class="message-saisie" role="alert">{etat.message}</p>}
        {!termine && (
          <div class="actions">
            <button class="bouton" type="submit" disabled={etat.phase === 'chargement'}>
              {etat.phase === 'chargement' ? 'Correction…' : 'Valider ma réponse'}
            </button>
          </div>
        )}
      </form>
      {etat.phase === 'resultat' && (
        <div class={`verdict ${etat.correct ? 'verdict--correct' : 'verdict--incorrect'}`} role="status">
          <p class="verdict-titre">{etat.correct ? '✓ Bonne réponse' : '✗ Réponse incorrecte'}</p>
          {etat.correction.valeur !== undefined && (
            <p>
              Réponse attendue : <strong>{etat.correction.valeur.toLocaleString('fr-FR')} {etat.correction.unite}</strong>
              {etat.correction.tolerance_relative !== undefined && (
                <span class="note"> (écart de saisie accepté : ± {Math.round(etat.correction.tolerance_relative * 100)} %)</span>
              )}
            </p>
          )}
          <p>{etat.correction.explication}</p>
          {!etat.correct && urlSection && <p><a href={urlSection}>Relire la section concernée</a></p>}
          {!etat.sauvegarde && <p class="message-saisie">Résultat non enregistré : stockage local indisponible.</p>}
          <div class="actions">
            <button
              class="bouton bouton--secondaire"
              type="button"
              onClick={() => {
                setReponse(reponseInitiale(enonce));
                setEtat({ phase: 'saisie' });
              }}
            >
              Refaire l'exercice
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
