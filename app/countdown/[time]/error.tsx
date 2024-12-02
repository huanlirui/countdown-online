/*
 * @Description:
 */
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">页面错误</h2>
      <p className="text-gray-600">请输入有效的时间参数</p>
      <Button className="mt-4">
        <Link href="/">返回</Link>
      </Button>
    </div>
  );
}
