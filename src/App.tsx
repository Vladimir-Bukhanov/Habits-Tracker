import { useContext, useEffect, useState } from 'react'
import HabitsList from './components/HabitsList'
import { ThemeContext } from './context/ThemeContext'
import type { HabitType } from './types/habitType'

const initialHabits = [
  {
  	id: '1',
    title: 'physical training',
    category: 'health',
    completedDates: [],
    createdAt: Date.now().toLocaleString()
  },
  {
  	id: '2',
    title: 'cold shower',
    category: 'health',
    completedDates: [],
    createdAt: Date.now().toLocaleString()
  }
]

export default function App() {

  const [habits, setHabits] = useState<HabitType[]>(initialHabits)

  const { theme, toggleTheme } = useContext(ThemeContext)


  useEffect(() => {
    document.body.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <div className='mx-auto mb-5 w-[90%] max-w-200 min-w-90'>
      <h1 className='text-center mt-15 mb-5 text-xl font-bold'>
        Habits Tracker
      </h1>
      <HabitsList 
        habitsList={habits}
      />
      <button
        className={`border mt-5 px-3 cursor-pointer ${theme === "light" ? "hover:bg-blue-200" : "hover:bg-blue-700"}`}
        onClick={toggleTheme}
      >
        Change Theme
      </button>
    </div>
  )
}

