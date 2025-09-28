import React from "react";

import { AlertTriangle } from "lucide-react";

const Lore: React.FC = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        {/* Static/Glitch Effect */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff0000' fillOpacity='0.02'%3E%3Crect x='0' y='0' width='2' height='2'/%3E%3Crect x='20' y='10' width='1' height='3'/%3E%3Crect x='40' y='5' width='3' height='1'/%3E%3Crect x='60' y='15' width='1' height='2'/%3E%3Crect x='80' y='8' width='2' height='1'/%3E%3C/g%3E%3C/svg%3E')] animate-pulse opacity-30" />

        {/* Classified Document Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-black/40" />

        {/* Glitch Lines */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-red-500/30 animate-pulse"
              style={{
                top: `${25 + i * 20}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded mb-4">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-xs font-mono tracking-wider">
              CLASSIFIED BRIEFING
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-wider">
            THE <span className="text-red-400">OUTBREAK</span> BEGINS
          </h2>
        </div>

        <div className="bg-black/60 border border-red-500/30 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden">
          {/* Document Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-500/20">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 font-mono text-sm tracking-wider">
                TRANSMISSION ACTIVE
              </span>
            </div>
            <span className="text-gray-500 font-mono text-xs">
              CLEARANCE: ALPHA-7
            </span>
          </div>

          {/* Main Lore Text */}
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <div className="font-mono text-sm text-red-400 mb-4 tracking-wider">
              [EMERGENCY BROADCAST] - UMBRELLA TACTICAL DIVISION
            </div>

            <p className="text-lg md:text-xl leading-relaxed font-light tracking-wide">
              In the shadow of global bio-crisis,{" "}
              <strong className="text-red-400 font-bold">
                two forces emerge
              </strong>
              . One is the{" "}
              <span className="text-red-300 font-semibold">Umbrella Corps</span>{" "}
              — precision, control, and evolution through chaos.
            </p>

            <p className="text-lg md:text-xl leading-relaxed font-light tracking-wide">
              The other, the{" "}
              <span className="text-blue-300 font-semibold">Resistance</span> —
              survivors hardened by loss, fighting to prevent humanity's final
              downfall.
            </p>

            <div className="bg-red-950/40 border-l-4 border-red-500 pl-6 py-4 my-8">
              <p className="text-xl md:text-2xl font-bold text-white tracking-wide leading-relaxed">
                Now, in this city turned battleground, these forces clash.
              </p>
            </div>

            <div className="text-center py-6">
              <p className="text-2xl md:text-3xl font-bold text-red-400 tracking-widest mb-2">
                CHOOSE YOUR ALLEGIANCE
              </p>
              <p className="text-xl md:text-2xl font-bold text-white tracking-widest">
                PREPARE FOR COMBAT
              </p>
            </div>
          </div>

          {/* Bottom Classification */}
          <div className="mt-8 pt-4 border-t border-red-500/20 text-center">
            <p className="text-red-500 font-mono text-xs tracking-wider">
              END TRANSMISSION - UMBRELLA CORPORATION INTERNAL USE ONLY
            </p>
          </div>

          {/* Subtle Overlay Effects */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Lore;
