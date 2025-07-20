"use client";

import React, { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

interface Leaf {
  id: number;
  left: string;
  animationDuration: string;
  delay: string;
  size: string;
  opacity: number;
}

export const FallingLeaves = ({ count = 10 }: { count?: number }) => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const newLeaves = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${10 + Math.random() * 20}s`,
      delay: `${Math.random() * 5}s`,
      size: `${0.5 + Math.random() * 1.5}rem`,
      opacity: 0.2 + Math.random() * 0.8,
    }));
    setLeaves(newLeaves);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute top-0 animate-fall"
          style={{
            left: leaf.left,
            animationDuration: leaf.animationDuration,
            animationDelay: leaf.delay,
            opacity: leaf.opacity,
          }}
        >
          <Leaf 
            className="text-green-600" 
            style={{ 
              width: leaf.size, 
              height: leaf.size,
              transform: `rotate(${Math.random() * 360}deg)`,
            }} 
          />
        </div>
      ))}
    </div>
  );
};