import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: 'Liao ChenChing',
		description: 'Ralph Liao 的部落格文章',
		site: context.site,
		items: posts
			.sort((a, b) => {
				const dateA = a.data.date || a.data.pubDate || new Date(0);
				const dateB = b.data.date || b.data.pubDate || new Date(0);
				return new Date(dateB) - new Date(dateA);
			})
			.map((post) => ({
				title: post.data.title,
				pubDate: post.data.date || post.data.pubDate,
				description: post.data.description,
				link: `/blog/${post.id}/`,
			})),
	});
}
