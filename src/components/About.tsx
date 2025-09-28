import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";

import { Shield } from "lucide-react";

const About: React.FC = () => {
  const [decipheredText, setDecipheredText] = useState("");
  const [isDeciphering, setIsDeciphering] = useState(false);
  const [completedDecipher, setCompletedDecipher] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const originalText = `Operation Red vs Blue`.toUpperCase();

  const decipherText = (text: string, callback: (result: string) => void) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const finalText = text;
    let currentText = "";
    let iterations = 0;

    const interval = setInterval(() => {
      currentText = finalText
        .split("")
        .map((char, index) => {
          if (index < iterations) return finalText[index];
          if (char === " " || char === "\n") return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      callback(currentText);

      if (iterations >= finalText.length) {
        setCompletedDecipher(true);
        clearInterval(interval);
      }

      iterations += 0.5;
    }, 50);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isDeciphering) {
            setIsDeciphering(true);
            decipherText(originalText, setDecipheredText);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, [isDeciphering, originalText]);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
    });
  }, []);

  return (
    <section ref={aboutRef} className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto" data-aos="fade-up">
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-red-500" />
            <h2 className="text-3xl font-mono text-red-400">
              {decipheredText}
            </h2>
            {isDeciphering && !completedDecipher && (
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 font-mono text-xs">
                  DECIPHERING...
                </span>
              </div>
            )}
          </div>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p className="font-mono text-sm text-blue-400 mb-4 uppercase">
              [CLASSIFICATION LEVEL: ALPHA] - Operation Red vs Blue
            </p>

            <div className="space-y-4">
              <div className="space-y-4">
                <p>
                  Umbrella Corporation has silently overthrown the U.S.
                  government and military, repurposing its vast cyber
                  infrastructure to initiate a viral war. Their endgame: launch
                  infected nuclear warheads targeting India, China, and the
                  subcontinent—unleashing a new era of bio-terror. With time
                  running out, a classified cyber task force has been deployed
                  under Operation Red vs Blue to counter the threat.
                </p>

                <p>
                  Some elite hacker units will engage in a high-stakes digital
                  breach, navigating U.C.'s hardened network architecture to
                  locate and neutralize the warhead control systems. Only one
                  team will succeed. The operation is India's last line of
                  defense, and the outcome will determine whether the virus is
                  contained—or unleashed on the world.
                </p>
              </div>
            </div>

            {/* <div className="bg-red-950/30 border border-red-500/30 rounded p-4 mt-6">
              <p className="text-red-300 font-mono text-sm">
                ⚠️ WARNING: All participants must undergo bio-decontamination
                procedures. Umbrella Corporation assumes no liability for
                exposure to experimental pathogens.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
