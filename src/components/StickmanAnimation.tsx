import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface StickmanAnimationProps {
  onAnimationComplete: () => void;
}

const StickmanAnimation: React.FC<StickmanAnimationProps> = ({ onAnimationComplete }) => {
  const [animationStep, setAnimationStep] = useState(0);
  const [stickmanX, setStickmanX] = useState(800); // Start from right
  const [stickmanY, setStickmanY] = useState(300); // Middle of screen
  const [showText, setShowText] = useState(false);
  const [showDust, setShowDust] = useState(false);
  const [eyesBlink, setEyesBlink] = useState(false);
  const [textPosition, setTextPosition] = useState(-100);
  const [textOpacity, setTextOpacity] = useState(0);
  const [walkCycle, setWalkCycle] = useState(0); // 0 to 100 for smooth walk cycles
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  
  // Animation loop for smooth 120fps animations
  useEffect(() => {
    let walkSpeed = 100; // pixels per second
    let animationActive = true;
    
    const animationLoop = (timestamp: number) => {
      if (!animationActive) return;
      
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      // Only update during walking animation (step 0)
      if (animationStep === 0) {
        // Update walk cycle (0-100)
        setWalkCycle(prev => (prev + deltaTime / 8) % 100);
        
        // Move stickman across screen
        setStickmanX(prev => {
          const newPos = prev - (deltaTime * walkSpeed / 1000);
          return newPos < 500 ? 500 : newPos;
        });
      }
      
      animationFrameRef.current = requestAnimationFrame(animationLoop);
    };
    
    animationFrameRef.current = requestAnimationFrame(animationLoop);
    
    // Step 0: Walking (3s)
    const walkTimer = setTimeout(() => {
      setAnimationStep(1); // Idle + blink
      setStickmanX(500); // Centered
      animationActive = false;
    }, 3000);
    
    // Step 1: Idle (0.5s) - scheduled after walking
    const idleTimer = setTimeout(() => {
      setEyesBlink(true);
      setTimeout(() => setEyesBlink(false), 150);
      
      setTimeout(() => {
        setAnimationStep(2); // Crouch
      }, 500);
    }, 3000);
    
    // Step 2: Jump (1.5s) - scheduled after idle
    const jumpTimer = setTimeout(() => {
      setStickmanY(150); // Jump up
      setAnimationStep(3); // Jump
      
      // Step 3: Pull text (1.5s) - scheduled during jump
      setTimeout(() => {
        setShowText(true);
        setTextPosition(100);
        setTextOpacity(1);
        
        // Step 4: Land (1s) - after pulling text
        setTimeout(() => {
          setStickmanY(300); // Back down
          setAnimationStep(4); // Landing
          setShowDust(true);
          
          setTimeout(() => {
            setShowDust(false);
            setAnimationStep(5); // Final pose
            
            // Complete animation
            setTimeout(() => {
              if (onAnimationComplete) onAnimationComplete();
            }, 500);
          }, 300);
        }, 1500);
      }, 700);
    }, 4000);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(walkTimer);
      clearTimeout(idleTimer);
      clearTimeout(jumpTimer);
    };
  }, [onAnimationComplete]);
  
  // Random jitter for line wobble effect
  const jitter = useCallback(() => Math.random() * 1.5 - 0.75, []);

  // Calculate walking animation poses based on walkCycle (0-100)
  // These functions create smoother transitions between walk frames
  const getWalkLegPosition = useCallback((side: 'left' | 'right') => {
    if (animationStep !== 0) {
      return side === 'left' 
        ? { x: stickmanX - (animationStep === 2 || animationStep === 3 ? 15 : 20), y: stickmanY + 100 }
        : { x: stickmanX + (animationStep === 2 || animationStep === 3 ? 15 : 20), y: stickmanY + 100 };
    }
    
    // Advanced walking cycle with 8 key poses
    const cycle = walkCycle;
    const isLeft = side === 'left';
    const phaseShift = isLeft ? 0 : 50; // opposite legs
    const adjustedCycle = (cycle + phaseShift) % 100;
    
    // Leg forward/backward motion
    let xOffset = 0;
    let yOffset = 0;
    
    if (adjustedCycle < 12.5) {
      // Lifting leg
      const progress = adjustedCycle / 12.5;
      xOffset = 15 * progress;
      yOffset = -15 * progress;
    } else if (adjustedCycle < 25) {
      // Forward swing
      const progress = (adjustedCycle - 12.5) / 12.5;
      xOffset = 15 + 10 * progress;
      yOffset = -15 + 5 * progress;
    } else if (adjustedCycle < 37.5) {
      // Forward extension
      const progress = (adjustedCycle - 25) / 12.5;
      xOffset = 25;
      yOffset = -10 + 10 * progress;
    } else if (adjustedCycle < 50) {
      // Plant foot
      const progress = (adjustedCycle - 37.5) / 12.5;
      xOffset = 25 - 10 * progress;
      yOffset = 0;
    } else if (adjustedCycle < 62.5) {
      // Push off
      const progress = (adjustedCycle - 50) / 12.5;
      xOffset = 15 - 15 * progress;
      yOffset = 0;
    } else if (adjustedCycle < 75) {
      // Backward extension
      const progress = (adjustedCycle - 62.5) / 12.5;
      xOffset = 0 - 10 * progress;
      yOffset = 0;
    } else if (adjustedCycle < 87.5) {
      // Backward lift
      const progress = (adjustedCycle - 75) / 12.5;
      xOffset = -10 + 5 * progress;
      yOffset = -5 * progress;
    } else {
      // Return to neutral
      const progress = (adjustedCycle - 87.5) / 12.5;
      xOffset = -5 + 5 * progress;
      yOffset = -5 + 5 * progress;
    }
    
    return {
      x: stickmanX + (isLeft ? -20 - xOffset : 20 + xOffset),
      y: stickmanY + 100 + yOffset
    };
  }, [animationStep, stickmanX, stickmanY, walkCycle]);
  
  // Get arm positions based on animation step and walk cycle
  const getArmPosition = useCallback((side: 'left' | 'right') => {
    const isLeft = side === 'left';
    
    // Different poses based on animation step
    if (animationStep === 2) { // crouch
      return {
        x: stickmanX + (isLeft ? -25 : 25),
        y: stickmanY + 70
      };
    } else if (animationStep === 3) { // jump
      return isLeft 
        ? { x: stickmanX - 15, y: stickmanY + 50 }
        : { x: stickmanX + 10, y: stickmanY - 30 }; // right arm raised
    } else if (animationStep === 4 || animationStep === 5) { // landing/final
      return isLeft
        ? { x: stickmanX - 15, y: stickmanY + 80 }
        : { x: stickmanX + 20, y: stickmanY + 80 };
    }
    
    // Walking arm animations (opposite to legs for natural walk)
    const phaseShift = isLeft ? 50 : 0; // opposite to legs
    const adjustedCycle = (walkCycle + phaseShift) % 100;
    
    let xOffset = 0;
    let yOffset = 0;
    
    if (adjustedCycle < 25) {
      // Forward swing
      const progress = adjustedCycle / 25;
      xOffset = 15 * progress;
      yOffset = -5 * Math.sin(progress * Math.PI);
    } else if (adjustedCycle < 50) {
      // Return to neutral
      const progress = (adjustedCycle - 25) / 25;
      xOffset = 15 - 15 * progress;
      yOffset = -5 * Math.sin((1 - progress) * Math.PI);
    } else if (adjustedCycle < 75) {
      // Backward swing
      const progress = (adjustedCycle - 50) / 25;
      xOffset = -15 * progress;
      yOffset = 5 * Math.sin(progress * Math.PI);
    } else {
      // Return to neutral
      const progress = (adjustedCycle - 75) / 25;
      xOffset = -15 + 15 * progress;
      yOffset = 5 * Math.sin((1 - progress) * Math.PI);
    }
    
    return {
      x: stickmanX + (isLeft ? -30 + xOffset : 30 + xOffset),
      y: stickmanY + 40 + yOffset
    };
  }, [animationStep, stickmanX, stickmanY, walkCycle]);
  
  // Calculate body height based on animation step and walk cycle
  const bodyHeight = 
    animationStep === 2 ? 70 : // crouch
    animationStep === 3 ? 90 : // jump
    animationStep === 0 ? 95 + Math.sin(walkCycle * Math.PI / 50) * 5 : // walking bob
    100; // normal
  
  // Dynamic shadow sizing and position
  const shadowWidth = 
    animationStep === 2 ? 40 : // crouch
    animationStep === 3 ? 20 : // jump
    animationStep === 4 ? 50 : // landing
    animationStep === 0 ? 30 + Math.sin(walkCycle * Math.PI / 50) * 5 : // walking
    30; // normal
  
  // Dust animation for landing
  const dustVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: [0, 0.7, 0], 
      scale: [0, 1, 2], 
      transition: { duration: 0.5 } 
    }
  };
  
  // Text glow effect
  const [glowIntensity, setGlowIntensity] = useState(8);
  
  useEffect(() => {
    if (showText) {
      const glowInterval = setInterval(() => {
        setGlowIntensity(prev => prev === 8 ? 12 : 8);
      }, 1000);
      
      return () => clearInterval(glowInterval);
    }
  }, [showText]);

  // Get leg positions from advanced walking cycle
  const leftLegPos = getWalkLegPosition('left');
  const rightLegPos = getWalkLegPosition('right');
  
  // Get arm positions from advanced walking cycle
  const leftArmPos = getArmPosition('left');
  const rightArmPos = getArmPosition('right');

  return (
    <div className="w-full h-full flex items-center justify-center bg-black overflow-hidden">
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 600"
        animate={{ x: 0 }} // Just to trigger rerender for walking animation
        transition={{ repeat: Infinity, duration: 0.01 }} // 100fps for smoother animation
        className="overflow-visible"
      >
        {/* Walking path line (optional) */}
        {animationStep === 0 && (
          <motion.line
            x1="800"
            y1="400"
            x2="500"
            y2="400"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={2}
            strokeDasharray="5,5"
          />
        )}
        
        {/* Shadow */}
        <motion.ellipse
          cx={stickmanX}
          cy={580}
          rx={shadowWidth}
          ry={10}
          fill="rgba(128, 128, 128, 0.3)"
          animate={{ 
            rx: animationStep === 0 
              ? [shadowWidth, shadowWidth * 0.9, shadowWidth] 
              : shadowWidth,
            opacity: animationStep === 3 ? 0.2 : 0.3 // fade during jump
          }}
          transition={{ repeat: Infinity, duration: 0.6 }}
        />
        
        {/* Stickman figure with slight jitter for hand-drawn effect */}
        
        {/* Legs */}
        <motion.line
          x1={stickmanX + jitter()}
          y1={stickmanY + bodyHeight + jitter()}
          x2={leftLegPos.x + jitter()}
          y2={leftLegPos.y + jitter()}
          stroke="white"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <motion.line
          x1={stickmanX + jitter()}
          y1={stickmanY + bodyHeight + jitter()}
          x2={rightLegPos.x + jitter()}
          y2={rightLegPos.y + jitter()}
          stroke="white"
          strokeWidth={4}
          strokeLinecap="round"
        />
        
        {/* Body - with slight leaning during walk */}
        <motion.line
          x1={stickmanX + jitter()}
          y1={stickmanY + jitter()}
          x2={stickmanX + (animationStep === 0 ? Math.sin(walkCycle * Math.PI / 50) * 3 : 0) + jitter()}
          y2={stickmanY + bodyHeight + jitter()}
          stroke="white"
          strokeWidth={4}
          strokeLinecap="round"
        />
        
        {/* Arms */}
        <motion.line
          x1={stickmanX + jitter()}
          y1={stickmanY + 30 + jitter()}
          x2={leftArmPos.x + jitter()}
          y2={leftArmPos.y + jitter()}
          stroke="white"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <motion.line
          x1={stickmanX + jitter()}
          y1={stickmanY + 30 + jitter()}
          x2={rightArmPos.x + jitter()}
          y2={rightArmPos.y + jitter()}
          stroke="white"
          strokeWidth={4}
          strokeLinecap="round"
        />
        
        {/* Head - with slight tilt during walking */}
        <motion.circle
          cx={stickmanX + (animationStep === 0 ? Math.sin(walkCycle * Math.PI / 50) * 2 : 0) + jitter()}
          cy={stickmanY - 20 + (animationStep === 0 ? Math.sin(walkCycle * Math.PI / 25) * 3 : 0) + jitter()}
          r={30}
          stroke="white"
          strokeWidth={4}
          fill="none"
        />
        
        {/* Eyes - more expressive with animation */}
        {!eyesBlink && (
          <>
            <motion.circle
              cx={stickmanX - 10 + (animationStep === 3 ? 3 : 0)} // look direction changes
              cy={stickmanY - 25 + (animationStep === 2 ? 2 : 0)} // squint when crouching
              r={animationStep === 0 ? 2 + Math.sin(walkCycle * Math.PI / 25) * 0.5 : 2}
              fill="white"
            />
            <motion.circle
              cx={stickmanX + 10 + (animationStep === 3 ? 3 : 0)} // look direction changes
              cy={stickmanY - 25 + (animationStep === 2 ? 2 : 0)} // squint when crouching
              r={animationStep === 0 ? 2 + Math.sin(walkCycle * Math.PI / 25) * 0.5 : 2}
              fill="white"
            />
            
            {/* Mouth - changes with animation */}
            {animationStep === 0 && (
              <motion.path
                d={`M ${stickmanX - 10} ${stickmanY - 5} Q ${stickmanX} ${stickmanY + (walkCycle % 50 < 25 ? 5 : 0)} ${stickmanX + 10} ${stickmanY - 5}`}
                stroke="white"
                strokeWidth={2}
                fill="none"
              />
            )}
            
            {animationStep === 2 && (
              <motion.path
                d={`M ${stickmanX - 10} ${stickmanY} Q ${stickmanX} ${stickmanY + 5} ${stickmanX + 10} ${stickmanY}`}
                stroke="white"
                strokeWidth={2}
                fill="none"
              />
            )}
            
            {animationStep === 3 && (
              <motion.path
                d={`M ${stickmanX - 8} ${stickmanY + 2} Q ${stickmanX} ${stickmanY - 4} ${stickmanX + 8} ${stickmanY + 2}`}
                stroke="white"
                strokeWidth={2}
                fill="none"
              />
            )}
            
            {(animationStep === 4 || animationStep === 5) && (
              <motion.path
                d={`M ${stickmanX - 8} ${stickmanY - 5} Q ${stickmanX} ${stickmanY} ${stickmanX + 8} ${stickmanY - 5}`}
                stroke="white"
                strokeWidth={2}
                fill="none"
              />
            )}
          </>
        )}
        
        {/* Landing dust effect - enhanced with particles */}
        {showDust && (
          <>
            <motion.circle
              cx={stickmanX}
              cy={stickmanY + bodyHeight + 100}
              initial="hidden"
              animate="visible"
              variants={dustVariants}
              fill="rgba(255, 255, 255, 0.3)"
            />
            
            {/* Additional dust particles */}
            <motion.circle
              cx={stickmanX - 20}
              cy={stickmanY + bodyHeight + 95}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0], 
                scale: [0, 1, 1.5], 
                x: [stickmanX - 20, stickmanX - 35]
              }}
              transition={{ duration: 0.7, delay: 0.1 }}
              r={5}
              fill="rgba(255, 255, 255, 0.2)"
            />
            
            <motion.circle
              cx={stickmanX + 20}
              cy={stickmanY + bodyHeight + 95}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0], 
                scale: [0, 1, 1.5], 
                x: [stickmanX + 20, stickmanX + 35]
              }}
              transition={{ duration: 0.7, delay: 0.2 }}
              r={5}
              fill="rgba(255, 255, 255, 0.2)"
            />
          </>
        )}
        
        {/* Text that gets pulled down - with enhanced effects */}
        {showText && (
          <>
            <motion.text
              x="50%"
              y={textPosition}
              textAnchor="middle"
              className="font-mono font-bold text-4xl"
              initial={{ y: -100, opacity: 0 }}
              animate={{ 
                y: 100, 
                opacity: textOpacity,
                filter: `drop-shadow(0 0 ${glowIntensity}px white)` 
              }}
              transition={{ 
                y: { type: "spring", damping: 5, stiffness: 100 },
                opacity: { duration: 0.5 }
              }}
              fill="white"
            >
              DECODE THE MISSION
            </motion.text>
            
            {/* Text glow effect */}
            <motion.text
              x="50%"
              y={textPosition}
              textAnchor="middle"
              className="font-mono font-bold text-4xl"
              initial={{ y: -100, opacity: 0 }}
              animate={{ 
                y: 100, 
                opacity: textOpacity * 0.7,
                filter: `blur(4px) drop-shadow(0 0 ${glowIntensity * 2}px white)` 
              }}
              transition={{ 
                y: { type: "spring", damping: 5, stiffness: 100 },
                opacity: { duration: 0.5 }
              }}
              fill="rgba(255, 255, 255, 0.7)"
            >
              DECODE THE MISSION
            </motion.text>
          </>
        )}
        {/* Add footsteps during walking animation */}
        {animationStep === 0 && (
          <>
            {[...Array(6)].map((_, i) => {
              const stepX = 800 - i * 60;
              // Only show footsteps behind the stickman
              if (stepX > stickmanX - 30) return null;
              
              return (
                <React.Fragment key={i}>
                  <motion.circle
                    cx={stepX}
                    cy={580}
                    r={5}
                    fill="rgba(255, 255, 255, 0.05)"
                    initial={{ opacity: 0.15 }}
                    animate={{ opacity: [0.15, 0.1, 0.05, 0] }}
                    transition={{ duration: 3, delay: i * 0.2 }}
                  />
                </React.Fragment>
              );
            })}
          </>
        )}
        
        {/* Add a grid on the ground for perspective */}
        <motion.g opacity={0.1}>
          {[...Array(10)].map((_, i) => (
            <motion.line
              key={`grid-h-${i}`}
              x1="0"
              y1={500 + i * 10}
              x2="1000"
              y2={500 + i * 10}
              stroke="white"
              strokeWidth={1}
              strokeDasharray={i % 2 === 0 ? "5,5" : "2,8"}
            />
          ))}
          
          {[...Array(20)].map((_, i) => (
            <motion.line
              key={`grid-v-${i}`}
              x1={i * 50}
              y1="500"
              x2={i * 50 - 100}
              y2="600"
              stroke="white"
              strokeWidth={1}
              strokeDasharray="2,8"
            />
          ))}
        </motion.g>
        
        {/* Jumping effects */}
        {animationStep === 3 && (
          <>
            <motion.path
              d={`M ${stickmanX - 30} ${stickmanY + 120} Q ${stickmanX} ${stickmanY + 150} ${stickmanX + 30} ${stickmanY + 120}`}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth={2}
              strokeDasharray="5,5"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d={`M ${stickmanX - 20} ${stickmanY - 70} Q ${stickmanX} ${stickmanY - 90} ${stickmanX + 20} ${stickmanY - 70}`}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth={2}
              strokeDasharray="5,5"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </>
        )}
        
        {/* Background visual elements */}
        <motion.g opacity={0.05}>
          {/* Abstract tech/grid elements */}
          <motion.rect 
            x="100" 
            y="50" 
            width="200" 
            height="100" 
            strokeWidth={2} 
            stroke="white" 
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.circle
            cx="850"
            cy="150"
            r="50"
            strokeWidth={2}
            stroke="white"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default StickmanAnimation;