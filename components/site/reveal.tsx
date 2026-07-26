'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Shared scroll/mount animation primitives for the corporate site.

export function Reveal({
  children,
  delay = 0,
  className,
  onMount = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  onMount?: boolean;
}) {
  const animation = {
    initial: { opacity: 0, y: 28 },
    transition: { duration: 0.7, delay, ease: [0.21, 0.65, 0.36, 1] as const },
  };

  if (onMount) {
    return (
      <motion.div {...animation} animate={{ opacity: 1, y: 0 }} className={className}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      {...animation}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Float({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
