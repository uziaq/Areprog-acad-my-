/**
 * Tableau de bord pédagogique (F1, F3) : où j'en suis, quoi faire ensuite.
 */
import { useEffect, useState } from 'preact/hooks';
import { formaterDate, pourcentage } from '../lib/plan.ts';
import { progressionCompetences, syntheseChapitre } from '../lib/progression/calcul.ts';
import { lireMeta } from '../lib/stockage/db.ts';
import type { Plan } from '../lib/types.ts';
import { BarreCompetence } from './BarreCompetence.tsx';
import { useDonnees } from './donnees.ts';
import { EtatBadge } from './EtatBadge.tsx';

const SEPT_JOURS = 7 * 24 * 3600 * 1000;

export default function TableauDeBord({ plan }: { plan: Plan }) {
  const { pret, erreur, tentatives, evenements } = useDonnees();
  const [dernierExport, setDernierExport] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    lireMeta<string>('dernier_export').then((d) => setDernierExport(d ?? null)).catch(() => setDernierExport(null));
  }, [tentatives.length]);

  if (!pret) return <p class="note">Chargement de votre progression…</p>;

  const competences = progressionCompetences(plan, tentatives, evenements, plan.seuils.qcm_reussite).filter((c) => !c.horsContenu);
  const consultees = new Set(evenements.filter((e) => e.type === 'consultation').map((e) => e.ref));
  const recentes = [...tentatives].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const exportAncien = tentatives.length > 0 && (!dernierExport || Date.now() - new Date(dernierExport).getTime() > SEPT_JOURS);

  return (
    <div class="pile">
      {erreur && <p class="alerte" role="alert">{erreur}</p>}
      {exportAncien && dernierExport !== undefined && (
        <p class="alerte" data-testid="rappel-sauvegarde">
          {dernierExport ? `Dernière sauvegarde le ${formaterDate(dernierExport)}.` : 'Aucune sauvegarde de vos résultats.'}{' '}
          <a href="/sauvegarde/">Exporter une sauvegarde</a> (recommandé chaque semaine).
        </p>
      )}

      {plan.modules.map((m) => (
        <section class="carte" aria-labelledby={`mod-${m.id}`}>
          <h2 id={`mod-${m.id}`}>
            <a href={m.url}>{m.id} · {m.titre}</a>
          </h2>
          <ul class="liste-simple">
            {m.chapitres.map((c) => {
              const s = syntheseChapitre(c, plan, tentatives, evenements);
              const prochaine = c.lecons.find((l) => !consultees.has(l.id));
              const exercicesFaits = new Set(tentatives.filter((t) => t.type === 'exercice' && t.chapitre === c.id).map((t) => t.ref));
              const nbExercices = c.lecons.reduce((n, l) => n + l.exercices.length, 0);
              return (
                <li data-testid={`chapitre-${c.id}`}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                    <strong>{c.id} · {c.titre}</strong>
                    <EtatBadge etat={s.etat} />
                  </div>
                  <p class="note" style={{ margin: '0.25rem 0' }}>
                    Leçons consultées : {c.lecons.filter((l) => consultees.has(l.id)).length} / {c.lecons.length} · Exercices tentés : {exercicesFaits.size} / {nbExercices}
                    {s.dernierQcm && <> · Dernier QCM : <strong data-testid="dernier-score">{pourcentage(s.dernierQcm.score)}</strong> ({s.nbTentativesQcm} tentative{s.nbTentativesQcm > 1 ? 's' : ''})</>}
                  </p>
                  {s.prerequisAbsents.length > 0 && (
                    <p class="note" style={{ margin: 0 }}>Prérequis {s.prerequisAbsents.join(', ')} : pas encore publié dans l'application.</p>
                  )}
                  {s.etat === 'a_rejouer' && <p class="alerte">Deux échecs consécutifs au QCM : rejouez la semaine avant de continuer.</p>}
                  {s.etat === 'qcm_reussi' && s.pratiqueIndisponible && <p class="note">Validation complète du chapitre : TP noté pas encore publié dans l'application.</p>}
                  {s.etat === 'qcm_reussi' && s.tpRestants.length > 0 && <p class="note">Pour valider le chapitre, réussissez l'évaluation pratique : {s.tpRestants.map((t) => t.id).join(', ')}.</p>}
                  {c.tp.length > 0 && (
                    <p class="note" style={{ margin: '0.25rem 0' }}>
                      TP notés :{' '}
                      {c.tp.map((t, i) => {
                        const derniere = tentatives.filter((x) => x.type === 'pratique' && x.ref === t.id).sort((a, b) => a.date.localeCompare(b.date)).at(-1);
                        return (
                          <>
                            {i > 0 && ' · '}
                            <a href={t.url}>{t.id}</a>
                            {derniere && <> : <strong data-testid={`dernier-tp-${t.id}`}>{pourcentage(derniere.score)}</strong> {derniere.reussi ? '✓' : '✗'}</>}
                          </>
                        );
                      })}
                    </p>
                  )}
                  <div class="actions">
                    {prochaine ? (
                      <a class="bouton" href={prochaine.url}>{consultees.size ? 'Continuer' : 'Commencer'} : {prochaine.titre}</a>
                    ) : (
                      c.lecons[0] && <a class="bouton bouton--secondaire" href={c.lecons[0].url}>Revoir la leçon</a>
                    )}
                    {c.questions.length > 0 && (
                      <a class={`bouton ${prochaine ? 'bouton--secondaire' : ''}`} href={c.urlQcm}>
                        {s.dernierQcm ? 'Repasser le QCM' : 'Passer le QCM'}
                      </a>
                    )}
                    {s.etat === 'qcm_reussi' && s.tpRestants[0] && (
                      <a class="bouton" href={s.tpRestants[0].url}>Évaluation pratique {s.tpRestants[0].id}</a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {(() => {
        const toutes = plan.programme.modules.flatMap((m) => m.semaines);
        const dispo = toutes.filter((w) => w.url).length;
        return (
          <p class="note" data-testid="avancement-cursus">
            Cursus : {dispo} semaine{dispo > 1 ? 's' : ''} disponible{dispo > 1 ? 's' : ''} sur {toutes.length}. <a href="/parcours/">Voir tout le programme</a>
          </p>
        );
      })()}

      <div class="grille">
        <section class="carte pile" aria-labelledby="titre-competences">
          <h2 id="titre-competences">Compétences en cours</h2>
          {competences.map((p) => <BarreCompetence p={p} />)}
          <p><a href="/competences/">Tout le référentiel</a></p>
        </section>
        <section class="carte" aria-labelledby="titre-activite">
          <h2 id="titre-activite">Activité récente</h2>
          {recentes.length === 0 ? (
            <p class="note">Aucun résultat pour l'instant.</p>
          ) : (
            <ul class="liste-simple">
              {recentes.map((t) => (
                <li>
                  {t.type === 'qcm' ? `QCM ${t.chapitre}` : `Exercice ${t.ref}`} ·{' '}
                  <span class={`badge badge--${t.reussi ? 'succes' : 'erreur'}`}>{t.type === 'qcm' ? pourcentage(t.score) : t.reussi ? 'Réussi' : 'Échoué'}</span>
                  <br />
                  <span class="note">{formaterDate(t.date)}</span>
                </li>
              ))}
            </ul>
          )}
          <p><a href="/historique/">Tout l'historique</a></p>
        </section>
      </div>
    </div>
  );
}
