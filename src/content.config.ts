import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: () =>
		z.object({
			layout: z.string().optional(),
			title: z.string(),
			date: z.coerce.date().optional(), // pubDate mapped from date or just use date
			pubDate: z.coerce.date().optional(), // some Jekyll posts might use pubDate? No, usually date
			categories: z.union([z.string(), z.array(z.string())]).optional(),
			tags: z.union([z.string(), z.array(z.string())]).optional(),
			excerpt: z.string().optional(),
			description: z.string().optional(),
			image: z.string().optional(), // keep as string path from /assets/...
		}),
});

export const collections = { blog };
