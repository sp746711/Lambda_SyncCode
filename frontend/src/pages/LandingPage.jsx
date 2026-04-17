import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const MotionMain = motion.main

function LandingPage() {
  const setView = useAppStore((state) => state.setView)

  return (
    <MotionMain
      key="landing"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      className="mx-auto flex min-h-screen w-full max-w-[1250px] flex-col justify-center p-6"
    >
      <section className="glass-card rounded-[2rem] border border-white/60 bg-white/70 p-10 shadow-2xl shadow-slate-300/35 dark:border-slate-600/45 dark:bg-slate-800/65">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
          <Sparkles size={14} />
          Production-grade collaborative IDE
        </div>

        <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-slate-800 dark:text-slate-100 md:text-5xl">
          Build, sync, and run code together in <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">LambdaSyncCode</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Serverless real-time collaboration powered by AWS Lambda + WebSocket APIs. Designed like a premium SaaS IDE for teams shipping fast.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setView('workspace')}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-0.5"
          >
            Launch Workspace
            <ArrowRight size={15} />
          </button>
          <div className="rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
            No installs needed. Join any room and collaborate instantly.
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { icon: <Users size={17} />, title: 'Realtime Presence', text: 'Avatars, activity timeline, and typing indicators.' },
            { icon: <Zap size={17} />, title: 'Fast Execution', text: 'Run code with keyboard shortcuts and immediate output.' },
            { icon: <Sparkles size={17} />, title: 'Premium UX', text: '3D glass UI, animated transitions, command palette.' },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-lg shadow-slate-200/70 dark:border-slate-600 dark:bg-slate-900/65"
            >
              <div className="mb-3 inline-flex rounded-xl bg-slate-100 p-2 text-blue-600 dark:bg-slate-800">{item.icon}</div>
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.title}</h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </MotionMain>
  )
}

export default LandingPage
