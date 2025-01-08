import { CountdownTimer } from "@/components/CountdownTimer";

interface Props {
  params: Promise<{
    time: string;
    locale: string;
  }>;
}

export default async function CountdownPage({ params }: Props) {
  const { time } = await params;
  const seconds = parseInt(time);

  if (isNaN(seconds) || seconds < 0) {
    throw new Error("Invalid countdown time");
  }

  return <CountdownTimer initialSeconds={seconds} />;
}
