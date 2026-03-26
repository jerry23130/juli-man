import { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ClientsMarquee } from "@/components/ClientsMarquee";
import { About } from "@/components/About";
import { Showreel } from "@/components/Showreel";
import { Services } from "@/components/Services";
import { TextMarquee } from "@/components/TextMarquee";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Process } from "@/components/Process";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FilmGrain } from "@/components/FilmGrain";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Preloader onComplete={handleLoaded} />
      
      <SmoothScroll />
      <div className={`relative min-h-screen bg-background transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <FilmGrain />
        <Navbar />
        <Hero />
        <ClientsMarquee />
        <About />
        <Showreel />
        <TextMarquee />
        <Services />
        <FeaturedProjects />
        <Process />
        <Gallery />
        <Testimonials />
        <Booking />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
