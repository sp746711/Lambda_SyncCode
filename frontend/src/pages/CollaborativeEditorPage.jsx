import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import TopBar from '../components/TopBar'
import LeftPanel from '../components/LeftPanel'
import EditorPanel from '../components/EditorPanel'
import RightPanel from '../components/RightPanel'
import RoomJoinModal from '../components/RoomJoinModal'
import CommandPalette from '../components/CommandPalette'
import CodeHistoryPanel from '../components/CodeHistoryPanel'
import ActivityTimelinePanel from '../components/ActivityTimelinePanel'
import AIAssistantSidebar from '../components/AIAssistantSidebar'
import { useLocalStorage, readLocalStorage } from '../hooks/useLocalStorage'
import { useWebSocket } from '../hooks/useWebSocket'
import { useAppStore } from '../store/useAppStore'

const MotionPage = motion.div

function CollaborativeEditorPage() {
  const {
    roomId,
    roomInput,
    wsEndpoint,
    language,
    code,
    output,
    typingUsers,
    users,
    theme,
    userName,
    isCommandPaletteOpen,
    isEditorFullscreen,
    leftPanelWidth,
    rightPanelWidth,
    codeHistory,
    activityTimeline,
    setRoomInput,
    setLanguage,
    setCode,
    setIsJoining,
    setTheme,
    setWsEndpoint,
    setCommandPaletteOpen,
    setEditorFullscreen,
    setLeftPanelWidth,
    setRightPanelWidth,
    addCodeSnapshot,
    addActivity,
  } = useAppStore()
  const { joinRoom, sendCode, executeCode, publishTyping } = useWebSocket()

  const localStorageKey = useMemo(() => `lambdasync:${roomId || 'guest'}:${language}:code`, [roomId, language])

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    setTheme(readLocalStorage('lambdasync:theme', 'light'))
  }, [setTheme])

  useLocalStorage(localStorageKey, code)
  useLocalStorage('lambdasync:theme', theme)
  useLocalStorage('lambdasync:left-width', leftPanelWidth)
  useLocalStorage('lambdasync:right-width', rightPanelWidth)

  useEffect(() => {
    if (!roomId) return
    const restoredCode = readLocalStorage(localStorageKey, code)
    if (restoredCode && restoredCode !== code) {
      setCode(restoredCode)
    }
  }, [code, localStorageKey, roomId, setCode])

  const handleCodeChange = (nextCode) => {
    setCode(nextCode)
    sendCode(nextCode)
    publishTyping()
    addCodeSnapshot(nextCode)
  }

  const handleJoin = () => {
    if (!roomInput.trim()) {
      toast.error('Room ID is required')
      return
    }
    setIsJoining(true)
    joinRoom(roomInput.trim())
  }

  const runCode = () => {
    executeCode(code)
    addActivity('Executed current file')
  }

  const toggleFullscreen = () => {
    const next = !isEditorFullscreen
    setEditorFullscreen(next)
    addActivity(next ? 'Entered fullscreen editor mode' : 'Exited fullscreen editor mode')
  }

  useEffect(() => {
    setLeftPanelWidth(readLocalStorage('lambdasync:left-width', 280))
    setRightPanelWidth(readLocalStorage('lambdasync:right-width', 340))
  }, [setLeftPanelWidth, setRightPanelWidth])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandPaletteOpen(true)
      }
      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault()
        runCode()
      }
      if (event.key === 'Escape') {
        setCommandPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  const resizePanel = (panel) => (event) => {
    event.preventDefault()
    const startX = event.clientX
    const initialWidth = panel === 'left' ? leftPanelWidth : rightPanelWidth

    const onMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX
      if (panel === 'left') {
        setLeftPanelWidth(Math.min(420, Math.max(220, initialWidth + delta)))
      } else {
        setRightPanelWidth(Math.min(500, Math.max(280, initialWidth - delta)))
      }
    }

    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const commandOptions = [
    { id: 'run', label: 'Run current code', shortcut: 'Ctrl+Enter', onRun: runCode },
    { id: 'theme', label: 'Toggle theme', shortcut: '-', onRun: () => useAppStore.getState().toggleTheme() },
    { id: 'fullscreen', label: 'Toggle fullscreen editor', shortcut: 'F', onRun: toggleFullscreen },
    { id: 'landing', label: 'Go to landing page', shortcut: '-', onRun: () => useAppStore.getState().setView('landing') },
    { id: 'join', label: 'Open room join modal', shortcut: '-', onRun: () => useAppStore.getState().setRoomId('') },
  ]

  return (
    <MotionPage
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto min-h-screen max-w-[1600px] p-4 md:p-6"
    >
      {!roomId && (
        <RoomJoinModal
          roomInput={roomInput}
          wsEndpoint={wsEndpoint}
          onRoomInputChange={setRoomInput}
          onEndpointChange={setWsEndpoint}
          onJoin={handleJoin}
        />
      )}

      <CommandPalette
        open={isCommandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        commands={commandOptions}
      />

      <TopBar onRun={runCode} onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      <div className="mb-4 flex items-center justify-end">
        <div className="inline-flex rounded-2xl border border-white/50 bg-white/70 p-1 shadow-lg dark:border-slate-600 dark:bg-slate-800/70">
          {['python', 'javascript'].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang)}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition ${language === lang ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700'}`}
            >
              {lang === 'python' ? 'Python' : 'JavaScript'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        {!isEditorFullscreen && (
          <>
            <div style={{ width: `${leftPanelWidth}px` }} className="space-y-3">
              <LeftPanel
                users={users}
                typingUsers={typingUsers}
                currentUserName={userName}
              />
              <CodeHistoryPanel
                historyItems={codeHistory}
                onRestore={(snapshotCode) => {
                  setCode(snapshotCode)
                  addActivity('Restored code from history')
                  toast.success('Code snapshot restored')
                }}
              />
            </div>
            <div
              role="separator"
              className="w-1 cursor-col-resize rounded-full bg-slate-300/60 hover:bg-blue-400/60"
              onMouseDown={resizePanel('left')}
            />
          </>
        )}

        <div className="min-w-0 flex-1">
          <EditorPanel
            code={code}
            language={language}
            typingUsers={typingUsers.filter((name) => name !== userName)}
            onCodeChange={handleCodeChange}
            isFullscreen={isEditorFullscreen}
            onToggleFullscreen={toggleFullscreen}
          />
        </div>

        {!isEditorFullscreen && (
          <>
            <div
              role="separator"
              className="w-1 cursor-col-resize rounded-full bg-slate-300/60 hover:bg-blue-400/60"
              onMouseDown={resizePanel('right')}
            />
            <div style={{ width: `${rightPanelWidth}px` }} className="space-y-3">
              <RightPanel output={output} />
              <ActivityTimelinePanel activities={activityTimeline} />
              <AIAssistantSidebar />
            </div>
          </>
        )}
      </div>
    </MotionPage>
  )
}

export default CollaborativeEditorPage
