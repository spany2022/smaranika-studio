import Header from "@/components/Header";
import MobileBar from "@/components/MobileBar";
import Reveals from "@/components/motion/Reveals";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Stories from "@/components/sections/Stories";
import Films from "@/components/sections/Films";
import Approach from "@/components/sections/Approach";
import Services from "@/components/sections/Services";
import Journal from "@/components/sections/Journal";
import LoveNotes from "@/components/sections/LoveNotes";
import Inquiry from "@/components/sections/Inquiry";
import Finale from "@/components/sections/Finale";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Philosophy />
        <Stories />
        <Films />
        <Approach />
        <Services />
        <Journal />
        <LoveNotes />
        <Inquiry />
      </main>
      <Finale />
      <MobileBar />
      <Reveals />
    </>
  );
}
