import { Button } from '@/components/button'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({ component: App })

type Difficulty = 'easy' | 'medium' | 'hard'
type Mode = 'time' | 'passage'
type Status = 'waiting' | 'on-going' | 'finished'

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [mode, setMode] = useState<Mode>('time')

  const statusRef = useRef<Status>('waiting')
  const [time, setTime] = useState(60)

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
    const status = statusRef.current
    if (status === 'finished') return

    if (status === 'waiting') {
      start()
    }

    if (event.key === 'Backspace') {
      if (event.ctrlKey) {
        removeWord()
      } else if (event.metaKey) {
        clearInput()
      } else {
        removeLetter()
      }
    } else if (event.key.length === 1) {
      addLetter(event.key)
    }
  }

  function start() {
    statusRef.current = 'on-going'

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          clearInterval(interval)
          end()
          return prev
        } else {
          return prev - 1
        }
      })
    }, 1000)
  }

  function end() {
    statusRef.current = 'finished'
  }

  function addLetter(letter: string) {
    setTyped((prev) => [...prev, letter])
  }

  function removeLetter() {
    setTyped((prev) => prev.slice(0, -1))
  }

  function removeWord() {
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
  }

  function clearInput() {
    setTyped([])
  }

  return (
    <div className="max-w-5xl mx-auto min-h-screen flex flex-col">
      <Header />
      <ToolBar
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        mode={mode}
        onModeChange={setMode}
      />
      <Editor
        text={textArray}
        typed={typed}
        time={time}
        status={statusRef.current}
      />
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

function ToolBar({
  difficulty,
  onDifficultyChange,
  mode,
  onModeChange,
}: {
  difficulty: Difficulty
  onDifficultyChange: (difficulty: Difficulty) => void
  mode: Mode
  onModeChange: (mode: Mode) => void
}) {
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
          <Button
            onClick={() => onDifficultyChange('easy')}
            active={difficulty === 'easy'}
          >
            Easy
          </Button>
          <Button
            onClick={() => onDifficultyChange('medium')}
            active={difficulty === 'medium'}
          >
            Medium
          </Button>
          <Button
            onClick={() => onDifficultyChange('hard')}
            active={difficulty === 'hard'}
          >
            Hard
          </Button>
        </div>
        <div className="flex gap-1 items-center">
          <p>Mode: </p>
          <Button onClick={() => onModeChange('time')} active={mode === 'time'}>
            Time (60s)
          </Button>
          <Button
            onClick={() => onModeChange('passage')}
            active={mode === 'passage'}
          >
            Passage
          </Button>
        </div>
      </div>
    </div>
  )
}

function Editor({
  text,
  typed,
  time,
  status,
}: {
  text: string[]
  typed: string[]
  time: number
  status: Status
}) {
  return (
    <div className="flex flex-col mt-24">
      <p
        className={`${status === 'on-going' ? 'text-yellow-400' : 'text-transparent'} text-2xl mb-4`}
      >
        {time}
      </p>
      <p className="text-2xl font-semibold">
        {text.map((char, index) => {
          const typedChar = typed[index]

          if (index === typed.length) {
            return (
              <span key={index} className="border-l">
                {char}
              </span>
            )
          }

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
            <span key={index} className="text-red-400 underline">
              {char}
            </span>
          )
        })}
      </p>
      {status === 'waiting' && (
        <p className="text-center text-neutral-400 text-sm mt-8">
          Start typing to start the timer
        </p>
      )}
    </div>
  )
}
