/**
 * Lecture de l'arborescence content/ sans interprétation : fichiers bruts + YAML décodé.
 * Les règles de conformité sont dans regles.ts.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse as parseYaml } from 'yaml';

export interface FichierMarkdown {
  chemin: string; // relatif à la racine du contenu
  entete: unknown;
  corps: string;
  erreurLecture?: string;
}

export interface FichierYaml {
  chemin: string;
  donnees: unknown;
  erreurLecture?: string;
}

export interface ChapitreBrut {
  dossier: string;
  chapitre: FichierMarkdown | null;
  lecons: FichierMarkdown[];
  exercices: FichierYaml[];
  corrections: FichierYaml[];
  corrigeChapitre: boolean;
  banque: FichierYaml | null;
  reponses: FichierYaml | null;
  tp: FichierMarkdown[];
}

export interface ModuleBrut {
  dossier: string;
  module: FichierYaml | null;
  chapitres: ChapitreBrut[];
}

export interface ContenuBrut {
  racine: string;
  parametres: FichierYaml | null;
  referentiel: FichierYaml | null;
  /** Plan du cursus : content/programme.yaml. */
  programme: FichierYaml | null;
  /** Grilles d'évaluation pratique : content/evaluation/grilles.yaml. */
  grilles: FichierYaml | null;
  sources: FichierYaml[];
  modules: ModuleBrut[];
}

const RE_ENTETE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function separerEntete(texte: string): { entete: string | null; corps: string } {
  const m = RE_ENTETE.exec(texte);
  if (!m) return { entete: null, corps: texte };
  return { entete: m[1] ?? '', corps: texte.slice(m[0].length) };
}

function lireYaml(racine: string, chemin: string): FichierYaml {
  const rel = relative(racine, chemin);
  try {
    return { chemin: rel, donnees: parseYaml(readFileSync(chemin, 'utf8')) };
  } catch (e) {
    return { chemin: rel, donnees: null, erreurLecture: (e as Error).message };
  }
}

function lireMarkdown(racine: string, chemin: string): FichierMarkdown {
  const rel = relative(racine, chemin);
  const texte = readFileSync(chemin, 'utf8');
  const { entete, corps } = separerEntete(texte);
  if (entete === null) {
    return { chemin: rel, entete: null, corps, erreurLecture: 'en-tête YAML absent (bloc --- en début de fichier)' };
  }
  try {
    return { chemin: rel, entete: parseYaml(entete), corps };
  } catch (e) {
    return { chemin: rel, entete: null, corps, erreurLecture: (e as Error).message };
  }
}

function sousDossiers(dossier: string): string[] {
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier)
    .filter((n) => !n.startsWith('.') && statSync(join(dossier, n)).isDirectory())
    .sort();
}

function fichiers(dossier: string, ext: string[]): string[] {
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier)
    .filter((n) => ext.some((e) => n.endsWith(e)))
    .sort()
    .map((n) => join(dossier, n));
}

export function chargerContenu(racine: string): ContenuBrut {
  const parametresChemin = join(racine, 'parametres.yaml');
  const contenu: ContenuBrut = {
    racine,
    parametres: existsSync(parametresChemin) ? lireYaml(racine, parametresChemin) : null,
    referentiel: existsSync(join(racine, 'referentiel', 'competences.yaml'))
      ? lireYaml(racine, join(racine, 'referentiel', 'competences.yaml'))
      : null,
    grilles: existsSync(join(racine, 'evaluation', 'grilles.yaml')) ? lireYaml(racine, join(racine, 'evaluation', 'grilles.yaml')) : null,
    programme: existsSync(join(racine, 'programme.yaml')) ? lireYaml(racine, join(racine, 'programme.yaml')) : null,
    sources: fichiers(join(racine, 'bibliotheque', 'sources'), ['.yaml', '.yml']).map((f) => lireYaml(racine, f)),
    modules: [],
  };

  const parcours = join(racine, 'parcours');
  for (const dm of sousDossiers(parcours)) {
    const dossierModule = join(parcours, dm);
    const moduleYaml = join(dossierModule, 'module.yaml');
    const mod: ModuleBrut = {
      dossier: relative(racine, dossierModule),
      module: existsSync(moduleYaml) ? lireYaml(racine, moduleYaml) : null,
      chapitres: [],
    };
    for (const dc of sousDossiers(dossierModule)) {
      const d = join(dossierModule, dc);
      const chapitreMd = join(d, 'chapitre.md');
      const banque = join(d, 'qcm', 'banque.yaml');
      const reponses = join(d, 'qcm', 'reponses.yaml');
      mod.chapitres.push({
        dossier: relative(racine, d),
        chapitre: existsSync(chapitreMd) ? lireMarkdown(racine, chapitreMd) : null,
        lecons: fichiers(join(d, 'lecons'), ['.md']).map((f) => lireMarkdown(racine, f)),
        exercices: fichiers(join(d, 'exercices'), ['.yaml', '.yml']).map((f) => lireYaml(racine, f)),
        corrections: fichiers(join(d, 'corrections'), ['.yaml', '.yml']).map((f) => lireYaml(racine, f)),
        corrigeChapitre: existsSync(join(d, 'corrections', 'corrige-chapitre.md')),
        banque: existsSync(banque) ? lireYaml(racine, banque) : null,
        reponses: existsSync(reponses) ? lireYaml(racine, reponses) : null,
        tp: fichiers(join(d, 'tp'), ['.md']).map((f) => lireMarkdown(racine, f)),
      });
    }
    contenu.modules.push(mod);
  }
  return contenu;
}
