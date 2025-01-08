export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://www.countdown-online.com",
          "@type": "WebApplication",
          "name": "倒计时工具",
          "description": "免费在线倒计时工具，支持多个倒计时同时进行，精确到秒",
          "url": "https://www.countdown-online.com",
          "applicationCategory": "工具软件",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "CNY"
          },
          "author": {
            "@type": "Person",
            "name": "ynxh666"
          }
        })
      }}
    />
  );
} 