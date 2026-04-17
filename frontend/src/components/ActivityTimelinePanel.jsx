import { Activity } from 'lucide-react'
import GlassCard from './GlassCard'

function ActivityTimelinePanel({ activities }) {
  return (
    <GlassCard className="h-full">
      <div className="mb-3 flex items-center gap-2">
        <Activity size={15} className="text-indigo-500" />
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Activity Timeline</h3>
      </div>
      <div className="max-h-[220px] space-y-2 overflow-y-auto pr-1">
        {activities.map((activity) => (
          <div key={activity.id} className="rounded-2xl border border-white/50 bg-white/65 p-2 dark:border-slate-600 dark:bg-slate-800/70">
            <p className="text-xs font-medium text-slate-700 dark:text-slate-200">{activity.label}</p>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{activity.at}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

export default ActivityTimelinePanel
