export async function GET() {
  const baseUrl = "https://www.countdown-online.com";
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}</loc>
    <image:image>
      <image:loc>${baseUrl}/previewHome.jpg</image:loc>
      <image:title>Countdown Online Preview</image:title>
      <image:caption>Preview of the Countdown Online application interface</image:caption>
    </image:image>
  </url>
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
} 