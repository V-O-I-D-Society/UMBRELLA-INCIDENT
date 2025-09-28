"use client";

import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className: string;
};

const PerspectiveCard: React.FC<Props> = ({ children, className }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const boundingBoxRef = useRef<DOMRect | null>(null);

  const setBoundingBox = () => {
    if (cardRef.current) {
      boundingBoxRef.current = (
        cardRef.current as HTMLElement
      ).getBoundingClientRect();
    }
  };

  const resetCard = () => {
    boundingBoxRef.current = null;
    const el = cardRef.current;
    if (el) {
      el.style.setProperty("--x-rotation", "0deg");
      el.style.setProperty("--y-rotation", "0deg");
      el.style.setProperty("--x", "50%");
      el.style.setProperty("--y", "50%");
    }
  };

  const handleMouseMove = (e: any) => {
    const box = boundingBoxRef.current;
    if (!box) return;

    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const xPercentage = x / box.width;
    const yPercentage = y / box.height;

    const xRotation = (xPercentage - 0.5) * 20;
    const yRotation = (0.5 - yPercentage) * 20;

    const el = cardRef.current;
    if (el) {
      el.style.setProperty("--x-rotation", `${yRotation}deg`);
      el.style.setProperty("--y-rotation", `${xRotation}deg`);
      el.style.setProperty("--x", `${xPercentage * 100}%`);
      el.style.setProperty("--y", `${yPercentage * 100}%`);
    }
  };

  return (
    <div
      ref={cardRef}
      className={twMerge(
        "transition-transform duration-300 will-change-transform",
        className
      )}
      style={
        {
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transform:
            "rotateX(var(--x-rotation, 0deg)) rotateY(var(--y-rotation, 0deg))",
          "--x": "50%",
          "--y": "50%",
        } as React.CSSProperties
      }
      onMouseEnter={setBoundingBox}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetCard}
    >
      {children}
    </div>
  );
};

export default PerspectiveCard;
