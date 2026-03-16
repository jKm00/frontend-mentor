import { Button } from '@/components/button'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const text =
    "This is a dummy test text. Replace it with actual text for the typing test. You can use Lorem Ipsum or any other placeholder text to create a realistic typing experience for users. It's important to have a variety of characters (including punctuation and spaces) to make the test more challenging and accurate in measuring typing speed and accuracy."
  const textArray = text.split('')
  const [typed, setTyped] = useState<string[]>([])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  function handleKeyPress(event: KeyboardEvent) {
    console.log(event)
    if (event.key === 'Backspace') {
      if (event.ctrlKey) {
        setTyped((prev) => {
          const newTyped = [...prev]
          while (newTyped.length > 0 && newTyped[newTyped.length - 1] === ' ') {
            newTyped.pop()
          }
          while (newTyped.length > 0 && newTyped[newTyped.length - 1] !== ' ') {
            newTyped.pop()
          }
          return newTyped
        })
      } else {
        setTyped((prev) => prev.slice(0, -1))
      }
    } else if (event.key.length === 1) {
      setTyped((prev) => [...prev, event.key])
    }
  }

  return (
    <div className="max-w-5xl mx-auto min-h-screen flex flex-col">
      <Header />
      <ToolBar />
      <Editor text={textArray} typed={typed} />
    </div>
  )
}

function Header() {
  return (
    <header className="flex justify-between items-center py-4 mb-4">
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
    <div className="flex justify-between text-neutral-300 mb-4">
      <div className="flex items-center">
        <p className="border-r border-neutral-500 pr-2 mr-2">
          WPM: <span className="text-neutral-50">$currSpeed</span>
        </p>
        <p className="border-r border-neutral-500 pr-2 mr-2">
          Accuracy: <span className="text-red-400">$accuray</span>
        </p>
        <p>
          Time: <span className="text-yellow-400">$time</span>
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-1 items-center">
          <p>Difficulty: </p>
          <Button>Easy</Button>
          <Button>Medium</Button>
          <Button>Hard</Button>
        </div>
        <div className="flex gap-1 items-center">
          <p>Mode: </p>
          <Button>Time (60s)</Button>
          <Button>Passage</Button>
        </div>
      </div>
    </div>
  )
}

function Editor({ text, typed }: { text: string[]; typed: string[] }) {
  return (
    <div className="flex items-center mt-24">
      <p className="text-2xl font-semibold">
        {text.map((char, index) => {
          const typedChar = typed[index]

          if (typedChar === undefined) {
            return <span key={index}>{char}</span>
          }

          if (typedChar === char) {
            return (
              <span key={index} className="text-green-400">
                {char}
              </span>
            )
          }

          return (
            <span key={index} className="text-red-400">
              {char}
            </span>
          )
        })}
      </p>
    </div>
  )
}
