import { AnimatePresence } from 'framer-motion'
import CollaborativeEditorPage from './pages/CollaborativeEditorPage'
import LandingPage from './pages/LandingPage'
import { useAppStore } from './store/useAppStore'

function App() {
  const view = useAppStore((state) => state.view)

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? <LandingPage key="landing" /> : <CollaborativeEditorPage key="workspace" />}
    </AnimatePresence>
  )
}

export default App
