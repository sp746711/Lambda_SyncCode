import { Users } from 'lucide-react'
import GlassCard from './GlassCard'

function LeftPanel({ users, typingUsers, currentUserName }) {
  const typingSet = new Set(typingUsers)

  return (
    <GlassCard className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Room Presence</h2>
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
          <Users size={12} />
          {users.length}
        </span>
      </div>
      <div className="space-y-2">
        {users.length === 0 && <p className="text-xs text-slate-500 dark:text-slate-400">Join a room to see active users.</p>}
        {users.map((user) => (
          <div
            key={user.userId}
            className="flex items-center gap-2 rounded-2xl border border-white/40 bg-white/50 p-2 dark:border-slate-600 dark:bg-slate-700/50"
          >
            <img src={user.avatar} alt={user.userName} className="h-8 w-8 rounded-full border border-white shadow-sm" />
            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-100">
                {user.userName}
                {user.userName === currentUserName ? ' (you)' : ''}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-300">
                {typingSet.has(user.userName) ? 'typing...' : 'active now'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

export default LeftPanel
