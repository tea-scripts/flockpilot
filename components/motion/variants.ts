import type { Variants } from "framer-motion";

/** Brand-standard easing — a soft, premium ease-out. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Fade up + in. The default reveal motion across the site. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT }
  }
};

/** Container that staggers its direct motion children. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 }
  }
};

/** Item variant intended to live inside {@link staggerContainer}. */
export const staggerItem: Variants = fadeUp;
