import SharkTank from "./components/actualcomponent/SharkTank";
import OurTreatments from "./components/actualcomponent/OurTreatments";
import About from "./components/actualcomponent/Aboutus";
import ContactUs from "./components/actualcomponent/Contact";
import HereWeAre from "./components/actualcomponent/HereWeAre";
import HeroSection from "./components/actualcomponent/HeroSection";
import Midsec from "./components/actualcomponent/midsec";
import MeetTheDentists from "./components/actualcomponent/MeetTheDentist";
import Search from "./components/actualcomponent/search";
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Search/>
      <HeroSection/>
      <About />
      <MeetTheDentists/>
      {/* <Midsec/> */}
      {/* <OurTreatments /> */}
      <SharkTank />
      <ContactUs />
      <HereWeAre/>
    </div>
  );
}
