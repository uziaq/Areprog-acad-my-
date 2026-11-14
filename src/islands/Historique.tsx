import { formaterDate, pourcentage } from '../lib/plan.ts';
import { useDonnees } from './donnees.ts';

/** Historique des tentatives (F14), avec la version du contenu au moment de la tentative. */
export default function Historique({ versions }: { versions: Record<string, string> }) {
  const { pret, tentatives } = useDonnees();
  if (!pret) return <p class="note">Chargement…</p>;
  if (tentatives.length === 0) return <p class="carte">Aucune tentative enregistrée sur cet appareil.</p>;
  const majeure = (v: string) => v.split('.')[0];
  const triees = [...tentatives].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div class="tableau-conteneur carte">
      <table class="tableau" data-testid="historique">
        <thead>
          <tr><th>Date</th><th>Élément</th><th>Résultat</th><th>Version</th></tr>
        </thead>
        <tbody>
          {triees.map((t) => {
            const actuelle = versions[t.ref];
            const ancienne = actuelle !== undefined && majeure(actuelle) !== majeure(t.version);
            return (
              <tr>
                <td>{formaterDate(t.date)}</td>
                <td>{t.type === 'qcm' ? `QCM du chapitre ${t.chapitre}` : t.type === 'pratique' ? `TP noté ${t.ref}` : `Exercice ${t.ref}`}</td>
                <td>
                  <span class={`badge badge--${t.reussi ? 'succes' : 'erreur'}`}>
                    {t.type === 'exercice' ? (t.reussi ? 'Réussi' : 'Échoué') : pourcentage(t.score)}
                  </span>
                  {t.type === 'qcm' && !t.securite_ok && <span class="note"> · erreur sécurité</span>}
                  {t.type === 'pratique' && !t.securite_ok && <span class="note"> · faute éliminatoire</span>}
                </td>
                <td>
                  {t.version}
                  {ancienne && <span class="note"> (version antérieure du contenu)</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
