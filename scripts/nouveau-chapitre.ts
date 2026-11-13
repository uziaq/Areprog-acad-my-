/**
 * Crée le squelette d'un chapitre (une semaine du programme), pré-rempli depuis content/programme.yaml
 * et le référentiel : titre, module, prérequis, TP, compétences enseignées. Statut brouillon.
 * Usage : node scripts/nouveau-chapitre.ts <semaine> <slug>
 * Exemple : node scripts/nouveau-chapitre.ts S03 kirchhoff-diviseurs
 * Crée le dossier et le module.yaml du module s'ils n'existent pas. Ne remplace jamais un fichier existant.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse, parseDocument } from 'yaml';
import { competenceSchema, programmeSchema } from '../src/schemas/contenu.ts';

const [chapitreId, slug] = process.argv.slice(2);
if (!chapitreId || !slug || !/^S\d{2}$/.test(chapitreId) || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('Usage : node scripts/nouveau-chapitre.ts S03 kirchhoff-diviseurs   (slug en minuscules, sans accent)');
  process.exit(2);
}

const programme = programmeSchema.parse(parse(readFileSync(join('content', 'programme.yaml'), 'utf8')));
const referentiel = competenceSchema.array().parse(parse(readFileSync(join('content', 'referentiel', 'competences.yaml'), 'utf8')));
const semaine = programme.semaines.find((w) => w.id === chapitreId);
if (!semaine) {
  console.error(`${chapitreId} absente de content/programme.yaml : l'ajouter d'abord au programme.`);
  process.exit(1);
}
const mod = programme.modules.find((m) => m.id === semaine.module)!;
const titre = semaine.titre;
const moduleId = mod.id;
const competences = referentiel.filter((c) => c.enseignee_en.includes(chapitreId)).map((c) => c.code);
const liste = (xs: string[]) => `[${xs.join(', ')}]`;
const sansAccent = (t: string) =>
  t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const parcours = join('content', 'parcours');
let dossierModule = existsSync(parcours)
  ? readdirSync(parcours).find((d) => d === moduleId || d.startsWith(`${moduleId}-`))
  : undefined;
if (!dossierModule) {
  dossierModule = `${moduleId}-${sansAccent(mod.titre)}`;
  mkdirSync(join(parcours, dossierModule), { recursive: true });
  writeFileSync(
    join(parcours, dossierModule, 'module.yaml'),
    `id: ${moduleId}\ntitre: ${JSON.stringify(mod.titre)}\nordre: ${Number(moduleId.slice(1))}\nchapitres: []\n`,
  );
  console.log(`créé : module ${moduleId} (${join(parcours, dossierModule, 'module.yaml')})`);
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
competences: ${liste(competences)}      # d'après le référentiel (enseignee_en)
prerequis: ${liste(semaine.prerequis)}        # d'après le programme
lecons: [${lecon}]
tp: ${liste(semaine.tp)}               # d'après le programme ; un fichier tp/TP-xx.md par TP
sources: []          # fiches de content/bibliotheque/sources/
version: "0.1"
statut: brouillon
derniere_verification_sources: ${aujourdhui}
${historique}---
${semaine.protocole === 'renforce' ? '\n<!-- Semaine sous protocole de sécurité renforcé : chaque TP porte securite: renforcee (voir .claude/rules/securite-et-deploiement.md). -->\n' : ''}${semaine.evaluation ? `\n<!-- Semaine d'épreuve (${semaine.evaluation}) : voir docs/pedagogie/04-evaluation.md. -->\n` : ''}
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
  const ordre = mod.semaines.filter((x) => x === chapitreId || chapitres.includes(x));
  doc.set('chapitres', doc.createNode(ordre, { flow: true }));
  writeFileSync(moduleYaml, doc.toString());
  console.log(`${chapitreId} ajouté à ${moduleYaml}`);
}
console.log('\nÉtape suivante : compléter les fichiers puis lancer npm run valider.');
