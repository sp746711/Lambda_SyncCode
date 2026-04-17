import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const MotionOverlay = motion.div
const MotionPanel = motion.div

function CommandPalette({ open, onClose, commands }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return commands
    const normalized = query.toLowerCase()
    return commands.filter((cmd) => cmd.label.toLowerCase().includes(normalized))
  }, [commands, query])

  return (
    <AnimatePresence>
      {open && (
        <MotionOverlay
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/45 p-6 pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <MotionPanel
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -15, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl rounded-3xl border border-white/65 bg-white/85 p-4 shadow-2xl backdrop-blur-xl dark:border-slate-600 dark:bg-slate-900/85"
            onClick={(event) => event.stopPropagation()}
          >
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type a command..."
              className="mb-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            <div className="max-h-72 space-y-1 overflow-y-auto">
              {filtered.map((command) => (
                <button
                  type="button"
                  key={command.id}
                  onClick={() => {
                    command.onRun()
                    onClose()
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <span>{command.label}</span>
                  <span className="text-xs text-slate-400">{command.shortcut}</span>
                </button>
              ))}
              {filtered.length === 0 && <p className="px-3 py-4 text-center text-xs text-slate-500">No commands found.</p>}
            </div>
          </MotionPanel>
        </MotionOverlay>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
