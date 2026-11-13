/**
 * Stockage local des données apprenant (IndexedDB), navigateur uniquement.
 * Sauvegarde automatique : chaque tentative ou événement est écrit immédiatement.
 */
import type { Evenement, Tentative } from '../types.ts';
import { VERSION_SCHEMA, type Sauvegarde } from './sauvegarde.ts';

const NOM_BASE = 'areprog-academy';
const MAGASINS = ['tentatives', 'evenements', 'meta'] as const;
type Magasin = (typeof MAGASINS)[number];

let ouverture: Promise<IDBDatabase> | null = null;

/** Prévient les autres onglets ouverts de l'application qu'une donnée a changé. */
const canal: BroadcastChannel | null = typeof BroadcastChannel === 'undefined' ? null : new BroadcastChannel('areprog-donnees');
canal?.addEventListener('message', () => window.dispatchEvent(new CustomEvent('areprog:donnees')));

function signalerChangement() {
  window.dispatchEvent(new CustomEvent('areprog:donnees'));
  canal?.postMessage('change');
}

function ouvrir(): Promise<IDBDatabase> {
  if (ouverture) return ouverture;
  ouverture = new Promise<IDBDatabase>((resolve, reject) => {
    const req = indexedDB.open(NOM_BASE, VERSION_SCHEMA);
    req.onupgradeneeded = () => {
      const db = req.result;
      // Version 1 : création des magasins. Les versions suivantes ajouteront leurs migrations ici.
      if (!db.objectStoreNames.contains('tentatives')) db.createObjectStore('tentatives', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('evenements')) db.createObjectStore('evenements', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta');
    };
    req.onsuccess = () => {
      const db = req.result;
      // Une nouvelle version de l'application (migration) est ouverte dans un autre onglet :
      // libérer la base pour ne pas bloquer sa mise à jour, puis rouvrir à la prochaine demande.
      db.onversionchange = () => {
        db.close();
        ouverture = null;
      };
      resolve(db);
    };
    req.onerror = () => reject(req.error);
  }).catch((e: unknown) => {
    // Échec (navigation privée, quota…) : ne pas mémoriser l'échec, réessayer à la prochaine demande.
    ouverture = null;
    throw e;
  });
  return ouverture;
}

function requete<T>(r: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

async function tout<T>(magasin: Magasin): Promise<T[]> {
  const db = await ouvrir();
  return requete(db.transaction(magasin).objectStore(magasin).getAll() as IDBRequest<T[]>);
}

async function ecrire(magasin: Magasin, valeur: unknown, cle?: IDBValidKey): Promise<void> {
  const db = await ouvrir();
  const tx = db.transaction(magasin, 'readwrite');
  tx.objectStore(magasin).put(valeur, cle);
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
  signalerChangement();
}

export function nouvelId(): string {
  return crypto.randomUUID();
}

export const listerTentatives = () => tout<Tentative>('tentatives');
export const listerEvenements = () => tout<Evenement>('evenements');
export const enregistrerTentative = (t: Tentative) => ecrire('tentatives', t);
export const enregistrerEvenement = (e: Evenement) => ecrire('evenements', e);

export async function lireMeta<T>(cle: string): Promise<T | undefined> {
  const db = await ouvrir();
  return requete(db.transaction('meta').objectStore('meta').get(cle) as IDBRequest<T | undefined>);
}
export const ecrireMeta = (cle: string, valeur: unknown) => ecrire('meta', valeur, cle);

/** Remplace toutes les données par celles d'une sauvegarde (après confirmation de l'apprenant). */
export async function remplacerDonnees(s: Sauvegarde): Promise<void> {
  const db = await ouvrir();
  const tx = db.transaction(['tentatives', 'evenements'], 'readwrite');
  const t = tx.objectStore('tentatives');
  const e = tx.objectStore('evenements');
  t.clear();
  e.clear();
  for (const x of s.tentatives) t.put(x);
  for (const x of s.evenements) e.put(x);
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
  signalerChangement();
}

/** Demande au navigateur de ne pas effacer les données (NF5). */
export async function demanderStockagePersistant(): Promise<boolean> {
  try {
    if (!navigator.storage?.persist) return false;
    if (await navigator.storage.persisted()) return true;
    return await navigator.storage.persist();
  } catch {
    return false;
  }
}
