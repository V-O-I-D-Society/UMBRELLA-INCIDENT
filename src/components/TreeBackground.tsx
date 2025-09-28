import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Branch {
  id: number;
  side: -1 | 1;  // Left or right
  topPos: number;
  width: number;
  length: number;
  angle: number;
  delay: number;
}

const TreeBackground: React.FC = () => {
  const treeRef = useRef<HTMLDivElement>(null);
  
  // Generate random branches
  const branches: Branch[] = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    side: i % 2 === 0 ? -1 : 1,
    topPos: 80 + (i * 140),
    width: 60 + Math.floor(Math.random() * 100),
    length: 40 + Math.floor(Math.random() * 60),
    angle: Math.floor(Math.random() * 20) - 10,
    delay: i * 0.1
  }));
  
  // Subtle animation effect for branches
  useEffect(() => {
    if (!treeRef.current) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const branches = treeRef.current?.querySelectorAll('.tree-branch');
      
      branches?.forEach((branch, i) => {
        const movement = scrollY * 0.1 * (i % 2 === 0 ? 0.2 : -0.2);
        (branch as HTMLElement).style.transform = `translateY(${movement}px) rotate(${movement / 10}deg)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Generate a wavy path for branches
  const generateWavyPath = (branch: Branch) => {
    const { side, width, length } = branch;
    const controlPoint1X = side === -1 ? width * 0.7 : width * 0.3;
    const controlPoint2X = side === -1 ? width * 0.3 : width * 0.7;
    
    return `M${side === -1 ? 0 : width},0 C${controlPoint1X},${length*0.3} ${controlPoint2X},${length*0.6} ${width/2},${length}`;
  };
  
  // Generate a curve for the sub-branches
  const generateSubBranch = (branch: Branch, subIndex: number) => {
    const { side, width, length } = branch;
    const startX = width/2;
    const startY = length * (0.5 + subIndex * 0.25);
    const endX = startX + (side * (width/3) * (subIndex === 0 ? 1 : 0.7));
    const endY = startY + (length/4);
    
    const controlPointX = startX + (endX - startX) * 0.5;
    const controlPointY = startY + (endY - startY) * 0.3;
    
    return `M${startX},${startY} Q${controlPointX},${controlPointY} ${endX},${endY}`;
  };
  
  return (
    <div ref={treeRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Glowing backdrop element */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 to-transparent opacity-30" />
      
      {/* Main trunk with glow effect */}
      <motion.div 
        className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2"
        initial={{ height: 0 }}
        animate={{ height: '100%' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="w-1 h-full bg-white/20" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }} />
        
        {/* Pulsing energy effect */}
        <motion.div 
          className="absolute w-3 h-20 bg-gradient-to-b from-blue-300/50 via-white/30 to-transparent rounded-full"
          style={{ left: '-1px' }}
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatType: "loop" 
          }}
        />
      </motion.div>
      
      {/* Root system at bottom with animation */}
      <motion.svg 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        width="500" 
        height="200" 
        viewBox="0 0 500 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Main roots */}
        <motion.path 
          d="M250 0 L250 40 M250 40 C170 40, 100 90, 50 180 M250 40 C330 40, 400 90, 450 180 M250 40 C220 40, 150 100, 120 180 M250 40 C280 40, 350 100, 380 180"
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="2" 
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.2 }}
        />
        
        {/* Additional decorative roots */}
        <motion.path 
          d="M250 40 C210 60, 180 130, 170 180 M250 40 C290 60, 320 130, 330 180 M250 40 C240 50, 210 120, 200 180 M250 40 C260 50, 290 120, 300 180"
          stroke="rgba(255,255,255,0.15)" 
          strokeWidth="1.5" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.4 }}
        />
        
        {/* Small glowing dots at root ends */}
        {[50, 120, 170, 200, 250, 300, 330, 380, 450].map((x, i) => (
          <motion.circle 
            key={i}
            cx={x} 
            cy={180} 
            r={i % 2 === 0 ? 3 : 2}
            fill="rgba(255,255,255,0.5)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 + (i * 0.1) }}
            style={{ filter: 'url(#glow)' }}
          />
        ))}
      </motion.svg>
      
      {/* Branches */}
      {branches.map((branch) => (
        <motion.div
          key={branch.id}
          className="absolute tree-branch"
          style={{
            top: `${branch.topPos}px`,
            left: '50%',
            width: branch.width,
            height: branch.length,
            transformOrigin: branch.side === -1 ? 'right top' : 'left top',
            transform: `translateX(${branch.side === -1 ? '-100%' : '0'}) rotate(${branch.side * branch.angle}deg)`,
          }}
          initial={{ opacity: 0, x: branch.side * 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: branch.delay + 0.3 }}
        >
          {/* Main branch */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox={`0 0 ${branch.width} ${branch.length}`}
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id={`branchGradient-${branch.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </linearGradient>
            </defs>
            
            {/* Main branch path */}
            <motion.path 
              d={generateWavyPath(branch)}
              stroke={`url(#branchGradient-${branch.id})`}
              strokeWidth="2" 
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: branch.delay + 0.5 }}
            />
            
            {/* Sub branches */}
            {[0, 1].map((i) => (
              <motion.path
                key={i}
                d={generateSubBranch(branch, i)}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: branch.delay + 0.8 + (i * 0.2) }}
              />
            ))}
            
            {/* Node at branch end */}
            <motion.circle 
              cx={branch.width/2} 
              cy={branch.length} 
              r="4"
              fill="rgba(255,255,255,0.15)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: branch.delay + 1 }}
            />
            
            {/* Decorative elements */}
            {[0, 1].map((i) => {
              const subBranch = generateSubBranch(branch, i);
              const endPoint = subBranch.split(' ').pop()?.split(',');
              if (!endPoint) return null;
              
              const [x, y] = endPoint.map(parseFloat);
              
              return (
                <motion.circle
                  key={`deco-${i}`}
                  cx={x}
                  cy={y}
                  r="2.5"
                  fill="rgba(255,255,255,0.1)"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: branch.delay + 1.2 + (i * 0.1) }}
                />
              );
            })}
          </svg>
        </motion.div>
      ))}
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = 1 + Math.random() * 3;
          const duration = 15 + Math.random() * 20;
          const delay = Math.random() * 10;
          const left = 10 + Math.random() * 80;
          const initialTop = 30 + Math.random() * 70;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-white/30"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${initialTop}%`,
                opacity: 0.1 + Math.random() * 0.3
              }}
              animate={{
                y: [0, -100, -200, -300],
                opacity: [0, 0.3, 0.5, 0],
                scale: [1, 1.2, 0.8, 0]
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TreeBackground;