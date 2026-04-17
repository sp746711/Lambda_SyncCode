import { History } from 'lucide-react'
import GlassCard from './GlassCard'

function CodeHistoryPanel({ historyItems, onRestore }) {
  return (
    <GlassCard className="h-full">
      <div className="mb-3 flex items-center gap-2">
        <History size={15} className="text-blue-600" />
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Code History</h3>
      </div>
      <div className="space-y-2">
        {historyItems.length === 0 && <p className="text-xs text-slate-500 dark:text-slate-400">Snapshots appear after edits.</p>}
        {historyItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onRestore(item.code)}
            className="w-full rounded-2xl border border-white/50 bg-white/65 p-2 text-left transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-600 dark:bg-slate-800/70 dark:hover:bg-slate-700"
          >
            <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-100">{item.preview || 'Untitled snapshot'}</p>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{item.at}</p>
          </button>
        ))}
      </div>
    </GlassCard>
  )
}

export default CodeHistoryPanel
