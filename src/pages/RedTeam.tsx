import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { ArrowLeft, Shield, Zap, Target, Search, Code, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RedTeam: React.FC = () => {
  const navigate = useNavigate();

  const redTeamSkills = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Penetration Testing",
      description: "Execute comprehensive security assessments to identify vulnerabilities in systems and networks before malicious actors do."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Exploit Development",
      description: "Create custom exploits and attack vectors to test defense mechanisms and uncover hidden security weaknesses."
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Reconnaissance",
      description: "Gather intelligence on target systems using OSINT techniques and advanced scanning methodologies."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Social Engineering",
      description: "Test human security factors through carefully crafted phishing campaigns and social manipulation techniques."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Post-Exploitation",
      description: "Demonstrate the full impact of security breaches through privilege escalation and lateral movement techniques."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Red Team Operations",
      description: "Conduct realistic attack simulations that mirror advanced persistent threat (APT) tactics and procedures."
    }
  ];

  const redTeamTools = [
    "Metasploit", "Burp Suite", "Nmap", "Wireshark", "Cobalt Strike", 
    "Empire", "Bloodhound", "Mimikatz", "Hydra", "John the Ripper",
    "Aircrack-ng", "Social-Engineer Toolkit", "Custom Scripts"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-800/10" />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-red-500/5 blur-3xl -top-20 -left-20"
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-red-600/10 blur-2xl top-40 right-20"
            animate={{ 
              scale: [1, 1.3, 1], 
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: "reverse",
              delay: 1
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Button
              onClick={() => navigate(-1)}
              className="bg-transparent hover:bg-red-900/20 border border-red-600/30 text-red-400 hover:text-white flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Incident
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-8">
              <motion.div 
                className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/30"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-6xl font-bold text-white">R</span>
              </motion.div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
                RED TEAM
              </span>
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto rounded-full mb-8" />

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join the elite offensive security specialists who think like attackers to strengthen defenses. 
              We find vulnerabilities before malicious actors do, testing and challenging security measures 
              through authorized and ethical hacking techniques.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Core Skills Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Core Expertise Areas</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Master these critical skills to become an effective red team operator
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {redTeamSkills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-red-900/20 to-red-800/5 p-6 rounded-xl border border-red-800/30 hover:border-red-600/50 transition-all duration-300 group"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 10px 30px -10px rgba(239, 68, 68, 0.2)'
              }}
            >
              <div className="text-red-400 mb-4 group-hover:text-red-300 transition-colors">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-red-300">{skill.title}</h3>
              <p className="text-gray-400 leading-relaxed">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tools & Technologies */}
      <div className="bg-gradient-to-r from-red-900/10 to-black py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Arsenal & Tools</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Professional-grade tools used by red team operators worldwide
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {redTeamTools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-red-900/20 border border-red-700/30 px-4 py-2 rounded-full text-red-300 hover:bg-red-800/30 hover:border-red-600/50 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                {tool}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Career Path */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Your Journey Begins</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The path to becoming a red team professional
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {[
              {
                phase: "Foundation",
                title: "Security Fundamentals",
                description: "Learn networking, operating systems, and basic security concepts",
                color: "from-red-600 to-red-700"
              },
              {
                phase: "Development",
                title: "Offensive Skills",
                description: "Master penetration testing, vulnerability assessment, and exploit development",
                color: "from-red-500 to-red-600"
              },
              {
                phase: "Specialization",
                title: "Advanced Techniques",
                description: "Focus on red team operations, social engineering, and advanced persistent threats",
                color: "from-red-400 to-red-500"
              },
              {
                phase: "Mastery",
                title: "Team Leadership",
                description: "Lead red team engagements and mentor junior security professionals",
                color: "from-red-300 to-red-400"
              }
            ].map((step, index) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-center gap-6"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-300 mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-red-900/20 to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Join the Red Team?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Take the first step toward becoming an elite offensive security professional. 
              Learn to think like an attacker and strengthen the world's defenses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg shadow-lg"
                size="lg"
              >
                Start Your Journey
              </Button>
              <Button 
                onClick={() => navigate(-1)}
                className="bg-transparent border-2 border-red-600 text-red-400 hover:bg-red-900/20 px-8 py-3 text-lg"
                size="lg"
              >
                Back to Teams
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RedTeam;