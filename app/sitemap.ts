import { MetadataRoute } from "next";

// 静态 sitemap 配置
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://countdown-online.com";

  // 所有常用时间段
  const allDurations = [60, 300, 600, 900, 1800, 3600, 7200, 86400];

  // 生成所有倒计时 URL
  const countdownUrls = allDurations.map(duration => ({
    url: `${baseUrl}/countdown/${duration}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  // 基础页面
  const baseUrls = [
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
  ];

  return [...baseUrls, ...countdownUrls];
}
