/*
 * @Description:
 */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "倒计时工具 | 简单好用的在线计时器",
  description: "免费在线倒计时工具，支持自定义时间，全屏显示，多种模式可选。适用于演讲、考试、运动等场景。",
  keywords: "倒计时,计时器,在线工具,全屏倒计时,定时器"
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">简单易用的在线倒计时工具</h1>
        <p className="text-lg text-center text-muted-foreground mb-12">为您的每个重要时刻提供精确计时</p>

        {/* Quick Start Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <Link href="/countdown/3600">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold mb-2">1小时倒计时</h3>
              <p className="text-sm text-muted-foreground">适用于考试、演讲等场景</p>
            </Card>
          </Link>
          <Link href="/countdown/1800">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold mb-2">30分钟倒计时</h3>
              <p className="text-sm text-muted-foreground">适用于短会、休息等场景</p>
            </Card>
          </Link>
          <Link href="/countdown/custom">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold mb-2">自定义倒计时</h3>
              <p className="text-sm text-muted-foreground">自由设置您需要的时间</p>
            </Card>
          </Link>
        </div>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">全屏显示</h3>
            <p className="text-muted-foreground">清晰大字体，远距离可见</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">多种主题</h3>
            <p className="text-muted-foreground">支持明暗模式，多种颜色方案</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">声音提醒</h3>
            <p className="text-muted-foreground">时间到期自动提醒，防止遗漏</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center border-t">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} 倒计时工具 - 让时间管理更简单</p>
      </footer>
    </div>
  );
}
