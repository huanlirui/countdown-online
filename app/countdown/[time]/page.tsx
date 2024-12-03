/*
 * @Description:
 */
import { CountdownTimer } from "@/components/CountdownTimer";
type PageProps = {
  params: Promise<{ time: string }>;
};

export default async function CountdownPage({ params }: PageProps) {
  const getInitialSeconds = (time: string): number => {
    if (time === "custom") {
      return 300;
    }
    const seconds = parseInt(time, 10);
    if (isNaN(seconds) || seconds <= 0) {
      throw new Error("无效的时间参数");
    }
    return seconds;
  };

  try {
    const { time } = await params;
    const initialSeconds = getInitialSeconds(time);
    return <CountdownTimer initialSeconds={initialSeconds} />;
  } catch (error) {
    console.error(error);
    return <div>时间参数无效，请检查 URL。</div>;
  }
}
