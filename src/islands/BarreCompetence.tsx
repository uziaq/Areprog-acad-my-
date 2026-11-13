import type { ProgressionCompetence } from '../lib/progression/calcul.ts';

const ETAPES: [keyof ProgressionCompetence['etapes'], string][] = [
  ['enseignee', 'Leçon consultée'],
  ['exercee', 'Exercice réussi'],
  ['qcm', 'QCM réussi'],
  ['pratique', 'Pratique validée'],
  ['jalon', 'Jalon validé'],
];

export function BarreCompetence({ p }: { p: ProgressionCompetence }) {
  return (
    <div data-testid={`competence-${p.code}`}>
      <p style={{ margin: 0 }}>
        <strong>{p.code}</strong> {p.intitule}
      </p>
      <div class="barre" role="progressbar" aria-valuemin={0} aria-valuemax={5} aria-valuenow={p.franchies} aria-label={`${p.code} : ${p.franchies} étapes sur 5`}>
        <div style={{ width: `${(p.franchies / 5) * 100}%` }} />
      </div>
      <ul class="etapes">
        {ETAPES.map(([cle, libelle]) => (
          <li class={p.etapes[cle] ? 'franchie' : ''}>{p.etapes[cle] ? '✓ ' : ''}{libelle}</li>
        ))}
      </ul>
      <p class="note" style={{ margin: 0 }}>{p.libelle}</p>
    </div>
  );
}
