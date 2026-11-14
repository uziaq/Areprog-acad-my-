import { progressionCompetences } from '../lib/progression/calcul.ts';
import type { Plan } from '../lib/types.ts';
import { BarreCompetence } from './BarreCompetence.tsx';
import { useDonnees } from './donnees.ts';

export default function Competences({ plan }: { plan: Plan }) {
  const { pret, tentatives, evenements } = useDonnees();
  if (!pret) return <p class="note">Chargement…</p>;
  const toutes = progressionCompetences(plan, tentatives, evenements, plan.seuils.qcm_reussite);
  const publiees = toutes.filter((c) => !c.horsContenu);
  const aVenir = toutes.filter((c) => c.horsContenu);
  return (
    <div class="pile">
      <section class="carte pile">
        <h2>Dans le contenu publié</h2>
        {publiees.map((p) => <BarreCompetence p={p} />)}
      </section>
      {aVenir.length > 0 && (
        <section class="carte pile" data-testid="competences-a-venir">
          <h2>À venir ({aVenir.length})</h2>
          {plan.programme.domaines.map((d) => {
            const liste = aVenir.filter((c) => c.code.startsWith(`${d.id}.`));
            if (!liste.length) return null;
            return (
              <details>
                <summary>{d.id} · {d.titre} ({liste.length})</summary>
                <ul class="liste-simple">
                  {liste.map((c) => (
                    <li><strong>{c.code}</strong> {c.intitule} <span class="note">(niveau {c.niveauVise} visé)</span></li>
                  ))}
                </ul>
              </details>
            );
          })}
        </section>
      )}
    </div>
  );
}
