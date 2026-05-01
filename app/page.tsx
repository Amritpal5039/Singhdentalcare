import Image from "next/image";
import Navbar from "./components/actualcomponent/Navbar";
import SharkTank from "./components/actualcomponent/SharkTank";
import Midsec from "./components/actualcomponent/midsec";
import Footer from "./components/actualcomponent/Footer";
import OurTreatments from "./components/actualcomponent/OurTreatments";
import About from "./components/actualcomponent/Aboutus";
import ContactUs from "./components/actualcomponent/Contact";
import HereWeAre from "./components/actualcomponent/HereWeAre";
import HeroSection from "./components/actualcomponent/HeroSection";
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection/>
      {/* <div className="bodyPrimary font-sfpro font-bold">Hello</div>
      <div className="heroDisplayL font-sfpro">Hello</div> */}

      <About />
      {/* <Midsec/> */}
      <OurTreatments />
      <SharkTank />
      <ContactUs />
      <HereWeAre/>
      <Footer />
    </div>
  );
}
