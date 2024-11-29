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
    return parseInt(time, 10);
  };

  return <CountdownTimer initialSeconds={getInitialSeconds(params.time)} />;
}
