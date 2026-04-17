import { AnimatePresence, motion } from 'framer-motion'

const MotionTyping = motion.div

function TypingIndicator({ users }) {
  const others = users.filter(Boolean)
  const label = others.length === 1 ? `${others[0]} is typing...` : `${others.slice(0, 2).join(', ')} are typing...`

  return (
    <AnimatePresence>
      {others.length > 0 && (
        <MotionTyping
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          className="rounded-xl bg-blue-100 px-3 py-2 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
        >
          {label}
        </MotionTyping>
      )}
    </AnimatePresence>
  )
}

export default TypingIndicator
