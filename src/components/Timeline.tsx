import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Timeline event data structure
export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  position: 'left' | 'right';
  date: string;
  color: string;
  type: string;
  importance: number;
  detailImage?: string;
}

// Main Timeline component props
interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  
  // Toggle event details visibility
  const toggleEventDetails = (event: TimelineEvent) => {
    if (selectedEvent && selectedEvent.id === event.id) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(event);
    }
  };

  return (
    <div className="relative w-full py-10">
      {/* Central line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/5 via-white/10 to-white/5"></div>
      
      {/* Timeline events */}
      <div className="flex flex-col items-center">
        {events.map((event, index) => (
          <div key={event.id} className="w-full mb-12 md:mb-20">
            {/* Mobile view - always centered, simplified layout */}
            <div className="md:hidden flex flex-col items-center relative">
              {/* Date indicator */}
              <div 
                className="px-3 py-1.5 rounded-full text-white text-xs font-semibold mb-3"
                style={{ backgroundColor: `${event.color}30` }}
              >
                {event.date}
              </div>
              
              {/* Event node with icon */}
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-lg"
                style={{ backgroundColor: event.color }}
              >
                {event.type === 'breach' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {event.type === 'defense' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                {event.type === 'attack' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                  </svg>
                )}
                {event.type === 'encrypted' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              {/* Event content - always below the node on mobile */}
              <motion.div 
                className="bg-black/30 backdrop-blur-sm rounded-lg p-4 mt-4 border border-white/5 w-full max-w-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ 
                  boxShadow: `0 4px 20px -5px ${event.color}30`
                }}
              >
                <h3 className="text-xl font-bold mb-2" style={{ color: event.color }}>{event.title}</h3>
                
                {selectedEvent && selectedEvent.id === event.id ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-300">{event.description}</p>
                    
                    {event.detailImage && (
                      <div className="mt-3 flex justify-center">
                        <img 
                          src={event.detailImage} 
                          alt={event.title} 
                          className="w-20 h-20 object-contain opacity-70"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => toggleEventDetails(event)} 
                      variant="ghost" 
                      className="text-xs mt-2 text-gray-400 hover:text-white p-0"
                    >
                      Show Less
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-300 line-clamp-2">{event.description}</p>
                    <Button 
                      onClick={() => toggleEventDetails(event)} 
                      variant="ghost" 
                      className="flex items-center gap-1 text-xs mt-2 text-gray-400 hover:text-white p-0"
                    >
                      View Details <ChevronRight size={12} />
                    </Button>
                  </>
                )}
              </motion.div>
            </div>
            
            {/* Desktop view - alternating left/right layout */}
            <div className="hidden md:block">
              <div className={`flex ${event.position === 'left' ? 'justify-start' : 'justify-end'}`}>
                <div className={`relative ${event.position === 'left' ? 'text-right pr-8' : 'text-left pl-8'} w-1/2`}>
                  {/* Date indicator for desktop */}
                  <div 
                    className={`inline-block px-3 py-1.5 rounded-full text-white text-xs font-semibold mb-3 ${event.position === 'left' ? 'float-right' : 'float-left'}`}
                    style={{ backgroundColor: `${event.color}30` }}
                  >
                    {event.date}
                  </div>
                  
                  <motion.div 
                    className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/5"
                    initial={{ opacity: 0, x: event.position === 'left' ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      boxShadow: `0 4px 20px -5px ${event.color}30`
                    }}
                  >
                    <h3 className="text-xl font-bold mb-2" style={{ color: event.color }}>{event.title}</h3>
                    
                    {selectedEvent && selectedEvent.id === event.id ? (
                      <div className="space-y-4">
                        <p className="text-gray-300">{event.description}</p>
                        
                        {event.detailImage && (
                          <div className="mt-3 flex justify-center">
                            <img 
                              src={event.detailImage} 
                              alt={event.title} 
                              className="w-24 h-24 object-contain opacity-70"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        
                        <Button 
                          onClick={() => toggleEventDetails(event)} 
                          variant="ghost" 
                          className="text-xs text-gray-400 hover:text-white p-0"
                        >
                          Show Less
                        </Button>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-300 line-clamp-2">{event.description}</p>
                        <Button 
                          onClick={() => toggleEventDetails(event)} 
                          variant="ghost" 
                          className="flex items-center gap-1 text-xs mt-2 text-gray-400 hover:text-white p-0"
                        >
                          View Details <ChevronRight size={12} />
                        </Button>
                      </>
                    )}
                  </motion.div>
                  
                  {/* Event node connector for desktop */}
                  <div 
                    className={`absolute top-1/4 ${event.position === 'left' ? '-right-5' : '-left-5'} w-10 h-0.5`}
                    style={{ backgroundColor: event.color }}
                  ></div>
                </div>
              </div>
              
              {/* Desktop timeline node */}
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-lg"
                style={{ 
                  backgroundColor: event.color,
                  top: `${index * 160 + 80}px` // Adjust positioning based on index
                }}
              >
                {event.type === 'breach' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {event.type === 'defense' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                {event.type === 'attack' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                  </svg>
                )}
                {event.type === 'encrypted' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;