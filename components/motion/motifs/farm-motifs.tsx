"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentType } from "react";
import {
  ChickenIcon,
  CowIcon,
  FishIcon,
  GoatIcon,
  LeafyIcon,
  MaizeIcon,
  PigIcon,
  WheatIcon,
  type SpeciesIconProps
} from "./species-icons";

export type SpeciesIcon = ComponentType<SpeciesIconProps>;

export type FarmVertical = {
  key: string;
  label: string;
  Icon: SpeciesIcon;
};

/**
 * The farm verticals we rotate through across the marketing site — bespoke
 * species icons spanning livestock and crops. Poultry leads (our proven
 * origin); the rest signal the broader reach.
 */
export const farmVerticals: FarmVertical[] = [
  { key: "poultry", label: "Poultry", Icon: ChickenIcon },
  { key: "cattle", label: "Cattle", Icon: CowIcon },
  { key: "goats", label: "Goats", Icon: GoatIcon },
  { key: "pigs", label: "Pigs", Icon: PigIcon },
  { key: "aquaculture", label: "Aquaculture", Icon: FishIcon },
  { key: "maize", label: "Maize", Icon: MaizeIcon },
  { key: "grain", label: "Grain & Cereals", Icon: WheatIcon },
  { key: "greens", label: "Leafy Greens", Icon: LeafyIcon }
];

type AnimatedMotifProps = {
  Icon: SpeciesIcon;
  className?: string;
  delay?: number;
  /** Sway (rotate) instead of the default bob (translate). */
  sway?: boolean;
};

/**
 * A species icon with a gentle looping bob or sway. Holds still under reduced
 * motion. Decorative only.
 */
export function AnimatedMotif({ Icon, className, delay = 0, sway = false }: AnimatedMotifProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <Icon className={className} />;
  }

  return (
    <motion.span
      className="inline-flex"
      animate={sway ? { rotate: [-4, 4, -4] } : { y: [0, -6, 0] }}
      transition={{ duration: sway ? 3.4 : 2.6, ease: "easeInOut", repeat: Infinity, delay }}
    >
      <Icon className={className} />
    </motion.span>
  );
}
