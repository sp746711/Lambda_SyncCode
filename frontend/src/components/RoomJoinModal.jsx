import { motion } from 'framer-motion'

const MotionContainer = motion.div
const MotionPanel = motion.div

function RoomJoinModal({ roomInput, wsEndpoint, onRoomInputChange, onEndpointChange, onJoin }) {
  return (
    <MotionContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 p-6">
      <MotionPanel
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg rounded-3xl border border-white/50 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/85"
      >
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Join a collaboration room</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Enter room ID and WebSocket endpoint to start real-time coding.
        </p>

        <div className="mt-4 space-y-3">
          <input
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 dark:border-slate-700 dark:bg-slate-900"
            placeholder="Room ID (example: room1)"
            value={roomInput}
            onChange={(event) => onRoomInputChange(event.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 dark:border-slate-700 dark:bg-slate-900"
            placeholder="wss://your-api.execute-api.region.amazonaws.com/production"
            value={wsEndpoint}
            onChange={(event) => onEndpointChange(event.target.value)}
          />
          <button
            type="button"
            onClick={onJoin}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
          >
            Join / Create Room
          </button>
        </div>
      </MotionPanel>
    </MotionContainer>
  )
}

export default RoomJoinModal
