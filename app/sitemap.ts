import { MetadataRoute } from "next";
import { locales, defaultLocale } from "../i18n";

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

const baseUrl = "https://www.countdown-online.com";

// 缓存控制
let sitemapCache: MetadataRoute.Sitemap | null = null;
let lastCacheTime: number = 0;
const CACHE_DURATION = 3600000; // 1小时的缓存时间

// 生成基础页面 URL
const generateBaseUrls = () => {
  return locales.flatMap(locale => {
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
};

// 生成倒计时 URL
const generateCountdownUrls = () => {
  return locales.flatMap(locale => {
    const isDefault = locale === defaultLocale;
    const localePath = isDefault ? '' : `/${locale}`;
    
    return allDurations.map(duration => ({
      url: `${baseUrl}${localePath}/countdown/${duration}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const, // 改为 monthly，因为内容较静态
      priority: isDefault 
        ? (duration <= 3600 ? 0.8 : 0.7)
        : (duration <= 3600 ? 0.7 : 0.6)
    }));
  });
};

// 主 sitemap 生成函数
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // 检查缓存是否有效
    const now = Date.now();
    if (sitemapCache && (now - lastCacheTime < CACHE_DURATION)) {
      return sitemapCache;
    }

    // 生成新的 sitemap
    const baseUrls = generateBaseUrls();
    const countdownUrls = generateCountdownUrls();
    
    // 更新缓存
    sitemapCache = [...baseUrls, ...countdownUrls];
    lastCacheTime = now;
    
    return sitemapCache;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // 返回基本的 sitemap 作为降级方案
    return [{
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    }];
  }
}
