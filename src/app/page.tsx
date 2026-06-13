import About from "@/components/About";
import BeforeYouCome from "@/components/BeforeYouCome";
import Classes from "@/components/Classes";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import Marquee from "@/components/Marquee";
import Memberships from "@/components/Memberships";
import Schedule from "@/components/Schedule";
import Teachers from "@/components/Teachers";
export default function Home() {
  return (
    <>
      <Header />
      <Marquee />
      <main>
        <Hero />
        <Schedule />
        <About />
        <Classes />
        <Teachers />
        <Memberships />
        <BeforeYouCome />
        <FAQ />
        <Location />
      </main>
      <Footer />
    </>
  );
}
