/**
 * Saisie d'une réponse selon le type de question : choix, valeur numérique avec unité, ordre.
 */
import { unitesProposees } from '../lib/evaluation/unites.ts';
import type { Enonce, Reponse } from '../lib/types.ts';

interface Props {
  enonce: Enonce;
  reponse: Reponse | null;
  onChange: (r: Reponse) => void;
  desactive?: boolean;
}

export function reponseInitiale(e: Enonce): Reponse | null {
  if (e.type === 'calcul') return { kind: 'numerique', valeur: '', unite: e.unite_attendue ?? '' };
  if (e.type === 'ordonnancement') return { kind: 'ordre', ids: (e.propositions ?? []).map((p) => p.id) };
  return null;
}

export function ChampReponse({ enonce, reponse, onChange, desactive }: Props) {
  const nom = `rep-${enonce.id}`;
  if (enonce.type === 'calcul') {
    const r = reponse?.kind === 'numerique' ? reponse : { kind: 'numerique' as const, valeur: '', unite: enonce.unite_attendue ?? '' };
    return (
      <div class="saisie">
        <label for={`${nom}-v`} class="saut">Valeur</label>
        <input
          id={`${nom}-v`}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="Valeur"
          value={r.valeur}
          disabled={desactive}
          onInput={(ev) => onChange({ ...r, valeur: (ev.target as HTMLInputElement).value })}
        />
        <label for={`${nom}-u`} class="saut">Unité</label>
        <select
          id={`${nom}-u`}
          value={r.unite}
          disabled={desactive}
          onChange={(ev) => onChange({ ...r, unite: (ev.target as HTMLSelectElement).value })}
        >
          {unitesProposees(enonce.unite_attendue ?? '').map((u) => (
            <option value={u}>{u}</option>
          ))}
        </select>
      </div>
    );
  }
  if (enonce.type === 'ordonnancement') {
    const ids = reponse?.kind === 'ordre' ? reponse.ids : (enonce.propositions ?? []).map((p) => p.id);
    const texte = (id: string) => enonce.propositions?.find((p) => p.id === id)?.texte ?? id;
    const deplacer = (i: number, d: number) => {
      const n = [...ids];
      [n[i], n[i + d]] = [n[i + d]!, n[i]!];
      onChange({ kind: 'ordre', ids: n });
    };
    return (
      <ol class="ordre" aria-label="Ordre des étapes">
        {ids.map((id, i) => (
          <li key={id}>
            <strong>{i + 1}.</strong>
            <span>{texte(id)}</span>
            <button type="button" class="bouton bouton--secondaire" aria-label={`Monter : ${texte(id)}`} disabled={desactive || i === 0} onClick={() => deplacer(i, -1)}>↑</button>
            <button type="button" class="bouton bouton--secondaire" aria-label={`Descendre : ${texte(id)}`} disabled={desactive || i === ids.length - 1} onClick={() => deplacer(i, 1)}>↓</button>
          </li>
        ))}
      </ol>
    );
  }
  const multiple = enonce.type === 'choix_multiple';
  const choisis = reponse?.kind === 'choix' ? reponse.ids : [];
  return (
    <fieldset class="choix">
      <legend class="saut">Propositions</legend>
      {(enonce.propositions ?? []).map((p) => (
        <label key={p.id}>
          <input
            type={multiple ? 'checkbox' : 'radio'}
            name={nom}
            value={p.id}
            checked={choisis.includes(p.id)}
            disabled={desactive}
            onChange={(ev) => {
              const coche = (ev.target as HTMLInputElement).checked;
              const ids = multiple ? (coche ? [...choisis, p.id] : choisis.filter((x) => x !== p.id)) : [p.id];
              onChange({ kind: 'choix', ids });
            }}
          />
          <span>{p.texte}</span>
        </label>
      ))}
    </fieldset>
  );
}

export function reponseRenseignee(r: Reponse | null): boolean {
  if (!r) return false;
  if (r.kind === 'numerique') return r.valeur.trim() !== '';
  return r.ids.length > 0;
}
