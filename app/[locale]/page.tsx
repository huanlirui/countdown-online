import Navbar from "../components/Navbar";
import { HomeFooter } from "@/components/HomeFooter";
import { HomeMain } from "@/components/HomeMain";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-16 mt-16">
        <HomeMain />
      </main>
      <HomeFooter />
    </div>
  );
}
