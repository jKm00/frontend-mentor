import { Button } from '@/components/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <ToolBar />
      <Editor />
    </div>
  )
}

function Header() {
  return (
    <header className="flex justify-between items-center py-4">
      <div className="flex gap-2">
        <div>$logo</div>
        <div className="flex flex-col">
          <h1 className="text-white font-black text-2xl">Typing Speed Test</h1>
          <p className="text-neutral-300 text-sm">
            Type as fast as you can in 60 seconds
          </p>
        </div>
      </div>
      <p className="text-neutral-300">
        Personal best: <span className="text-neutral-50">$bestSpeed WPM</span>
      </p>
    </header>
  )
}

function ToolBar() {
  return (
    <div className="text-neutral-300">
      <div>
        <p>
          WPM: <span className="text-neutral-50">$currSpeed</span>
        </p>
        <p>
          Accuracy: <span className="text-red-400">$accuray</span>
        </p>
        <p>
          Time: <span className="text-yellow-400">$time</span>
        </p>
      </div>
      <div>
        <div>
          <p>Difficulty: </p>
          <Button>Easy</Button>
          <Button>Medium</Button>
          <Button>Hard</Button>
        </div>
        <div>
          <p>Mode: </p>
          <Button>Time (60s)</Button>
          <Button>Passage</Button>
        </div>
      </div>
    </div>
  )
}

function Editor() {
  return <p>$text</p>
}
