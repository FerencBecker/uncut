import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Studio } from '@/types/map';
import { coordsToSVG } from '@/utils/mapCoordinates';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './StudioMarker.css';

type StudioMarkerProps = {
  studio: Studio;
  index: number;
  screensaverMode: boolean;
};

const StudioMarker = ({ studio, index, screensaverMode }: StudioMarkerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { latitude, longitude } = studio.studioAddress.location.coordinates;
  const { x, y } = coordsToSVG(latitude, longitude);

  if (shouldReduceMotion) {
    return (
      <g
        className="studio-marker-group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        style={{ cursor: 'pointer' }}
      >
        <TouchTarget x={x} y={y} />
        <VisibleMarker x={x} y={y} />
        {isActive && <PulseRing x={x} y={y} />}
      </g>
    );
  }

  return (
    <motion.g
      className="studio-marker-group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      style={{ cursor: 'pointer' }}
      initial="initial"
      animate="animate"
      variants={screensaverMode ? entranceAnimation(index) : instantAppearance}
    >
      <TouchTarget x={x} y={y} />
      <AnimatedVisibleMarker x={x} y={y} isHovered={isHovered} isActive={isActive} />
      {isActive && <AnimatedPulseRing x={x} y={y} />}
    </motion.g>
  );
};

export default StudioMarker;

const animatedPulseRingTransition = {
  duration: 1,
  repeat: Infinity,
  ease: 'easeOut' as const,
};

const instantAppearance = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1],
    opacity: [1],
    transition: {
      duration: 0,
      times: [0],
      ease: 'easeInOut' as const,
      delay: 0,
    },
  },
};

const entranceAnimation = (index: number) => ({
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.3, 1],
    opacity: [0, 1, 1],
    transition: {
      duration: 6,
      times: [0, 0.3, 1],
      ease: 'easeInOut' as const,
      delay: index * 0.3,
    },
  },
});

type Coordinates = {
  x: number;
  y: number;
};

type AnimatedVisibleMarkerProps = Coordinates & {
  isHovered: boolean;
  isActive: boolean;
};

const TouchTarget = ({ x, y }: Coordinates) => <circle cx={x} cy={y} r="32" className="studio-marker-touch-target" />;

const VisibleMarker = ({ x, y }: Coordinates) => <circle cx={x} cy={y} r="12" className="studio-marker-visible" />;

const PulseRing = ({ x, y }: Coordinates) => <circle cx={x} cy={y} r="20" className="studio-marker-pulse-ring" />;

const AnimatedVisibleMarker = ({ x, y, isHovered, isActive }: AnimatedVisibleMarkerProps) => {
  const animate = {
    scale: isActive ? 1.5 : isHovered ? 1.4 : 1,
    rotate: isHovered ? 10 : 0,
  };
  return (
    <motion.circle
      cx={x}
      cy={y}
      r="12"
      className="studio-marker-visible"
      animate={animate}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ transformOrigin: `${x}px ${y}px` }}
      data-hovered={isHovered ? 'true' : 'false'}
      data-active={isActive ? 'true' : 'false'}
    />
  );
};

const AnimatedPulseRing = ({ x, y }: Coordinates) => (
  <motion.circle
    cx={x}
    cy={y}
    r="20"
    className="studio-marker-pulse-ring"
    initial={{ scale: 1, opacity: 0.8 }}
    animate={{ scale: 1.5, opacity: 0 }}
    transition={animatedPulseRingTransition}
    style={{ transformOrigin: `${x}px ${y}px` }}
  />
);
