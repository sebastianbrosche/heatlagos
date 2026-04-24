import About from "@/components/About";
import BeforeYouCome from "@/components/BeforeYouCome";
import Classes from "@/components/Classes";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import Marquee from "@/components/Marquee";
import Memberships from "@/components/Memberships";
import Schedule from "@/components/Schedule";
import Teachers from "@/components/Teachers";
import Workshops from "@/components/Workshops";

export default function Home() {
  return (
    <>
      <Header />
      <Marquee />
      <main>
        <Hero />
        <About />
        <Classes />
        <Teachers />
        <Schedule />
        <Memberships />
        <BeforeYouCome />
        <Workshops />
        <Location />
      </main>
      <Footer />
    </>
  );
}
