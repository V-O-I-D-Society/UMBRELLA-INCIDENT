import React from "react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import { Lock } from "lucide-react";

const Puzzle: React.FC = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden" data-aos="fade-up">
      {/* Terminal Background Effects */}
      <div className="absolute inset-0">
        {/* Matrix-style background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-green-950/10 to-black/60" />

        {/* Scanning Lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent"
              style={{
                top: `${30 + i * 25}%`,
                animation: `scan 3s linear infinite`,
                animationDelay: `${i * 1}s`,
              }}
            />
          ))}
        </div>

        {/* Terminal Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wider font-mono">
            DECODE THE <span className="text-green-400">MISSION</span>
          </h2>
          {/* <p className="text-xl text-blue-300 font-mono tracking-wide">
            "Only the worthy earn early access."
          </p> */}

          {/* <p className="text-md text-blue-300 font-mono tracking-wide pt-8">
            An old hacker left behind their kernel project — but they weren’t
            done. Somewhere, buried in an ancient Unix clone, lies a key to
            unlock the next phase of your mission. They left a message in
            Pastebin, but others say the real secrets lie in the bones of the
            code itself.
          </p> */}
        </div>

        <div className="bg-black/80 border border-green-500/30 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden font-mono">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-green-500/20">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <span className="text-green-400 text-sm tracking-wider ml-4">
              UMBRELLA_TERMINAL_v2.7.3
            </span>
          </div>

          <div className="space-y-6">
            <p className="text-green-400 font-mono text-md">
              {">"} An old hacker left behind their kernel project — but they weren’t
              done. Somewhere, buried in an ancient Unix clone, lies a key to
              unlock the next phase of your mission. They left a message in
              Pastebin, but others say the real secrets lie in the bones of the
              code itself.
            </p>
            {/* <div className="text-green-400 text-sm">
              <p>{">"} ACCESSING ENCRYPTED TRANSMISSION...</p>
              <p>{">"} DECRYPTION KEY REQUIRED</p>
              <p>{">"} AUTHORIZATION LEVEL: CLASSIFIED</p>
            </div> */}

            <div className="bg-gray-900/50 border border-green-500/20 rounded p-6 my-6">
              <div className="text-center mb-4">
                <h3 className="text-xl text-red-400 font-bold tracking-wider mb-2">
                  ENCRYPTED MESSAGE
                </h3>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mb-4" />
              </div>

              <div className="bg-black/60 border border-red-500/30 rounded p-4 text-center">
                <p className="text-red-300 text-lg tracking-widest font-bold mb-2 wrap-break-word">
                  {"9EEADi^^A2DE63:?]4@>^ud+8:sG%"}
                </p>
                {/* <p className="text-gray-500 text-sm">
                  [HINT: Caesar cipher, shift by 3]
                </p> */}
              </div>

              <div className="mt-4 text-center">
                <p className="text-blue-300 text-sm">
                  The first team to solve this puzzle gets direct entry to the
                  Red & Blue CTF
                </p>
              </div>
            </div>

            {/* Input Section */}
            {/* <div className="space-y-4">
              <div>
                <Label
                  htmlFor="decodeInput"
                  className="text-green-400 font-mono tracking-wider"
                >
                  ENTER DECODED MESSAGE:
                </Label>
                <Input
                  id="decodeInput"
                  className="bg-gray-900 border-green-500/30 text-green-400 font-mono tracking-wider mt-2"
                  placeholder="Type your decoded message here..."
                />
              </div>

              <Button className="w-full bg-green-600/20 hover:bg-green-600/40 text-green-400 border border-green-500/50 font-mono tracking-wider py-3 transition-all duration-300">
                <Lock className="w-4 h-4 mr-2" />
                SUBMIT DECRYPTION
              </Button>
            </div> */}

            <div className="text-green-400 text-xs mt-6 pt-4 border-t border-green-500/20">
              <p>{">"} WARNING: Unauthorized access attempts will be logged</p>
              <p>{">"} Security protocol: NEMESIS-7 active</p>
              <p>{">"} Connection secured via Umbrella VPN</p>
            </div>
          </div>

          <div className="absolute top-4 right-4 text-green-400 text-xs opacity-50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>SECURE CONNECTION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Puzzle;
