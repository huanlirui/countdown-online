import { MetadataRoute } from "next";

export async function generateSitemaps() {
  // 这里我们将常用时间分成多个 sitemap
  const commonDurations = [
    [60, 300, 600], // 第一个 sitemap
    [900, 1800, 3600], // 第二个 sitemap
    [7200, 86400] // 第三个 sitemap
  ];

  return commonDurations.map((_, index) => ({
    id: index,
  }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://countdown-online.com";

  // 所有常用时间段
  const allDurations = [
    [60, 300, 600], // 第一组
    [900, 1800, 3600], // 第二组
    [7200, 86400] // 第三组
  ];

  // 获取当前 sitemap 对应的时间段
  const currentDurations = allDurations[id];

  // 生成当前分组的倒计时 URL
  const countdownUrls = currentDurations.map(duration => ({
    url: `${baseUrl}/countdown/${duration}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  // 只在第一个 sitemap 中包含主页和自定义倒计时页面
  const baseUrls = id === 0 ? [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1
    },
    {
      url: `${baseUrl}/countdown/custom`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9
    }
  ] : [];

  return [...baseUrls, ...countdownUrls];
}
