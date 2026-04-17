import { motion } from 'framer-motion'
import { Command, MoonStar, Play, Sun, Wifi, WifiOff } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const MotionStatus = motion.span

const statusStyles = {
  connected: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30',
  disconnected: 'text-rose-600 bg-rose-100 dark:bg-rose-900/30',
  reconnecting: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30',
}

function TopBar({ onRun, onOpenCommandPalette }) {
  const { roomId, status, theme, toggleTheme } = useAppStore()
  const connected = status === 'connected'

  return (
    <header className="mb-4 flex items-center justify-between gap-3 rounded-3xl border border-white/50 bg-white/70 p-4 shadow-xl shadow-slate-300/30 dark:border-slate-600/40 dark:bg-slate-800/70">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 p-2 text-white shadow-lg">
          <Wifi size={20} />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">LambdaSyncCode</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Serverless collaborative coding space</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-700 dark:text-slate-200">
          Room: {roomId || 'Not joined'}
        </span>
        <MotionStatus
          animate={status === 'reconnecting' ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
          transition={{ repeat: status === 'reconnecting' ? Infinity : 0, duration: 1.2 }}
          className={`flex items-center gap-1 rounded-xl px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
        >
          {connected ? <Wifi size={14} /> : <WifiOff size={14} />}
          {status}
        </MotionStatus>
        <button
          onClick={toggleTheme}
          className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:scale-105 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
          type="button"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonStar size={16} /> : <Sun size={16} />}
        </button>
        <button
          onClick={onOpenCommandPalette}
          type="button"
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
        >
          <Command size={13} />
          Ctrl+K
        </button>
        <button
          onClick={onRun}
          type="button"
          className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          <Play size={14} />
          Run (Ctrl+Enter)
        </button>
      </div>
    </header>
  )
}

export default TopBar
