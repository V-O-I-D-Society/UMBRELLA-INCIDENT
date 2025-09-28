import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'; // Add this import

import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Button } from "@/components/ui/button";

import { Lock, AlertTriangle } from "lucide-react";
// import { Badge } from "./ui/badge";

import UmbrellaEmblem from "@/assets/Umbrellaemblem.png";
import UmbrellaEmblemContour from "@/assets/Umbrellaemblem_contour.png";

import "@/components/Hero.css";

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  // const [glitchActive, setGlitchActive] = useState(false);
  const fullText = "RED  vs BLUE";
  // const text = "RED   vs BLUE";
  useEffect(() => {
    let i = 0;
    setDisplayText(""); // Reset display text
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1)); // Use slice instead
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150); // Adjust typing speed here (in ms)

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-400 opacity-10" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillrule='evenodd'%3E%3Cg fill='%23ff0000' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

      {/* <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent animate-pulse"
                style={{
                  top: `${20 + i * 15}%`,
                  left: "-100%",
                  right: "-100%",
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: "4s",
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-red-500/40 rotate-45 animate-bounce"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 30}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: "3s",
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0">
            <div
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent animate-pulse"
              style={{ top: "30%", animationDuration: "2s" }}
            />
            <div
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent animate-pulse"
              style={{
                top: "70%",
                animationDuration: "2.5s",
                animationDelay: "1s",
              }}
            />
          </div>

          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-red-500/30 animate-pulse" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-blue-500/30 animate-pulse" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-blue-500/30 animate-pulse" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-red-500/30 animate-pulse" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full mb-6">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm font-mono">
                CLASSIFIED OPERATION
              </span>
            </div>
          </div>

          <h1
            className={`text-6xl md:text-8xl font-bold mb-6 ${
              glitchActive ? "animate-pulse" : ""
            }`}
          >
            <span className="bg-gradient-to-r from-red-500 via-white to-blue-500 bg-clip-text text-transparent">
              RED vs BLUE
            </span>
          </h1>

          <h2 className="text-2xl md:text-4xl font-mono mb-4 text-gray-300">
            UMBRELLA PROTOCOL
          </h2>

          <p className="text-xl md:text-2xl mb-12 text-gray-400 font-light">
            Choose your faction. Control the infection.
          </p>

          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-mono border border-red-500 shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-red-500/50"
          >
            ENTER THE ARENA
          </Button>
        </div>
      </section> */}

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 size-24 opacity-75">
        <img
          src={UmbrellaEmblem}
          alt="Umbrella Corp Emblem"
          className="w-full neon-glow" // add neon-pulse to animate
        />

        <div
          className="emblem-contour"
          style={
            {
              "--image-path": `url('${UmbrellaEmblemContour}')`,
            } as React.CSSProperties
          }
        ></div>
      </div>

      <HeroHighlight containerClassName="bg-transparent relative min-h-screen pt-8">
        {/* <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          With insomnia, nothing&apos;s real. Everything is far away. Everything
          is a{" "}
          <Highlight className="text-black dark:text-white">
            copy, of a copy, of a copy.
          </Highlight>
        </motion.h1> */}

        <div className="relative z-10 text-center max-w-4xl mx-auto ">
          <div className="mb-2">
            <div className="relative right-5 inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm font-mono relative left-1.5 right-2 width-fit">
                CLASSIFIED OPERATION
              </span>
            </div>
          </div>

          <motion.h1
            className="text-6xl md:text-8xl font-mono mb-8 text-white glitch-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="relative left-5">
              {displayText}
              <span className="cursor-blink">|</span>
            </span>
          </motion.h1>

          {/* <div className="text-4xl font-extrabold py-2 px-4 mb-6 text-transparent" style={{
            WebkitTextStroke: "1px var(--color-white)"
          }}>CTF</div> */}

          {/* <h5 className="text-5xl font-bold text-red-400">CTF</h5> */}

          <h2 className="text-2xl md:text-4xl font-mono mb-2 text-gray-300">
            UMBRELLA PROTOCOL
          </h2>

          <p className="text-xl md:text-2xl mb-4 text-gray-400 font-light">
            Can you control the network?
          </p>

          <div className="text-base md:text-xl mb-8 text-gray-400 w-fit mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 relative md:py-8">
            <div>
              <div className="text-center font-light uppercase text-base">
                Powered by
              </div>
              <div className="text-emerald-500 text-lg md:text-2xl font-bold">
                Wipro Cybersecurity Center of Excellence
              </div>
            </div>

            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl pr-5 hidden md:inline rotate-15 font-extralight text-[rgba(255,255,255,.4)]">
              |
            </span>

            <div>
              <div className="text-center font-light uppercase text-base">
                Organized by
              </div>
              <div className="text-cyan-500 text-lg md:text-2xl font-bold">
                Department of Computer Science & Engineering, KIET
              </div>
            </div>
            {/* <br />
            Organized by{" "}
            <strong className="text-cyan-600 text-lg md:text-2xl">
              Department of Computer Science & Engineering, KIET
            </strong> */}
          </div>

          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-mono border border-red-500 shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-red-500/50"
            // onMouseEnter={() => setGlitchActive(true)}
            // onMouseLeave={() => setGlitchActive(false)}
          >
            <Lock className="w-5 h-5 mr-2" />
            <Link to="/wtf">
              ENTER THE ARENA
            </Link>
          </Button>
        </div>
      </HeroHighlight>
    </>
  );
};

export default Hero;
