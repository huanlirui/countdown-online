import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // 支持的语言列表
  locales: locales,
  // 默认语言
  defaultLocale: defaultLocale,
  // 修改：仅在非默认语言时显示语言前缀
  localePrefix: "as-needed",
  // 开启语言检测，但优先使用 URL 中的语言设置
  localeDetection: true
});

export const config = {
  // 匹配所有路径，但排除以下路径：
  // - api (API 路由)
  // - _next (Next.js 内部路由)
  // - 以点开头的文件 (例如 favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
