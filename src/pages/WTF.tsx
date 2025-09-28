import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/components/Hero.css'; // Reusing the CSS from Hero
import { Button } from '@/components/ui/button';
import Timeline from '@/components/Timeline';
import TreeBackground from '@/components/TreeBackground';
import { ArrowDown } from 'lucide-react';
import animationVideo from '@/assets/animation-video.mp4'; // Import the video

// Import the TimelineEvent type from the Timeline component
import type { TimelineEvent } from '@/components/Timeline';

// Define timeline events with proper typing
const timelineEvents: TimelineEvent[] = [
  {
    id: "event-1",
    title: "Initial Breach Detected",
    description: "Umbrella Corp's security team detects unusual network traffic originating from Research Lab 7. Several systems are showing signs of compromise with encrypted data being exfiltrated to an unknown external server. Preliminary investigation suggests this was a targeted attack exploiting a previously unknown vulnerability in their perimeter security systems.",
    position: "left",
    date: "09:15 - Day 1",
    color: "#ff4040",
    type: "breach",
    importance: 4,
    detailImage: "/images/breach.svg" // Placeholder image
  },
  {
    id: "event-2",
    title: "T-Virus Containment Failure",
    description: "Security protocols were bypassed when an insider threat compromised the biohazard containment systems. Samples of the experimental T-Virus were accessed without authorization, triggering an automatic lockdown. Security footage reveals the perpetrator used stolen credentials from a senior researcher to gain physical access to the restricted area.",
    position: "right",
    date: "14:32 - Day 1",
    color: "#ff9040",
    type: "breach",
    importance: 5,
    detailImage: "/images/containment.svg"
  },
  {
    id: "event-3",
    title: "RED Team Activated",
    description: "Umbrella's RED Team has been activated to hunt for the attackers still present in the network. The team begins offensive operations to locate and isolate remaining threat actors within compromised systems. They deploy advanced threat hunting tools and begin scanning for indicators of compromise throughout the entire corporate infrastructure.",
    position: "left",
    date: "18:45 - Day 1",
    color: "#ff4040",
    type: "attack",
    importance: 3,
    detailImage: "/images/red-team.svg"
  },
  {
    id: "event-4",
    title: "BLUE Team Response",
    description: "The BLUE Team establishes a command center to coordinate containment and recovery efforts. Their first priority is securing critical research data and ensuring continuity of essential operations. They implement temporary security controls while developing a comprehensive incident response strategy that addresses both the cyber intrusion and physical security breach.",
    position: "right",
    date: "20:10 - Day 1",
    color: "#4070ff",
    type: "defense",
    importance: 3,
    detailImage: "/images/blue-team.svg"
  },
  {
    id: "event-5",
    title: "Hidden Backdoor Discovered",
    description: "RED Team discovers a sophisticated backdoor allowing persistent access to Umbrella's core systems. The backdoor appears to have been installed months ago, suggesting this was a long-term operation. Analysis of the backdoor code reveals custom malware specifically designed to evade Umbrella's security solutions, indicating the attackers had intimate knowledge of their defense architecture.",
    position: "left",
    date: "04:22 - Day 2",
    color: "#ff4040",
    type: "breach",
    importance: 4,
    detailImage: "/images/backdoor.svg"
  },
  {
    id: "event-6",
    title: "Defensive Perimeter Established",
    description: "BLUE Team implements network segregation and enhanced monitoring. All non-essential connections to external networks are severed as the team works to establish a secure perimeter. Critical systems are migrated to an isolated environment with additional authentication requirements and continuous monitoring to prevent further unauthorized access.",
    position: "right",
    date: "07:40 - Day 2",
    color: "#4070ff",
    type: "defense",
    importance: 3,
    detailImage: "/images/perimeter.svg"
  },
  {
    id: "event-7",
    title: "Adversary Attribution",
    description: "Intelligence analysis points to the involvement of a rival biotech corporation with possible state-sponsored backing. The sophistication of the attack suggests a well-funded operation with specific intelligence objectives. Digital forensics uncover fragments of code and operational patterns matching those used in previous corporate espionage campaigns against other pharmaceutical research companies.",
    position: "left",
    date: "13:15 - Day 2",
    color: "#ff4040",
    type: "attack",
    importance: 2,
    detailImage: "/images/attribution.svg"
  },
  {
    id: "event-8",
    title: "Incident Contained",
    description: "After 36 hours of continuous operations, the security breach is contained. BLUE Team confirms that all unauthorized access has been removed, but the full extent of data exfiltration remains unknown. Post-incident analysis begins to determine what information was compromised and implement long-term security improvements to prevent similar attacks in the future.",
    position: "right",
    date: "21:30 - Day 2",
    color: "#4070ff",
    type: "defense",
    importance: 4,
    detailImage: "/images/contained.svg"
  },
  {
    id: "event-9",
    title: "Encrypted Communications Found",
    description: "RED Team discovers encrypted communications between internal compromised systems and external command and control servers. The encryption uses advanced algorithms making it nearly impossible to determine what data was exfiltrated. The team isolates samples of the encrypted traffic for further analysis by their cryptography specialists.",
    position: "left",
    date: "10:05 - Day 3",
    color: "#ff4040",
    type: "encrypted",
    importance: 3,
    detailImage: "/images/encrypted.svg"
  },
  {
    id: "event-10",
    title: "Security Posture Hardened",
    description: "BLUE Team completes implementation of enhanced security measures including new intrusion detection systems, privileged access management, and behavioral analytics to detect anomalous activities. Regular security drills are scheduled to ensure readiness for future incidents, and all personnel undergo mandatory security awareness training.",
    position: "right",
    date: "16:45 - Day 3",
    color: "#4070ff",
    type: "defense",
    importance: 4,
    detailImage: "/images/hardened.svg"
  }
];

const WTF: React.FC = () => {
  // States to manage the sequence
  const [displayText, setDisplayText] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const fullText = "Nothing Ever Goes As Planned";

  // Initial typing animation
  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 120);

    return () => clearInterval(typingInterval);
  }, []);

  // Handle button click to start video
  const handleStartVideo = () => {
    setShowIntro(false); // Hide the intro text and button
    
    // Small delay before showing video for smooth transition
    setTimeout(() => {
      setShowVideo(true);
      
      // Play the video after it's shown
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(err => console.error("Error playing video:", err));
        }
      }, 200);
    }, 500);
  };

  // Handle video end to show main content
  const handleVideoEnded = () => {
    // Fade out video
    setShowVideo(false);
    
    // Show main content after video fade out
    setTimeout(() => {
      setShowContent(true);
    }, 600);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">
      <AnimatePresence>
        {/* Intro Section with Text and Button */}
        {showIntro && (
          <motion.div 
            className="relative z-10 container mx-auto px-4 text-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold text-white glitch-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <span className="relative">
                {displayText}
                <span className="cursor-blink">|</span>
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3 }}
              className="mt-12"
            >
              <Button 
                className="bg-transparent hover:bg-white/10 text-white px-8 py-6 text-xl font-mono transition-all duration-300"
                size="lg"
                onClick={handleStartVideo}
              >
                See What Happened !
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Video Animation Section */}
        {showVideo && (
          <motion.div 
            className="fixed inset-0 z-20 flex items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <video
              ref={videoRef}
              className="max-w-full max-h-full"
              onEnded={handleVideoEnded}
              muted
            >
              <source src={animationVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}

        {/* Main Content Section - shown after video */}
        {showContent && (
          <motion.div 
            className="relative z-10 container mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Hero section with enhanced animations */}
            <div className="text-white mb-32 relative">
              {/* Decorative elements */}
              <motion.div
                className="absolute w-20 h-20 rounded-full bg-red-500/10 blur-2xl -left-5 top-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                transition={{ delay: 0.2, duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div
                className="absolute w-32 h-32 rounded-full bg-blue-500/10 blur-3xl -right-10 top-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: [1, 1.3, 1] }}
                transition={{ delay: 0.5, duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white to-blue-500">
                  The Umbrella Incident
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl text-center max-w-3xl mx-auto text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Follow the timeline of events as RED and BLUE teams battled during a major security incident 
                at Umbrella Corporation's research facility. Discover how the attack unfolded and how the 
                defenders responded.
              </motion.p>
              
              <motion.div 
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Button
                  className="group bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 py-6 px-8 border border-white/10 rounded-lg shadow-lg"
                  onClick={() => timelineRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="text-lg">View Incident Timeline</span>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowDown className="group-hover:translate-y-1 transition-transform duration-300" size={18} />
                  </motion.div>
                </Button>
              </motion.div>
              
              {/* Quick stats about the incident */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <p className="text-3xl font-bold text-red-400">36h</p>
                  <p className="text-sm text-gray-400">Incident Duration</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <p className="text-3xl font-bold text-blue-400">12</p>
                  <p className="text-sm text-gray-400">Systems Affected</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <p className="text-3xl font-bold text-amber-400">4</p>
                  <p className="text-sm text-gray-400">Attack Vectors</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <p className="text-3xl font-bold text-green-400">100%</p>
                  <p className="text-sm text-gray-400">Recovery Rate</p>
                </div>
              </motion.div>
            </div>
            
            {/* Timeline section with enhanced background */}
            <div className="relative min-h-screen pb-32" ref={timelineRef}>
              <TreeBackground />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="relative"
              >
                <div className="text-center mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white to-blue-500 mb-3">
                      Incident Timeline
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto rounded-full mb-4" />
                    <p className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
                      Explore the detailed timeline of the security breach. Click on events to discover the full story behind each development.
                    </p>
                  </motion.div>
                  
                  {/* Key legend */}
                  <motion.div 
                    className="flex flex-wrap justify-center gap-4 mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-sm text-gray-300">RED Team Events</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-sm text-gray-300">BLUE Team Events</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="text-sm text-gray-300">Critical Incidents</span>
                    </div>
                  </motion.div>
                </div>
                
                <Timeline events={timelineEvents} />
              </motion.div>
            </div>
            
            {/* Team selection section with enhanced UI */}
            <div className="text-white mt-32 pt-20 border-t border-white/10">
              <motion.h2 
                className="text-4xl font-bold mb-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Choose Your Side
              </motion.h2>
              
              <motion.p 
                className="text-center text-gray-400 max-w-3xl mx-auto mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                In the world of cybersecurity, there are two primary teams working to secure organizations.
                Which role would you take in this ongoing battle between attackers and defenders?
              </motion.p>
              
              <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
                <motion.div
                  className="bg-gradient-to-br from-red-900/30 to-red-800/5 p-8 rounded-xl border border-red-800/30 flex flex-col items-center text-center shadow-xl shadow-red-900/10"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: '0 20px 40px -20px rgba(185, 28, 28, 0.3)',
                    backgroundColor: 'rgba(127, 29, 29, 0.2)'
                  }}
                >
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-600/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-4xl font-bold text-white">R</span>
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold mb-3 text-red-400">RED TEAM</h3>
                  
                  <div className="w-16 h-1 bg-red-600/50 rounded-full mb-6" />
                  
                  <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                    Join the offensive security experts. Find vulnerabilities, exploit weaknesses,
                    and test system defenses before the real attackers do.
                  </p>
                  
                  <ul className="text-left text-gray-400 mb-8 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>Perform advanced penetration testing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>Execute simulated cyberattacks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>Discover unknown vulnerabilities</span>
                    </li>
                  </ul>
                  
                  <Button className="bg-red-600 hover:bg-red-700 mt-auto text-white border-red-700 px-8 py-6 text-lg shadow-lg shadow-red-900/20 w-full">
                    Join Red Team
                  </Button>
                </motion.div>
                
                <motion.div
                  className="bg-gradient-to-br from-blue-900/30 to-blue-800/5 p-8 rounded-xl border border-blue-800/30 flex flex-col items-center text-center shadow-xl shadow-blue-900/10"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: '0 20px 40px -20px rgba(30, 64, 175, 0.3)', 
                    backgroundColor: 'rgba(30, 58, 138, 0.2)'
                  }}
                >
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <span className="text-4xl font-bold text-white">B</span>
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold mb-3 text-blue-400">BLUE TEAM</h3>
                  
                  <div className="w-16 h-1 bg-blue-600/50 rounded-full mb-6" />
                  
                  <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                    Join the defensive security professionals. Protect systems, detect threats,
                    and respond to incidents to keep the organization secure.
                  </p>
                  
                  <ul className="text-left text-gray-400 mb-8 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>Build robust defense strategies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>Monitor for suspicious activities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>Respond to and mitigate threats</span>
                    </li>
                  </ul>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700 mt-auto text-white border-blue-700 px-8 py-6 text-lg shadow-lg shadow-blue-900/20 w-full">
                    Join Blue Team
                  </Button>
                </motion.div>
              </div>
            </div>
            
            {/* Closing call to action */}
            <motion.div 
              className="text-center my-32 pt-12 relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-30 z-0" />
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-4">Are You Ready?</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                  The battle between security professionals and threat actors continues every day.
                  Experience the thrill of cyber warfare in our upcoming event.
                </p>
                <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white px-8 py-6 text-xl shadow-lg">
                  Register Now
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WTF;