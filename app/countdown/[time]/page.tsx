/*
 * @Description:
 */
import { CountdownTimer } from "@/components/CountdownTimer";

interface CountdownPageProps {
  params: {
    time: string;
  };
}

export default async function CountdownPage({ params }: CountdownPageProps) {
  const getInitialSeconds = (time: string) => {
    if (time === "custom") {
      return 300; // 默认5分钟
    }
    const seconds = parseInt(time, 10);
    if (isNaN(seconds) || seconds <= 0) {
      throw new Error("无效的时间参数");
    }
    return seconds;
  };

  try {
    const { time } = await params;
    return <CountdownTimer initialSeconds={getInitialSeconds(time)} />;
  } catch (error) {
    throw error; // 将错误抛出给 Next.js 错误边界处理
  }
}
