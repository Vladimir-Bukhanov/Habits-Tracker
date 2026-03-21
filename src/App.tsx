import { useContext, useEffect, useState } from 'react'
import EditForm from './components/EditForm'
import FilteredButtons from './components/FilteredButtons'
import HabitForm, { type IHabitFields } from './components/HabitForm'
import HabitsList from './components/HabitsList'
import Modal from './components/Modal'
import { ModalContext } from './context/ModalContext'
import { ThemeContext } from './context/ThemeContext'
import type { FilterBtnType } from './types/filterBtnType'
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

  const [isEditing, setIsEditing] = useState<HabitType | null>(null)

  const [filterBtn, setFilterBtn] = useState<FilterBtnType>(() => {
    return (localStorage.getItem('filterBtn') as FilterBtnType || "All")
  })

  const { theme, toggleTheme } = useContext(ThemeContext)

  const { modal, open } = useContext(ModalContext)


  useEffect(() => {
    document.body.setAttribute("data-theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    localStorage.setItem('filterBtn', filterBtn)
  }, [filterBtn])

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

  const onDelete = (id: number) => {
    setHabits(prev => prev.filter(habit => 
      habit.id !== id
    ))
  }

  const handleEditSave = (updatedHabit: HabitType) => {
    setHabits(prev => prev.map(habit => (
      habit.id === updatedHabit.id ? 
      updatedHabit : habit
    )))

    setIsEditing(null)
  }

  const filteredHabits = habits.filter(habit => {

    if (filterBtn === "Completed today") {
      return habit.completedDates.includes(new Date().toLocaleDateString())
    } else if ( filterBtn === "Not completed today") {
      return !habit.completedDates.includes(new Date().toLocaleDateString())
    }

    return true

  })

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
      <FilteredButtons 
        current={filterBtn}
        onFilter={setFilterBtn}
      />
      <button 
        className={`border px-2 mb-3 cursor-pointer ${theme === "light" ? 'hover:bg-amber-200' : 'hover:bg-amber-700'} hover:bg-amber-200 duration-200`}
        onClick={open}
      
      >
        Add habit
      </button>
      <HabitsList 
        habitsList={filteredHabits}
        handleToggleHabit={handleToggleHabit}
        onDelete={onDelete}
        onEdit={setIsEditing}
      />
      {modal && 
        <Modal title='Create new habit'>
        <HabitForm 
          addHabit={addHabit}
        />
      </Modal>
      }

      {isEditing &&
        <EditForm 
          habit={isEditing}
          closeEditForm={() => setIsEditing(null)}
          onSave={handleEditSave}
        />
      }
    </div>
  )
}
