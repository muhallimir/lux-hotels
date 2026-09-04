import posts from "./blogPosts";

const escape = (s) => String(s)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&apos;");

export const buildRss = (siteUrl = "https://luxhotels.example.com") => {
  const items = posts.map((p) => `
    <item>
      <title>${escape(p.title)}</title>
      <link>${siteUrl}/blog/${p.slug}</link>
      <guid>${siteUrl}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <author>${escape(p.author)}</author>
      <description>${escape(p.excerpt)}</description>
    </item>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Lux Hotels — Travel journal</title>
    <link>${siteUrl}/blog</link>
    <description>Stories from our team and guests.</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;
};
