import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Users, Zap } from "lucide-react";

const Team: React.FC = () => {
  // const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  return (
    <section className="relative py-20 px-4" data-aos="fade-up">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono text-center mb-12 text-white uppercase">
          HOW IT <span className="text-red-400">WORKS</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Red Team */}
          <Card
            className={`bg-red-950/20 border-red-500/30 hover:border-red-400 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-radial from-red-600/10 from-10% to-transparent`}
            // onClick={() =>
            //   setSelectedTeam(selectedTeam === "red" ? null : "red")
            // }
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-mono text-red-400">
                RED TEAM
              </CardTitle>
              <CardDescription className="text-red-300">
                SPECIAL TACTICS & RESCUE
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-gray-300">
                <h4 className="font-mono text-red-400 mb-2">
                  MISSION OBJECTIVE:
                </h4>
                <p className="text-sm">
                  Infiltrate Umbrella facility, destroy T-Virus research, and
                  neutralize Red Team forces. Expose the truth.
                </p>
              </div>
              <div className="text-gray-300">
                <h4 className="font-mono text-red-400 mb-2">EQUIPMENT:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-red-500 text-red-300"
                  >
                    Linux
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-red-500 text-red-300"
                  >
                    God's Grace
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-red-500 text-red-300"
                  >
                    Luck
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blue Team */}
          <Card
            className={`bg-blue-950/20 border-blue-500/30 hover:border-blue-400 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-radial from-blue-600/10 from-10% to-transparent perspective-distant transform-3d`}
            // onClick={() =>
            //   setSelectedTeam(selectedTeam === "blue" ? null : "blue")
            // }
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-mono text-blue-400">
                BLUE TEAM
              </CardTitle>
              <CardDescription className="text-blue-300">
                UMBRELLA SECURITY SERVICE
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-gray-300">
                <h4 className="font-mono text-blue-400 mb-2">
                  MISSION OBJECTIVE:
                </h4>
                <p className="text-sm">
                  The OC (Organising Commitee) will be playing the part of the  blue team. Everything will be deployed on real devices — you’ll be fighting against both the Blue Team and rival Red Teams in the same live environment.
                </p>
                <p className="text-sm pt-4 font-mono">
                  <strong className="text-blue-400">NOTE:</strong> Registrations
                  are not open for the blue team!
                </p>
              </div>
              <div className="text-gray-300">
                <h4 className="font-mono text-blue-400 mb-2">EQUIPMENT:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-blue-500 text-blue-300"
                  >
                    We won't need any
                  </Badge>
                  {/* <Badge
                    variant="outline"
                    className="border-blue-500 text-blue-300"
                  >
                    netcat
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-blue-500 text-blue-300"
                  >
                    Another tool
                  </Badge> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Team;
