import { create } from 'zustand'

const randomId = () => Math.random().toString(36).slice(2, 8)

const generateAvatar = (seed) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundType=gradientLinear`

const defaultCode = {
  javascript: `function greet(name) {
  return \`Hello, \${name}!\`
}

console.log(greet("LambdaSyncCode"))`,
  python: `def greet(name):
    return f"Hello, {name}!"

print(greet("LambdaSyncCode"))`,
}

export const useAppStore = create((set) => ({
  userId: `user-${randomId()}`,
  userName: `User-${randomId()}`,
  view: 'landing',
  wsEndpoint: 'YOUR_WSS_ENDPOINT',
  roomId: '',
  roomInput: '',
  language: 'python',
  code: defaultCode.python,
  output: 'Execution output will appear here.',
  typingUsers: [],
  users: [],
  status: 'disconnected',
  theme: 'light',
  isJoining: false,
  isTyping: false,
  isCommandPaletteOpen: false,
  isEditorFullscreen: false,
  leftPanelWidth: 280,
  rightPanelWidth: 340,
  codeHistory: [],
  activityTimeline: [{ id: `activity-${Date.now()}`, label: 'Workspace initialized', at: new Date().toLocaleTimeString() }],
  aiMessages: [
    { id: 'ai-1', role: 'assistant', text: 'Hi! I can help with refactors, bug tracing, and architecture ideas.' },
    { id: 'ai-2', role: 'assistant', text: 'Try asking: "Optimize this function for readability".' },
  ],

  setView: (view) => set({ view }),
  setRoomInput: (roomInput) => set({ roomInput }),
  setRoomId: (roomId) => set({ roomId }),
  setLanguage: (language) => set((state) => ({ language, code: defaultCode[language] ?? state.code })),
  setCode: (code) => set({ code }),
  setOutput: (output) => set({ output }),
  setStatus: (status) => set({ status }),
  setTheme: (theme) => set({ theme }),
  setIsJoining: (isJoining) => set({ isJoining }),
  setTypingUsers: (typingUsers) => set({ typingUsers }),
  setUsers: (users) => set({ users }),
  setWsEndpoint: (wsEndpoint) => set({ wsEndpoint }),
  setCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),
  setEditorFullscreen: (isEditorFullscreen) => set({ isEditorFullscreen }),
  setLeftPanelWidth: (leftPanelWidth) => set({ leftPanelWidth }),
  setRightPanelWidth: (rightPanelWidth) => set({ rightPanelWidth }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  hydrateCode: (code) => set({ code }),
  addCodeSnapshot: (code) =>
    set((state) => {
      const snapshot = {
        id: `code-${Date.now()}`,
        at: new Date().toLocaleTimeString(),
        preview: code.split('\n').slice(0, 2).join(' ').slice(0, 90),
        code,
      }
      return { codeHistory: [snapshot, ...state.codeHistory].slice(0, 5) }
    }),
  addActivity: (label) =>
    set((state) => ({
      activityTimeline: [{ id: `activity-${Date.now()}-${Math.random()}`, label, at: new Date().toLocaleTimeString() }, ...state.activityTimeline].slice(0, 16),
    })),
  addAiMessage: (role, text) =>
    set((state) => ({
      aiMessages: [...state.aiMessages, { id: `ai-${Date.now()}-${Math.random()}`, role, text }],
    })),
  upsertUser: (user) =>
    set((state) => {
      const exists = state.users.some((u) => u.userId === user.userId)
      if (exists) {
        return { users: state.users.map((u) => (u.userId === user.userId ? { ...u, ...user } : u)) }
      }
      return { users: [...state.users, { ...user, avatar: user.avatar ?? generateAvatar(user.userName) }] }
    }),
}))
