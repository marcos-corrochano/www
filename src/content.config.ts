import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string().min(3).max(30),
			description: z.string().max(50),
			date: z.iso.date(),
			cover: z
				.object({
					image: image(),
					alt: z.string().min(3),
					url: z.string().optional()
				})
				.optional(),
			draft: z.boolean().optional().default(false)
		})
})

export const collections = { articles }
