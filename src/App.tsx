// import Lore from "./components/Lore";
import About from "./components/About";
import Hero from "./components/Hero";
import Team from "./components/Team";
import Schedule from "./components/Schedule";
// import Gallery from "./components/Gallery";
// import Rsvp from "./components/Rsvp";
import Footer from "./components/Footer";
// import Loader from "./components/Loader";

import 'aos/dist/aos.css';

export default function UmbrellaEventSite() {
  return (
    <>
      {/* <Loader /> */}
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Hero />
        <About />
        <Team />
        <Schedule />
        {/* <Gallery /> */}
        {/* <Lore /> */}
  {/* <Puzzle /> */}
        {/* <Rsvp /> */}
        <Footer />
      </div>
    </>
  );
}
