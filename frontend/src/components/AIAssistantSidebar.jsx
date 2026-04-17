import { useState } from 'react'
import { Bot, SendHorizonal } from 'lucide-react'
import GlassCard from './GlassCard'
import { useAppStore } from '../store/useAppStore'

const mockReplies = [
  'Refactor tip: extract your editor controls into a reusable hook.',
  'Performance tip: debounce code broadcasts to reduce socket chatter.',
  'Testing tip: add component tests for command palette shortcuts.',
]

function AIAssistantSidebar() {
  const [input, setInput] = useState('')
  const { aiMessages, addAiMessage } = useAppStore()

  const sendPrompt = () => {
    if (!input.trim()) return
    addAiMessage('user', input.trim())
    setInput('')
    const mockReply = mockReplies[Math.floor(Math.random() * mockReplies.length)]
    setTimeout(() => addAiMessage('assistant', mockReply), 350)
  }

  return (
    <GlassCard className="h-full">
      <div className="mb-3 flex items-center gap-2">
        <Bot size={16} className="text-fuchsia-600" />
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">AI Assistant</h3>
      </div>
      <div className="mb-3 h-[220px] space-y-2 overflow-y-auto pr-1">
        {aiMessages.map((message) => (
          <div
            key={message.id}
            className={`rounded-2xl p-2 text-xs ${message.role === 'assistant' ? 'bg-fuchsia-50 text-fuchsia-900 dark:bg-fuchsia-900/25 dark:text-fuchsia-100' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') sendPrompt()
          }}
          placeholder="Ask AI assistant (mock UI)..."
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-blue-400 dark:border-slate-600 dark:bg-slate-900"
        />
        <button
          type="button"
          onClick={sendPrompt}
          className="rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 p-2 text-white"
        >
          <SendHorizonal size={14} />
        </button>
      </div>
    </GlassCard>
  )
}

export default AIAssistantSidebar
