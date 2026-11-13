/**
 * Collections Astro : seules les leçons et les TP sont rendus par le moteur Markdown.
 * Les autres données (exercices, QCM, corrections, sources) sont lues par src/lib/contenu.ts
 * avec les mêmes schémas.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { leconSchema, tpSchema } from './schemas/contenu.ts';

const lecons = defineCollection({
  loader: glob({
    pattern: '**/lecons/*.md',
    base: './content/parcours',
    generateId: ({ data }) => String(data.id),
  }),
  schema: leconSchema,
});

const tp = defineCollection({
  loader: glob({
    pattern: '**/tp/*.md',
    base: './content/parcours',
    generateId: ({ data }) => String(data.id),
  }),
  schema: tpSchema,
});

export const collections = { lecons, tp };
