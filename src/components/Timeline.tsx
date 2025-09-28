import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { X, ChevronRight, AlertTriangle, Shield, Zap, Lock, Calendar, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';

// Timeline event data structure
export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  position: 'left' | 'right';
  date: string;
  icon?: string; // Path to icon image
  detailImage?: string; // Optional image for popup
  color: string; // Color theme for this event
  type?: 'breach' | 'defense' | 'attack' | 'encrypted'; // Optional event type for icon selection
  importance?: number; // Optional importance level (1-5)
}

// Main Timeline component props
interface TimelineProps {
  events: TimelineEvent[];
}

// Helper function to get icon based on event type
const getEventIcon = (event: TimelineEvent) => {
  if (event.icon) return null; // Use custom icon if provided
  
  switch(event.type) {
    case 'breach':
      return <AlertTriangle className="w-4 h-4" style={{ color: event.color }} />;
    case 'defense':
      return <Shield className="w-4 h-4" style={{ color: event.color }} />;
    case 'attack':
      return <Zap className="w-4 h-4" style={{ color: event.color }} />;
    case 'encrypted':
      return <Lock className="w-4 h-4" style={{ color: event.color }} />;
    default:
      return <InfoIcon className="w-4 h-4" style={{ color: event.color }} />;
  }
};

// Branch SVG path generator for connecting lines
const generateBranchPath = (position: 'left' | 'right', length: number = 100): string => {
  const direction = position === 'left' ? -1 : 1;
  const curveStrength = Math.floor(Math.random() * 20) + 30; // Random curve between 30-50
  
  return `M0,0 C${curveStrength * direction},${length/3} ${curveStrength * direction},${2*length/3} 0,${length}`;
};

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const controls = useAnimation();
  
  // Generate branch paths for each event
  const branchPaths = useMemo(() => {
    return events.map(event => ({
      id: event.id,
      path: generateBranchPath(event.position, 100 + (event.importance || 1) * 20),
      position: event.position
    }));
  }, [events]);

  // Open popup with event details
  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setActiveEventId(event.id);
  };

  // Close the popup
  const handleClosePopup = () => {
    setSelectedEvent(null);
    setTimeout(() => setActiveEventId(null), 300);
  };

  // Initialize animation for scroll reveal
  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" }
    }));
  }, [controls]);

  return (
    <div className="relative py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Tree trunk (vertical line) with glow effect */}
      <motion.div 
        className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/30 transform -translate-x-1/2"
        initial={{ height: 0 }}
        animate={{ height: '100%' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}
      />
      
      {/* Animated root node at top */}
      <motion.div 
        className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full z-10"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1], boxShadow: ['0 0 0 rgba(255, 255, 255, 0)', '0 0 30px rgba(255, 255, 255, 0.8)', '0 0 20px rgba(255, 255, 255, 0.4)'] }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      
      {/* Branch patterns - using SVG for better control */}
      {branchPaths.map((branch, index) => (
        <div 
          key={branch.id}
          className="absolute left-1/2 h-32"
          style={{ 
            top: `${160 + (index * 240)}px`,
            transform: `translate(${branch.position === 'left' ? '-100%' : '0%'}, -50%)`,
            width: '50%',
          }}
        >
          <motion.svg
            width="100%" 
            height="100%" 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: index * 0.15 + 0.5 }}
            style={{ overflow: 'visible' }}
          >
            <motion.path
              d={branch.path}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              style={{ 
                filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))', 
                transformOrigin: 'center left', 
                transform: branch.position === 'right' ? 'translateX(1px)' : 'translateX(-1px) scaleX(-1)'
              }}
            />
          </motion.svg>
        </div>
      ))}

      {/* Timeline events */}
      <div className="relative z-10 mt-16">
        {events.map((event) => {
          // Use react-intersection-observer hook for each event
          const [ref, inView] = useInView({
            threshold: 0.2,
            triggerOnce: true
          });
          
          const isActive = event.id === activeEventId;
          
          return (
            <motion.div
              key={event.id}
              ref={ref}
              className={`flex items-center mb-48 ${event.position === 'left' ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className={`relative flex ${event.position === 'left' ? 'mr-auto' : 'ml-auto'} w-5/12`}>
                {/* Event node/bubble with animation */}
                <motion.div 
                  className={`absolute top-0 ${event.position === 'left' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer z-10 border-2`}
                  style={{ 
                    backgroundColor: `${event.color}20`,
                    borderColor: event.color,
                    boxShadow: isActive 
                      ? `0 0 30px ${event.color}80, inset 0 0 15px ${event.color}60` 
                      : `0 0 15px ${event.color}40` 
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    boxShadow: `0 0 25px ${event.color}70, inset 0 0 10px ${event.color}40` 
                  }}
                  animate={isActive ? { 
                    scale: [1, 1.4, 1.2],
                    boxShadow: [
                      `0 0 15px ${event.color}40`, 
                      `0 0 40px ${event.color}90, inset 0 0 20px ${event.color}70`,
                      `0 0 30px ${event.color}80, inset 0 0 15px ${event.color}60`
                    ]
                  } : {}}
                  transition={{ duration: 0.5 }}
                  onClick={() => handleEventClick(event)}
                >
                  {event.icon ? (
                    <img src={event.icon} alt="" className="w-6 h-6" />
                  ) : (
                    getEventIcon(event)
                  )}

                  {/* Pulsing animation for active event */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{ 
                        scale: [1, 1.6, 1], 
                        opacity: [0.7, 0, 0.7] 
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                      style={{ 
                        border: `2px solid ${event.color}`,
                        backgroundColor: 'transparent'
                      }}
                    />
                  )}
                </motion.div>

                {/* Date bubble */}
                <motion.div
                  className={`absolute ${event.position === 'left' ? 'right-14' : 'left-14'}  top-0 z-10 -translate-y-1/2 bg-gray-900/80 px-3 py-1 rounded-full border border-gray-700 flex items-center gap-1`}
                  initial={{ opacity: 0, x: event.position === 'left' ? 20 : -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <p className="text-xs font-mono text-gray-300">{event.date}</p>
                </motion.div>

                {/* Event card with enhanced hover effects */}
                <motion.div 
                  className={`${event.position === 'left' ? 'text-right pr-20' : 'text-left pl-20'} py-6 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800/50 px-6`}
                  style={{ 
                    boxShadow: isActive 
                      ? `0 10px 30px -10px ${event.color}30, 0 0 0 1px ${event.color}30` 
                      : '0 10px 30px -15px rgba(0, 0, 0, 0.5)' 
                  }}
                  whileHover={{ 
                    y: -8,
                    boxShadow: `0 20px 40px -12px ${event.color}40, 0 0 0 1px ${event.color}40`,
                    backgroundColor: `rgba(30, 30, 30, 0.7)`
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 
                    className="text-xl font-bold mb-2" 
                    style={{ 
                      color: event.color,
                      textShadow: `0 0 8px ${event.color}40` 
                    }}
                  >
                    {event.title}
                  </h3>
                  
                  <p className="text-sm text-gray-300 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <motion.div 
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`group ${event.position === 'left' ? 'ml-auto' : ''} border-gray-700 hover:border-gray-500`}
                      onClick={() => handleEventClick(event)}
                    >
                      <span style={{ color: event.color }}>View Details</span>
                      <ChevronRight 
                        className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" 
                        style={{ color: event.color }} 
                      />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Enhanced popup for event details */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClosePopup}
          >
            <motion.div 
              className="bg-gray-900 border rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ 
                boxShadow: `0 0 50px ${selectedEvent.color}30`,
                borderColor: `${selectedEvent.color}40`,
              }}
            >
              <div className="relative p-8">
                {/* Close button with animation */}
                <motion.button 
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-gray-800/80 hover:bg-gray-700 z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClosePopup}
                >
                  <X size={16} />
                </motion.button>
                
                {/* Event icon */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ 
                    backgroundColor: `${selectedEvent.color}20`,
                    boxShadow: `0 0 15px ${selectedEvent.color}40` 
                  }}
                >
                  {selectedEvent.icon ? (
                    <img src={selectedEvent.icon} alt="" className="w-6 h-6" />
                  ) : (
                    getEventIcon(selectedEvent)
                  )}
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                  <h2 
                    className="text-3xl font-bold" 
                    style={{ 
                      color: selectedEvent.color,
                      textShadow: `0 0 10px ${selectedEvent.color}40` 
                    }}
                  >
                    {selectedEvent.title}
                  </h2>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-sm font-mono text-gray-400">{selectedEvent.date}</p>
                </div>
                
                {/* Image with animated entry */}
                {selectedEvent.detailImage && (
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <img 
                      src={selectedEvent.detailImage} 
                      alt={selectedEvent.title} 
                      className="w-full rounded-lg object-cover h-64 border border-gray-800"
                      style={{ boxShadow: `0 10px 30px -5px ${selectedEvent.color}20` }}
                    />
                  </motion.div>
                )}
                
                {/* Description text with animated entry */}
                <motion.div 
                  className="prose prose-lg max-w-none prose-invert"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-gray-300 leading-relaxed">{selectedEvent.description}</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;