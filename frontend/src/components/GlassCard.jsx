import { motion } from 'framer-motion'

const MotionSection = motion.section

function GlassCard({ children, className = '' }) {
  return (
    <MotionSection
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`glass-card rounded-3xl border border-white/40 bg-white/65 p-4 shadow-[0_14px_50px_-30px_rgba(15,23,42,0.9)] dark:border-slate-600/50 dark:bg-slate-800/70 ${className}`}
    >
      {children}
    </MotionSection>
  )
}

export default GlassCard
