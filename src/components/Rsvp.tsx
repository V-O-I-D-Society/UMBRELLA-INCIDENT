import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Lock } from "lucide-react";

const Rsvp: React.FC = () => {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-mono text-center mb-12 text-white">
          PERSONNEL <span className="text-red-400">REGISTRATION</span>
        </h2>

        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 backdrop-blur-sm">
          <div className="mb-6 p-4 bg-red-950/30 border border-red-500/30 rounded">
            <p className="text-red-300 font-mono text-sm text-center">
              ⚠️ AUTHORIZED PERSONNEL ONLY - SECURITY CLEARANCE REQUIRED
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-300 font-mono">
                  FIRST NAME
                </Label>
                <Input
                  id="firstName"
                  className="bg-gray-800 border-gray-600 text-white font-mono"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-300 font-mono">
                  LAST NAME
                </Label>
                <Input
                  id="lastName"
                  className="bg-gray-800 border-gray-600 text-white font-mono"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300 font-mono">
                SECURE EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                className="bg-gray-800 border-gray-600 text-white font-mono"
                placeholder="operative@umbrella.corp"
              />
            </div>

            <div>
              <Label htmlFor="team" className="text-gray-300 font-mono">
                FACTION ASSIGNMENT
              </Label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white font-mono">
                  <SelectValue placeholder="Select your faction" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="red" className="text-red-400 font-mono">
                    RED TEAM - Umbrella Security
                  </SelectItem>
                  <SelectItem value="blue" className="text-blue-400 font-mono">
                    BLUE TEAM - S.T.A.R.S.
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="role" className="text-gray-300 font-mono">
                OPERATIONAL ROLE
              </Label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white font-mono">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="assault" className="font-mono">
                    Assault Specialist
                  </SelectItem>
                  <SelectItem value="medic" className="font-mono">
                    Field Medic
                  </SelectItem>
                  <SelectItem value="sniper" className="font-mono">
                    Marksman
                  </SelectItem>
                  <SelectItem value="engineer" className="font-mono">
                    Tech Specialist
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="emergency" className="text-gray-300 font-mono">
                EMERGENCY CONTACT
              </Label>
              <Input
                id="emergency"
                className="bg-gray-800 border-gray-600 text-white font-mono"
                placeholder="Emergency contact number"
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-gray-300 font-mono">
                ADDITIONAL NOTES
              </Label>
              <Textarea
                id="notes"
                className="bg-gray-800 border-gray-600 text-white font-mono"
                placeholder="Medical conditions, dietary restrictions, etc."
                rows={3}
              />
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-mono py-3 border border-red-500">
              <Lock className="w-4 h-4 mr-2" />
              SUBMIT REGISTRATION
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Rsvp;
