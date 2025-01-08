import { CountdownTimer } from "@/components/CountdownTimer";

interface Props {
  params: {
    time: string;
  };
}

export default async function CountdownPage({ params }: Props) {
  const { time } = await params;
  const seconds = parseInt(time);

  if (isNaN(seconds) || seconds < 0) {
    throw new Error("Invalid countdown time");
  }

  return <CountdownTimer initialSeconds={seconds} />;
}
