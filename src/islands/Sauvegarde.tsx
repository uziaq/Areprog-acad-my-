/**
 * Export / import des données apprenant (NF4, NF5).
 */
import { useEffect, useState } from 'preact/hooks';
import { formaterDate } from '../lib/plan.ts';
import { demanderStockagePersistant, ecrireMeta, listerPreuves, lireMeta, remplacerDonnees } from '../lib/stockage/db.ts';
import { construireSauvegarde, lireSauvegarde, nomFichierSauvegarde, type Sauvegarde as S } from '../lib/stockage/sauvegarde.ts';
import { useDonnees } from './donnees.ts';

export default function Sauvegarde() {
  const { pret, tentatives, evenements } = useDonnees();
  const [persistant, setPersistant] = useState<boolean | null>(null);
  const [dernierExport, setDernierExport] = useState<string | null>(null);
  const [apercu, setApercu] = useState<S | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  // Le champ d'import reste inactif tant que le composant n'est pas actif dans le navigateur :
  // sinon un fichier choisi pendant le chargement (téléphone lent) serait ignoré sans message.
  const [actif, setActif] = useState(false);
  useEffect(() => setActif(true), []);

  useEffect(() => {
    demanderStockagePersistant().then(setPersistant);
    lireMeta<string>('dernier_export').then((d) => setDernierExport(d ?? null)).catch(() => {});
  }, []);

  async function exporter() {
    // Les preuves (photos, notes de TP) sont lues au moment de l'export : elles ne sont pas gardées en mémoire.
    const preuves = await listerPreuves().catch(() => []);
    const s = construireSauvegarde(tentatives, evenements, preuves);
    const url = URL.createObjectURL(new Blob([JSON.stringify(s, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = nomFichierSauvegarde();
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    await ecrireMeta('dernier_export', s.date_export);
    setDernierExport(s.date_export);
    setMessage('Sauvegarde exportée. Conservez le fichier hors de la tablette (PC, clé USB, stockage en ligne privé).');
  }

  async function choisirFichier(ev: Event) {
    const champ = ev.target as HTMLInputElement;
    const f = champ.files?.[0];
    if (!f) return;
    const texte = await f.text();
    // Vider le champ : choisir de nouveau le même fichier (corrigé) doit relancer l'analyse.
    champ.value = '';
    const r = lireSauvegarde(texte);
    if (!r.ok) {
      setApercu(null);
      setMessage(r.erreur);
      return;
    }
    setApercu(r.sauvegarde);
    setMessage(null);
  }

  async function confirmerImport() {
    if (!apercu) return;
    try {
      await remplacerDonnees(apercu);
      setMessage(`Import terminé : ${apercu.tentatives.length} tentative(s) restaurée(s).`);
    } catch {
      setMessage('Import impossible : le stockage local de ce navigateur est indisponible. Vos données actuelles n\'ont pas été modifiées.');
    }
    setApercu(null);
  }

  return (
    <div class="pile">
      <section class="carte">
        <h2>Exporter</h2>
        <p>
          Vos résultats sont enregistrés automatiquement sur cet appareil uniquement.
          {pret && <> Ils comptent actuellement <strong data-testid="nb-tentatives">{tentatives.length}</strong> tentative(s).</>}
        </p>
        <p class="note">
          {dernierExport ? `Dernier export : ${formaterDate(dernierExport)}.` : 'Aucun export pour l\'instant.'}{' '}
          {persistant === true && 'Stockage persistant accordé par le navigateur.'}
          {persistant === false && 'Le navigateur n\'a pas accordé le stockage persistant : installez l\'application sur l\'écran d\'accueil et exportez régulièrement.'}
        </p>
        <div class="actions">
          <button class="bouton" type="button" onClick={exporter} disabled={!pret}>Télécharger la sauvegarde (JSON)</button>
          <button class="bouton bouton--secondaire" type="button" onClick={() => window.print()}>Imprimer cette page</button>
        </div>
      </section>
      <section class="carte">
        <h2>Importer</h2>
        <p>L'import <strong>remplace</strong> toutes les données de cet appareil par celles du fichier.</p>
        {/* Champ masqué visuellement mais atteignable au clavier : le focus s'affiche sur le bouton (voir global.css). */}
        <input id="fichier-sauvegarde" class="champ-fichier" type="file" accept="application/json,.json" onChange={choisirFichier} disabled={!actif} />
        <label class="bouton bouton--secondaire" for="fichier-sauvegarde">Choisir un fichier de sauvegarde</label>
        {apercu && (
          <div class="alerte" style={{ marginTop: '1rem' }} data-testid="apercu-import">
            <p>
              Sauvegarde du {apercu.date_export ? formaterDate(apercu.date_export) : 'date inconnue'} : {apercu.tentatives.length} tentative(s), {apercu.evenements.length} événement(s), {apercu.preuves.length} preuve(s) de TP.
              Les {tentatives.length} tentative(s) actuelles seront remplacées.
            </p>
            <div class="actions">
              <button class="bouton" type="button" onClick={confirmerImport}>Remplacer mes données</button>
              <button class="bouton bouton--secondaire" type="button" onClick={() => setApercu(null)}>Annuler</button>
            </div>
          </div>
        )}
      </section>
      {message && <p class="alerte" role="status" data-testid="message-sauvegarde">{message}</p>}
    </div>
  );
}
