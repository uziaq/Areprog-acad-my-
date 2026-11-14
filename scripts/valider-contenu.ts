/**
 * Contrôle de conformité du contenu pédagogique (F25).
 * Usage : npm run valider [-- chemin/vers/content]
 * Code de sortie 1 s'il reste au moins une erreur : la construction est alors bloquée.
 */
import { resolve } from 'node:path';
import { chargerContenu } from '../src/validation/charger.ts';
import { validerContenu, type Diagnostic } from '../src/validation/regles.ts';

const racine = resolve(process.argv[2] ?? 'content');
const diags = validerContenu(chargerContenu(racine));

const parFichier = new Map<string, Diagnostic[]>();
for (const d of diags) parFichier.set(d.fichier, [...(parFichier.get(d.fichier) ?? []), d]);

for (const [fichier, liste] of [...parFichier].sort(([a], [b]) => a.localeCompare(b))) {
  console.log(`\n${fichier}`);
  for (const d of liste) {
    const marque = d.gravite === 'erreur' ? '  ✖ erreur        ' : '  ⚠ avertissement ';
    console.log(`${marque} [${d.regle}] ${d.message}`);
  }
}

const erreurs = diags.filter((d) => d.gravite === 'erreur').length;
const avertissements = diags.length - erreurs;
console.log(`\nContrôle du contenu : ${erreurs} erreur(s), ${avertissements} avertissement(s).`);
if (erreurs > 0) {
  console.log('Contenu non conforme : corriger les erreurs avant publication.');
  process.exit(1);
}
