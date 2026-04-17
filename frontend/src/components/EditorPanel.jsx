import Editor from '@monaco-editor/react'
import { Maximize2, Minimize2 } from 'lucide-react'
import GlassCard from './GlassCard'
import TypingIndicator from './TypingIndicator'

function EditorPanel({ code, language, typingUsers, onCodeChange, isFullscreen, onToggleFullscreen }) {
  return (
    <GlassCard className="h-full">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Live Code Editor</h2>
        <div className="flex items-center gap-2">
          <TypingIndicator users={typingUsers} />
          <button
            type="button"
            onClick={onToggleFullscreen}
            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
            aria-label="Toggle editor fullscreen"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>
      <div className={`${isFullscreen ? 'h-[78vh]' : 'h-[62vh]'} overflow-hidden rounded-2xl border border-slate-200/70 shadow-inner dark:border-slate-700`}>
        <Editor
          value={code}
          language={language}
          onChange={(v) => onCodeChange(v ?? '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            roundedSelection: true,
            smoothScrolling: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </GlassCard>
  )
}

export default EditorPanel
