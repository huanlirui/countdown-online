import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // 支持的语言列表
  locales: locales,
  // 默认语言
  defaultLocale: defaultLocale,
  // 关闭自动重定向
  localePrefix: "as-needed",
  // 可选：如果您想保持默认语言的URL不带前缀
  localeDetection: false
});

export const config = {
  // 匹配所有路径，但排除以下路径：
  // - api (API 路由)
  // - _next (Next.js 内部路由)
  // - 以点开头的文件 (例如 favicon.ico)
  matcher: ['/', '/(zh|en)/:path*', '/countdown/:path*']
};
