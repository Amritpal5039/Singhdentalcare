import Image from "next/image";
import Navbar from "../components/actualcomponent/Navbar";
export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="bodyPrimary font-sfpro font-bold">Hello</div>
      <div className="heroDisplayL font-sfpro">Hello</div>
    </div>
  );
}
