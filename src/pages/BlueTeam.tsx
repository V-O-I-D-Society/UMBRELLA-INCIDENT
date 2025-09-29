import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { ArrowLeft, Shield, Eye, Server, AlertTriangle, Users, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlueTeam: React.FC = () => {
  const navigate = useNavigate();

  const blueTeamSkills = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Defense Strategy",
      description: "Design and implement comprehensive security architectures to protect critical infrastructure and sensitive data."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Threat Monitoring",
      description: "Continuously monitor networks and systems for suspicious activities using advanced SIEM and detection technologies."
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Incident Response",
      description: "Rapidly respond to security incidents with structured methodologies to minimize damage and restore operations."
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "System Hardening",
      description: "Secure systems by implementing proper configurations, patches, and security controls across the infrastructure."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Security Awareness",
      description: "Educate and train users on security best practices to create a human firewall against social engineering attacks."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Compliance & Governance",
      description: "Ensure organizational compliance with security standards and regulatory requirements while maintaining security policies."
    }
  ];

  const blueTeamTools = [
    "Splunk", "ELK Stack", "Wireshark", "Nessus", "OpenVAS", 
    "CrowdStrike", "Carbon Black", "Snort", "Suricata", "OSSEC",
    "Nagios", "Metricbeat", "TheHive", "MISP", "Yara Rules"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-blue-800/10" />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-blue-500/5 blur-3xl -top-20 -right-20"
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
            className="absolute w-64 h-64 rounded-full bg-blue-600/10 blur-2xl top-40 left-20"
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
              className="bg-transparent hover:bg-blue-900/20 border border-blue-600/30 text-blue-400 hover:text-white flex items-center gap-2"
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
                className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/30"
                whileHover={{ scale: 1.05, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-6xl font-bold text-white">B</span>
              </motion.div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                BLUE TEAM
              </span>
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-8" />

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join the dedicated defensive security professionals who protect organizations from cyber threats. 
              We build robust defenses, monitor for attacks, and respond to incidents to keep critical systems 
              and data secure from malicious actors.
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
            Master these essential skills to become an effective blue team defender
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blueTeamSkills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-900/20 to-blue-800/5 p-6 rounded-xl border border-blue-800/30 hover:border-blue-600/50 transition-all duration-300 group"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.2)'
              }}
            >
              <div className="text-blue-400 mb-4 group-hover:text-blue-300 transition-colors">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-300">{skill.title}</h3>
              <p className="text-gray-400 leading-relaxed">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tools & Technologies */}
      <div className="bg-gradient-to-r from-blue-900/10 to-black py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Defense Arsenal</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Professional-grade tools used by blue team defenders worldwide
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {blueTeamTools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-blue-900/20 border border-blue-700/30 px-4 py-2 rounded-full text-blue-300 hover:bg-blue-800/30 hover:border-blue-600/50 transition-all duration-300 cursor-pointer"
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
          <h2 className="text-4xl font-bold mb-4">Your Defense Journey</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The path to becoming a blue team security professional
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {[
              {
                phase: "Foundation",
                title: "Security Fundamentals",
                description: "Learn networking, operating systems, and basic security principles and concepts",
                color: "from-blue-600 to-blue-700"
              },
              {
                phase: "Development",
                title: "Defensive Skills",
                description: "Master monitoring, incident response, vulnerability management, and security analysis",
                color: "from-blue-500 to-blue-600"
              },
              {
                phase: "Specialization",
                title: "Advanced Defense",
                description: "Focus on threat hunting, forensics, and advanced persistent threat (APT) detection",
                color: "from-blue-400 to-blue-500"
              },
              {
                phase: "Mastery",
                title: "Security Leadership",
                description: "Lead blue team operations and develop organizational security strategies",
                color: "from-blue-300 to-blue-400"
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
                  <h3 className="text-xl font-bold text-blue-300 mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Incident Response Framework */}
      <div className="bg-gradient-to-r from-blue-900/10 to-black py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Incident Response Framework</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The structured approach blue teams use to handle security incidents
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Preparation",
                description: "Establish incident response capabilities and procedures",
                color: "from-blue-600 to-blue-700"
              },
              {
                step: "2", 
                title: "Detection & Analysis",
                description: "Identify and analyze security events and incidents",
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "3",
                title: "Containment & Eradication",
                description: "Isolate threats and remove malicious presence",
                color: "from-blue-400 to-blue-500"
              },
              {
                step: "4",
                title: "Recovery & Lessons",
                description: "Restore operations and improve future response",
                color: "from-blue-300 to-blue-400"
              }
            ].map((phase, index) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-900/20 to-blue-800/5 p-6 rounded-xl border border-blue-800/30 text-center"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-white font-bold text-lg mx-auto mb-4`}>
                  {phase.step}
                </div>
                <h3 className="text-lg font-bold text-blue-300 mb-3">{phase.title}</h3>
                <p className="text-gray-400 text-sm">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Join the Blue Team?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Take the first step toward becoming a skilled defensive security professional. 
              Learn to protect and defend the digital world from cyber threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg shadow-lg"
                size="lg"
              >
                Start Your Defense
              </Button>
              <Button 
                onClick={() => navigate(-1)}
                className="bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-900/20 px-8 py-3 text-lg"
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

export default BlueTeam;