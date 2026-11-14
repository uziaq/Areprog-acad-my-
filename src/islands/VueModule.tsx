import { syntheseChapitre } from '../lib/progression/calcul.ts';
import type { Plan, PlanModule } from '../lib/types.ts';
import { useDonnees } from './donnees.ts';
import { EtatBadge } from './EtatBadge.tsx';

/** État des chapitres d'un module, calculé dans le navigateur. */
export default function VueModule({ plan, module }: { plan: Plan; module: PlanModule }) {
  const { pret, tentatives, evenements } = useDonnees();
  const consultees = new Set(evenements.filter((e) => e.type === 'consultation').map((e) => e.ref));
  return (
    <div class="pile">
      {module.chapitres.map((c) => {
        const s = pret ? syntheseChapitre(c, plan, tentatives, evenements) : null;
        return (
          <section class="carte" aria-labelledby={`ch-${c.id}`}>
            <h2 id={`ch-${c.id}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              {c.id} · {c.titre} {s && <EtatBadge etat={s.etat} />}
            </h2>
            <ol>
              {c.lecons.map((l) => (
                <li>
                  <a href={l.url}>{l.titre}</a> {consultees.has(l.id) && <span class="badge badge--succes">Consultée</span>}
                </li>
              ))}
            </ol>
            {c.questions.length > 0 && <a class="bouton bouton--secondaire" href={c.urlQcm}>QCM du chapitre</a>}
          </section>
        );
      })}
    </div>
  );
}
