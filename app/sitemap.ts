import { MetadataRoute } from "next";

// 静态 sitemap 配置
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://countdown-online.com";

  // 所有常用时间段（秒）
  const allDurations = [
    // 短时间段
    30, 60, 90, 120, 180, 240, 300,  // 30秒到5分钟
    600, 900, 1200, 1500, 1800,      // 10分钟到30分钟
    2400, 3000, 3600,                // 40分钟到1小时
    
    // 小时级别
    7200, 10800, 14400, 18000,       // 2小时到5小时
    21600, 28800, 36000, 43200,      // 6小时到12小时
    
    // 天级别
    86400, 172800, 259200,           // 1天到3天
    345600, 432000, 518400, 604800,  // 4天到7天
    
    // 月级别（约数）
    2592000, 5184000,                // 30天到60天
  ];

  // 生成所有倒计时 URL
  const countdownUrls = allDurations.map(duration => ({
    url: `${baseUrl}/countdown/${duration}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: duration <= 3600 ? 0.8 : 0.7  // 短时间倒计时优先级更高
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
      changeFrequency: "daily" as const,
      priority: 0.9
    },
    // 添加多语言支持的URL
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/en/countdown/custom`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8
    }
  ];

  // 为常用时间段生成英文版本的URL
  const enCountdownUrls = allDurations.map(duration => ({
    url: `${baseUrl}/en/countdown/${duration}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: duration <= 3600 ? 0.7 : 0.6  // 英文版本优先级稍低
  }));

  return [...baseUrls, ...countdownUrls, ...enCountdownUrls];
}
