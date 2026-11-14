/**
 * Évaluation pratique d'un TP (auto-évaluation guidée par la grille) :
 * fautes éliminatoires écartées une à une, niveau par critère, preuves jointes (photo ou note).
 * Les preuves sont enregistrées tout de suite sur l'appareil ; la saisie est gardée en brouillon
 * jusqu'à la validation. Règles de notation : src/lib/evaluation/pratique.ts.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import {
  cleCritere,
  LIBELLE_NIVEAU,
  noterPratique,
  type CriterePratique,
  type FautePratique,
  type NiveauCritere,
  type ResultatPratique,
  type SaisieCritere,
  type SaisiePratique,
} from '../lib/evaluation/pratique.ts';
import { enregistrerPreuve, enregistrerTentative, ecrireMeta, lireMeta, nouvelId, preuvesDeTentative, supprimerPreuve } from '../lib/stockage/db.ts';
import type { Preuve } from '../lib/types.ts';

export interface PropsEvaluationPratique {
  tp: { id: string; titre: string; version: string; chapitre: string; securite: 'standard' | 'renforcee'; livrables: string[] };
  criteres: CriterePratique[];
  fautes: FautePratique[];
  seuil: number;
}

interface Brouillon {
  id: string;
  debut: number;
  saisie: SaisiePratique;
}

const NIVEAUX: NiveauCritere[] = ['atteint', 'partiel', 'non_atteint'];
const pourcentage = (x: number) => `${Math.round(x * 100)} %`;
/** Côté maximal d'une photo enregistrée : lisible au zoom, raisonnable pour la sauvegarde. */
const COTE_MAX = 1600;

const brouillonVide = (): Brouillon => ({ id: nouvelId(), debut: Date.now(), saisie: { criteres: {}, fautes: {} } });

/** Les preuves enregistrées font foi : un rattachement perdu (page fermée pendant l'écriture) est rétabli. */
function rattacherPreuves(b: Brouillon, preuves: Preuve[]): Brouillon {
  const criteres = { ...b.saisie.criteres };
  for (const p of preuves) {
    const c = criteres[p.critere] ?? { preuves: [] };
    if (!c.preuves.includes(p.id)) criteres[p.critere] = { ...c, preuves: [...c.preuves, p.id] };
  }
  return { ...b, saisie: { ...b.saisie, criteres } };
}

/** Réduit une photo en JPEG (data URL). Le fichier d'origine n'est pas conservé. */
async function compresserPhoto(fichier: File): Promise<string> {
  const url = URL.createObjectURL(fichier);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const echelle = Math.min(1, COTE_MAX / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(img.naturalWidth * echelle));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * echelle));
    canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.8);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function EvaluationPratique({ tp, criteres, fautes, seuil }: PropsEvaluationPratique) {
  const cleBrouillon = `brouillon-pratique:${tp.id}`;
  const [brouillon, setBrouillon] = useState<Brouillon | null>(null);
  const [preuves, setPreuves] = useState<Preuve[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [avertissement, setAvertissement] = useState<string | null>(null);
  const [resultat, setResultat] = useState<{ r: ResultatPratique; sauvegarde: boolean } | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const stockageOk = useRef(true);

  useEffect(() => {
    lireMeta<Brouillon | null>(cleBrouillon)
      .then(async (b) => {
        if (!b) {
          setBrouillon(brouillonVide());
          return;
        }
        const liste = await preuvesDeTentative(b.id);
        setPreuves(liste);
        setBrouillon(rattacherPreuves(b, liste));
      })
      .catch(() => {
        stockageOk.current = false;
        setBrouillon(brouillonVide());
        setMessage('Stockage local indisponible : la saisie et les photos ne seront pas conservées sur cet appareil.');
      });
  }, []);

  if (!brouillon) return <p class="note">Chargement de la grille…</p>;

  function modifier(f: (s: SaisiePratique) => SaisiePratique) {
    setAvertissement(null);
    setBrouillon((b) => {
      const suivant = { ...b!, saisie: f(b!.saisie) };
      if (stockageOk.current) ecrireMeta(cleBrouillon, suivant).catch(() => {});
      return suivant;
    });
  }

  const saisieCritere = (cle: string): SaisieCritere => brouillon.saisie.criteres[cle] ?? { preuves: [] };
  /** Mise à jour d'un critère à partir de son état le plus récent (sûr après une attente). */
  const majCritere = (cle: string, f: (c: SaisieCritere) => Partial<SaisieCritere>) =>
    modifier((s) => {
      const c = s.criteres[cle] ?? { preuves: [] };
      return { ...s, criteres: { ...s.criteres, [cle]: { ...c, ...f(c) } } };
    });
  const modifierCritere = (cle: string, maj: Partial<SaisieCritere>) => majCritere(cle, () => maj);

  async function ajouterPreuve(cle: string, type: Preuve['type'], contenu: string) {
    const p: Preuve = { id: nouvelId(), tentative: brouillon!.id, tp: tp.id, critere: cle, type, date: new Date().toISOString(), contenu };
    try {
      if (stockageOk.current) {
        // Le brouillon doit exister avant sa première preuve, sinon elle serait introuvable au retour.
        if (!(await lireMeta<Brouillon | null>(cleBrouillon))) await ecrireMeta(cleBrouillon, brouillon);
        await enregistrerPreuve(p);
      }
    } catch {
      setMessage('Preuve gardée pour cette séance seulement : stockage local indisponible.');
    }
    setPreuves((l) => [...l, p]);
    majCritere(cle, (c) => ({ preuves: [...c.preuves, p.id] }));
  }

  async function choisirPhoto(cle: string, ev: Event) {
    const champ = ev.target as HTMLInputElement;
    const f = champ.files?.[0];
    champ.value = '';
    if (!f) return;
    try {
      await ajouterPreuve(cle, 'photo', await compresserPhoto(f));
    } catch {
      setMessage('Cette image n\'a pas pu être lue. Reprenez la photo ou choisissez un fichier JPEG ou PNG.');
    }
  }

  async function retirerPreuve(cle: string, id: string) {
    await supprimerPreuve(id).catch(() => {});
    setPreuves((l) => l.filter((p) => p.id !== id));
    majCritere(cle, (c) => ({ preuves: c.preuves.filter((x) => x !== id) }));
  }

  async function valider(forcer = false) {
    if (envoi) return;
    const r = noterPratique(criteres, fautes, brouillon!.saisie, seuil);
    if (!forcer && r.sansNiveau.length) {
      setAvertissement(`${r.sansNiveau.length} critère(s) sans niveau choisi : ils compteront « non atteint ».`);
      return;
    }
    setEnvoi(true);
    let sauvegarde = true;
    try {
      await enregistrerTentative({
        id: brouillon!.id,
        type: 'pratique',
        ref: tp.id,
        chapitre: tp.chapitre,
        version: tp.version,
        date: new Date().toISOString(),
        score: r.score,
        reussi: r.reussi,
        securite_ok: r.eliminations.length === 0,
        duree_s: Math.round((Date.now() - brouillon!.debut) / 1000),
        details: [],
        pratique: { saisie: brouillon!.saisie, eliminations: r.eliminations, details: r.details },
      });
      await ecrireMeta(cleBrouillon, null);
    } catch {
      sauvegarde = false;
    }
    setResultat({ r, sauvegarde });
    setEnvoi(false);
    window.scrollTo({ top: 0 });
  }

  function recommencer() {
    setResultat(null);
    setPreuves([]);
    setAvertissement(null);
    setBrouillon(brouillonVide());
  }

  const titreCritere = new Map(criteres.map((c) => [cleCritere(c), c.texte]));

  if (resultat) {
    const { r } = resultat;
    return (
      <div class="pile" data-testid="pratique-resultat">
        <div class="carte" role="status">
          <p class="score">{pourcentage(r.score)}</p>
          <p class="verdict-titre">
            {r.reussi ? <span class="badge badge--succes">✓ Évaluation pratique réussie</span> : <span class="badge badge--erreur">✗ Évaluation pratique non réussie</span>}
          </p>
          <p class="note">Seuil : {pourcentage(seuil)}, sans aucune faute éliminatoire. Un critère sans preuve vaut 0.</p>
          {!resultat.sauvegarde && <p class="message-saisie">Résultat non enregistré : stockage local indisponible.</p>}
        </div>
        {r.eliminations.length > 0 && (
          <div class="alerte" data-testid="pratique-eliminations">
            <p><strong>Évaluation nulle :</strong></p>
            <ul>{r.eliminations.map((e) => <li>{e}</li>)}</ul>
            <p class="note">Corrigez la cause, relisez la partie sécurité du chapitre, puis refaites le TP.</p>
          </div>
        )}
        <div class="carte">
          <h2>Détail par critère</h2>
          <ul class="liste-criteres">
            {r.details.map((d) => (
              <li>
                <strong>{titreCritere.get(d.cle)}</strong> :{' '}
                {d.max > 0 ? `${d.points} / ${d.max}` : d.niveau === 'sans_objet' ? 'sans objet' : d.niveau === 'atteint' ? 'respecté' : 'non respecté'}
                {d.niveau && d.niveau !== 'sans_objet' && d.max > 0 && ` (${LIBELLE_NIVEAU[d.niveau]})`} · {d.preuves} preuve(s)
                {d.motif && <span class="note"> · {d.motif}</span>}
              </li>
            ))}
          </ul>
        </div>
        <div class="actions">
          <button class="bouton" type="button" onClick={recommencer}>Nouvelle évaluation</button>
          <a class="bouton bouton--secondaire" href="/">Tableau de bord</a>
        </div>
      </div>
    );
  }

  const notes = criteres.filter((c) => c.poids > 0);
  const eliminatoires = criteres.filter((c) => c.poids === 0);

  const blocPreuves = (cle: string) => {
    const ids = saisieCritere(cle).preuves;
    const liste = preuves.filter((p) => ids.includes(p.id));
    return (
      <div class="preuves">
        {liste.length > 0 && (
          <ul class="liste-preuves">
            {liste.map((p) => (
              <li>
                {p.type === 'photo' ? <img src={p.contenu} alt={`Photo jointe : ${titreCritere.get(cle)}`} class="vignette" /> : <span>📝 {p.contenu}</span>}
                <button class="bouton bouton--secondaire" type="button" onClick={() => retirerPreuve(cle, p.id)}>Retirer</button>
              </li>
            ))}
          </ul>
        )}
        <div class="actions">
          <input
            id={`photo-${cle}`}
            class="champ-fichier"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(ev) => choisirPhoto(cle, ev)}
            data-testid={`photo-${cle}`}
          />
          <label class="bouton bouton--secondaire" for={`photo-${cle}`}>📷 Joindre une photo</label>
          <NoteRapide onAjout={(t) => ajouterPreuve(cle, 'note', t)} cle={cle} />
        </div>
      </div>
    );
  };

  return (
    <form class="pile" onSubmit={(e) => { e.preventDefault(); valider(); }} data-testid="pratique-formulaire">
      {message && <p class="alerte" role="status">{message}</p>}
      <div class="carte">
        <p>
          Auto-évaluation : pour chaque critère, choisissez le niveau atteint et joignez une preuve (photo du montage,
          capture d'oscilloscope, tableau de mesures, ou note). <strong>Un critère sans preuve vaut 0.</strong>
        </p>
        {tp.livrables.length > 0 && (
          <>
            <h3>Preuves attendues pour ce TP</h3>
            <ul>{tp.livrables.map((l) => <li>{l}</li>)}</ul>
          </>
        )}
        <p class="note">Votre saisie et vos photos sont gardées sur cet appareil jusqu'à la validation.</p>
      </div>

      <fieldset class="carte choix" data-testid="pratique-fautes">
        <legend><h2>Sécurité : fautes éliminatoires</h2></legend>
        <p class="note">Cochez chaque ligne seulement si la faute n'a pas été commise. Une seule faute rend l'évaluation nulle.</p>
        {fautes.map((f) => (
          <label>
            <input
              type="checkbox"
              checked={brouillon.saisie.fautes[f.id] === true}
              onChange={(e) => modifier((s) => ({ ...s, fautes: { ...s.fautes, [f.id]: (e.target as HTMLInputElement).checked } }))}
            />
            <span>Je n'ai pas commis : {f.texte}</span>
          </label>
        ))}
      </fieldset>

      {notes.map((c) => {
        const cle = cleCritere(c);
        const s = saisieCritere(cle);
        return (
          <section class="question" data-testid={`critere-${cle}`} aria-labelledby={`t-${cle}`}>
            <h3 id={`t-${cle}`}>{c.texte} <span class="badge badge--neutre">{c.poids} %</span></h3>
            <fieldset class="choix">
              <legend class="note">Niveau atteint</legend>
              {NIVEAUX.map((n) => (
                <label>
                  <input type="radio" name={`niveau-${cle}`} checked={s.niveau === n} onChange={() => modifierCritere(cle, { niveau: n })} />
                  <span>{LIBELLE_NIVEAU[n]}</span>
                </label>
              ))}
            </fieldset>
            {c.eliminatoire_si && (
              <div class="choix">
                <label>
                  <input type="checkbox" checked={s.confirme === true} onChange={(e) => modifierCritere(cle, { confirme: (e.target as HTMLInputElement).checked })} />
                  <span>Je confirme que cette situation éliminatoire ne s'est pas produite : {c.eliminatoire_si}</span>
                </label>
              </div>
            )}
            {blocPreuves(cle)}
          </section>
        );
      })}

      {eliminatoires.length > 0 && (
        <div class="pile" data-testid="pratique-renforcee">
          <h2>Protocole renforcé : chaque critère est éliminatoire et exige une preuve</h2>
          {eliminatoires.map((c) => {
            const cle = cleCritere(c);
            const s = saisieCritere(cle);
            return (
              <section class="question" data-testid={`critere-${cle}`} aria-labelledby={`t-${cle}`}>
                <h3 id={`t-${cle}`}>{c.texte}</h3>
                <div class="choix">
                  <label>
                    <input type="checkbox" checked={s.confirme === true} disabled={s.sans_objet === true} onChange={(e) => modifierCritere(cle, { confirme: (e.target as HTMLInputElement).checked })} />
                    <span>Respecté (preuve jointe ci-dessous)</span>
                  </label>
                  {c.sans_objet_possible && (
                    <label>
                      <input type="checkbox" checked={s.sans_objet === true} onChange={(e) => modifierCritere(cle, { sans_objet: (e.target as HTMLInputElement).checked, confirme: false })} />
                      <span>Sans objet pour ce TP</span>
                    </label>
                  )}
                </div>
                {!s.sans_objet && blocPreuves(cle)}
              </section>
            );
          })}
        </div>
      )}

      {avertissement && (
        <div class="alerte" role="alert">
          <p>{avertissement}</p>
          <button class="bouton" type="button" onClick={() => valider(true)}>Valider quand même</button>
        </div>
      )}
      <div class="actions">
        <button class="bouton" type="submit" disabled={envoi}>Valider mon évaluation</button>
      </div>
    </form>
  );
}

function NoteRapide({ onAjout, cle }: { onAjout: (texte: string) => void; cle: string }) {
  const [ouvert, setOuvert] = useState(false);
  const [texte, setTexte] = useState('');
  if (!ouvert) {
    return <button class="bouton bouton--secondaire" type="button" onClick={() => setOuvert(true)}>📝 Ajouter une note</button>;
  }
  return (
    <div class="note-rapide">
      <label for={`note-${cle}`}>Note (valeurs relevées, observation)</label>
      <textarea id={`note-${cle}`} rows={3} value={texte} onInput={(e) => setTexte((e.target as HTMLTextAreaElement).value)} />
      <div class="actions">
        <button
          class="bouton"
          type="button"
          disabled={!texte.trim()}
          onClick={() => { onAjout(texte.trim()); setTexte(''); setOuvert(false); }}
        >
          Joindre la note
        </button>
        <button class="bouton bouton--secondaire" type="button" onClick={() => setOuvert(false)}>Annuler</button>
      </div>
    </div>
  );
}
