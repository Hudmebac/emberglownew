import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Meteor {
  id: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

export default function MeteorShower() {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    const createMeteor = () => {
      const id = Date.now();
      const newMeteor: Meteor = {
        id,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 40}%`,
        duration: 1 + Math.random() * 1.5,
        delay: Math.random() * 2,
      };

      setMeteors((prev) => [...prev, newMeteor]);

      // Remove meteor after animation finishes
      setTimeout(() => {
        setMeteors((prev) => prev.filter((m) => m.id !== id));
      }, (newMeteor.duration + newMeteor.delay) * 1000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        createMeteor();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          initial={{ 
            opacity: 0, 
            scale: 0, 
            x: 0, 
            y: 0,
            rotate: 215 
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            x: [0, -300], 
            y: [0, 300] 
          }}
          transition={{ 
            duration: meteor.duration, 
            delay: meteor.delay,
            ease: "easeOut" 
          }}
          style={{
            left: meteor.left,
            top: meteor.top,
          }}
          className="absolute w-[2px] h-[100px] bg-gradient-to-t from-transparent via-eg-gold to-white blur-[1px]"
        />
      ))}
    </div>
  );
}
