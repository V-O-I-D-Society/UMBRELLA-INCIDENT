import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { MapPin, Clock } from "lucide-react";

const Schedule: React.FC = () => {
  const scheduleData = [
   {
      date: "8th Jun",
      time: "00:00",
      event: "Phase 1: Online CTF Begins",
      location: "Online",
    },
    {
      date: "8th Jun",
      time: "23:59",
      event: "Phase 1: Online CTF Ends",
      location: "Online"
    },
    {
      date: "10th Jun",
      time: "9:00",
      event: "Leaderboard Finalized for Phase I CTF",
      location: "Online",
    },
    {
      date: "31st Aug",
      time: "00:00",
      event: "Phase 2: Online CTF Begins",
      location: "Online",
    },
    {
      date: "31st Aug",
      time: "23:59",
      event: "Phase 2: Online CTF Ends",
      location: "Online"
    },
    {
      date: "5th Sep",
      time: "9:00",
      event: "Leaderboard Finalized for Phase II CTF",
      location: "Online"
    },
    {
      date: "18th Sep",
      time: "10:00",
      event: "Red & Blue CTF Begins",
      location: "KIET Group of Institutions",
    },
    {
      date: "19th Sep",
      time: "9:00",
      event: "CyberSecureX Conclave",
      location: "KIET Group of Institutions",
    }
  ];

  return (
    <section className="relative py-20 px-4" data-aos="fade-up">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-mono text-center mb-12 text-white">
          MISSION <span className="text-red-400">TIMELINE</span>
        </h2>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 border border-gray-700">
            <TabsTrigger
              value="schedule"
              className="cursor-pointer font-mono text-zinc-200 data-[state=active]:bg-red-500"
            >
              OPERATION SCHEDULE
            </TabsTrigger>
            <TabsTrigger
              value="briefing"
              className="cursor-pointer font-mono text-zinc-200 data-[state=active]:bg-red-500"
            >
              <span className="hidden md:inline">
              TACTICAL BRIEFING (RULES)
              </span>

              <span className="md:hidden">RULES</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="mt-6">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 backdrop-blur-sm">
              <div className="space-y-4">
                {scheduleData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded border border-gray-600"
                  >
                    <div className="flex items-center gap-2 text-red-400 font-mono text-sm min-w-[60px]">
                      <Clock className="w-4 h-4" />
                      <div className="flex flex-col">
                        <span>{item.date}</span>
                        <span className="text-xs text-zinc-400">{item.time}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-mono text-white">{item.event}</h4>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {item.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="briefing" className="mt-6">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 backdrop-blur-sm">
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-xl font-mono text-red-400 mb-3">
                    RULES OF ENGAGEMENT
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Maximum 4 members per team</li>
                    <li>• No attacking infrastructure</li>
                    <li>• No sharing flags between teams</li>
                    <li>• Respect other participants</li>
                    <li>• Have fun and learn!</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-mono text-blue-400 mb-3">
                    VICTORY CONDITIONS
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Be the first to capture the flag</li>
                    <li>• The first team to solve the puzzle below will get direct entry to the Red & Blue CTF</li>
                    {/* <li>• Complete primary objective (team-specific)</li> */}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Schedule;
