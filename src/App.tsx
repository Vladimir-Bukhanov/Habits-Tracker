import { useContext, useEffect, useState } from 'react'
import HabitForm, { type IHabitFields } from './components/HabitForm'
import HabitsList from './components/HabitsList'
import Modal from './components/Modal'
import { ModalContext } from './context/ModalContext'
import { ThemeContext } from './context/ThemeContext'
import type { HabitType } from './types/habitType'

const initialHabits = [
  {
  	id: 1,
    title: 'physical training',
    category: 'health',
    completedDates: [],
    createdAt: new Date().toLocaleDateString()
  },
  {
  	id: 2,
    title: 'cold shower',
    category: 'health',
    completedDates: [],
    createdAt: new Date().toLocaleDateString()
  }
]

export default function App() {

  const [habits, setHabits] = useState<HabitType[]>(() => {

    const saved = localStorage.getItem('habits')
    if (saved) {
      const parse = JSON.parse(saved)
      return parse.length > 0 ? parse : initialHabits
    }

    return initialHabits
    
  })

  const { theme, toggleTheme } = useContext(ThemeContext)

  const { modal, onClose, open } = useContext(ModalContext)


  useEffect(() => {
    document.body.setAttribute("data-theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const addHabit = (formFields: IHabitFields) => {
    
    const newHabit: HabitType = {
      id: Date.now(),
      title: formFields.title,
      description: formFields.description,
      category: formFields.category,
      completedDates: [],
      createdAt: new Date().toLocaleDateString()
    }

    setHabits(prev => [...prev, newHabit])

  }

  const handleToggleHabit = (id: number) => {

    const today = new Date().toLocaleDateString()

    setHabits(prev => prev.map(habit => {
      if (habit.id !== id) return habit
      if (habit.completedDates.includes(today)) {
        return habit
      }

      return {
        ...habit,
        completedDates: [...habit.completedDates, today]
      }
    }))
  }

  return (
    <div className='mx-auto mb-5 w-[90%] max-w-200 min-w-90'>
      <h1 className='text-center mt-15 mb-5 text-xl font-bold'>
        Habits Tracker
      </h1>
      <button
        className={`border mb-3 duration-200 block px-3 cursor-pointer ${theme === "light" ? "hover:bg-blue-200" : "hover:bg-blue-700"}`}
        onClick={toggleTheme}
      >
        Change Theme
      </button>
      <button 
        className={`border px-2 mb-3 cursor-pointer ${theme === "light" ? 'hover:bg-amber-200' : 'hover:bg-amber-700'} hover:bg-amber-200 duration-200`}
        onClick={open}
      
      >
        Add habit
      </button>
      <HabitsList 
        habitsList={habits}
        handleToggleHabit={handleToggleHabit}
      />
      {modal && 
        <Modal title='Create new habit'>
        <HabitForm 
          addHabit={addHabit}
        />
      </Modal>
      }
    </div>
  )
}

