import SharkTank from "./components/actualcomponent/SharkTank";
import About from "./components/actualcomponent/Aboutus";
import ContactUs from "./components/actualcomponent/Contact";
import HereWeAre from "./components/actualcomponent/HereWeAre";
import HeroSection from "./components/actualcomponent/HeroSection";
import MeetTheDentists from "./components/actualcomponent/MeetTheDentist";
import Search from "./components/actualcomponent/search";
import TestimonialSection from "./components/actualcomponent/TestimonialSection";
import connectDB from "./lib/db";
import Doctor from "./lib/models/Doctor";

async function getDoctors() {
  try {
    await connectDB();
    const doctors = await Doctor.find({}).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(doctors));
  } catch (e) {
    console.error("Error fetching doctors on server:", e);
    return [];
  }
}

export default async function Home() {
  const initialDoctors = await getDoctors();

  return (
    <div className="overflow-x-hidden">
      <HeroSection/>
      <Search/>
      <About />
      <MeetTheDentists initialDoctors={initialDoctors} />
      {/* <Midsec/> */}
      {/* <OurTreatments /> */}
      {/* <SharkTank /> */}
      <TestimonialSection />
      <ContactUs />
      <HereWeAre/>
    </div>
  );
}
