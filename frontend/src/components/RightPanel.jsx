import { TerminalSquare } from 'lucide-react'
import GlassCard from './GlassCard'

function RightPanel({ output }) {
  return (
    <GlassCard className="h-full">
      <div className="mb-3 flex items-center gap-2">
        <TerminalSquare size={16} className="text-indigo-500" />
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Execution Console</h2>
      </div>
      <pre className="h-[62vh] overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
        {output}
      </pre>
    </GlassCard>
  )
}

export default RightPanel
