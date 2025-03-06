import { MetadataRoute } from "next";
import { locales, defaultLocale } from "../i18n";

// 静态 sitemap 配置
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.countdown-online.com";

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

  // 基础页面 - 处理默认语言和其他语言版本
  const baseUrls = locales.flatMap(locale => {
    const isDefault = locale === defaultLocale;
    const localePath = isDefault ? '' : `/${locale}`;
    
    return [
      {
        url: `${baseUrl}${localePath}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: isDefault ? 1 : 0.9
      },
      {
        url: `${baseUrl}${localePath}/countdown/custom`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: isDefault ? 0.9 : 0.8
      }
    ];
  });

  // 为每个语言生成倒计时 URL，默认语言不加前缀
  const countdownUrls = locales.flatMap(locale => {
    const isDefault = locale === defaultLocale;
    const localePath = isDefault ? '' : `/${locale}`;
    
    return allDurations.map(duration => ({
      url: `${baseUrl}${localePath}/countdown/${duration}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: isDefault 
        ? (duration <= 3600 ? 0.8 : 0.7)  // 默认语言版本优先级更高
        : (duration <= 3600 ? 0.7 : 0.6)  // 其他语言版本优先级稍低
    }));
  });

  return [...baseUrls, ...countdownUrls];
}
