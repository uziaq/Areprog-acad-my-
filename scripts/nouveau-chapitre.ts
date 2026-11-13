/**
 * Crée le squelette d'un chapitre conforme au gabarit (statut brouillon).
 * Usage : node scripts/nouveau-chapitre.ts <module> <chapitre> <slug> "<titre>"
 * Exemple : node scripts/nouveau-chapitre.ts M1 S02 loi-ohm "Grandeurs, loi d'Ohm, puissance"
 * Ne remplace jamais un fichier existant.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseDocument } from 'yaml';

const [moduleId, chapitreId, slug, titre] = process.argv.slice(2);
if (!moduleId || !chapitreId || !slug || !titre || !/^M\d+$/.test(moduleId) || !/^S\d{2}$/.test(chapitreId)) {
  console.error('Usage : node scripts/nouveau-chapitre.ts M1 S02 loi-ohm "Titre du chapitre"');
  process.exit(2);
}

const parcours = join('content', 'parcours');
const dossierModule = existsSync(parcours)
  ? readdirSync(parcours).find((d) => d === moduleId || d.startsWith(`${moduleId}-`))
  : undefined;
if (!dossierModule) {
  console.error(`Module ${moduleId} introuvable : créer d'abord content/parcours/${moduleId}-<nom>/module.yaml`);
  process.exit(1);
}

const aujourdhui = new Date().toISOString().slice(0, 10);
const lecon = `${chapitreId}-L01`;
const d = join(parcours, dossierModule, `${chapitreId}-${slug}`);
for (const s of ['lecons', 'exercices', 'corrections', 'qcm', 'tp', 'figures']) mkdirSync(join(d, s), { recursive: true });

const historique = `historique:\n  - version: "0.1"\n    date: ${aujourdhui}\n    resume: Squelette généré\n`;
const fichiers: Record<string, string> = {
  'chapitre.md': `---
id: ${chapitreId}
titre: ${JSON.stringify(titre)}
module: ${moduleId}
duree_h: 8
competences: []      # codes du référentiel, ex. [D2.2]
prerequis: []        # chapitres, ex. [S01]
lecons: [${lecon}]
tp: []               # ex. [TP-03]
sources: []          # fiches de content/bibliotheque/sources/
version: "0.1"
statut: brouillon
derniere_verification_sources: ${aujourdhui}
${historique}---

## Mesures attendues et tolérances

## Erreurs fréquentes
`,
  [`lecons/${lecon}-${slug}.md`]: `---
id: ${lecon}
titre: ${JSON.stringify(titre)}
chapitre: ${chapitreId}
version: "0.1"
statut: brouillon
duree_min: 90
objectifs: []
prerequis: []
exercices: []
references: []
criteres_evaluation: []
figures: []
derniere_verification_sources: ${aujourdhui}
${historique}---

## Théorie

### Exemple 1

### Exemple 2

### Exemple 3
`,
  [`exercices/${lecon}.yaml`]: '# Énoncés seulement : les solutions vont dans corrections/\n[]\n',
  [`corrections/${lecon}.yaml`]: '# Chargé uniquement après la réponse de l\'apprenant\n[]\n',
  'corrections/corrige-chapitre.md': `# Corrigé du chapitre ${chapitreId}\n`,
  'qcm/banque.yaml': '# Questions sans les bonnes réponses (40 au minimum)\n[]\n',
  'qcm/reponses.yaml': '# Bonnes réponses, explications et pourquoi les autres propositions sont fausses\n[]\n',
};
for (const [nom, texte] of Object.entries(fichiers)) {
  const p = join(d, nom);
  if (existsSync(p)) console.log(`déjà présent, conservé : ${p}`);
  else { writeFileSync(p, texte); console.log(`créé : ${p}`); }
}

const moduleYaml = join(parcours, dossierModule, 'module.yaml');
const doc = parseDocument(readFileSync(moduleYaml, 'utf8'));
const chapitres = (doc.get('chapitres') as { items: { value: string }[] } | undefined)?.items.map((i) => i.value) ?? [];
if (!chapitres.includes(chapitreId)) {
  doc.addIn(['chapitres'], chapitreId);
  writeFileSync(moduleYaml, doc.toString());
  console.log(`${chapitreId} ajouté à ${moduleYaml}`);
}
console.log('\nÉtape suivante : compléter les fichiers puis lancer npm run valider.');
