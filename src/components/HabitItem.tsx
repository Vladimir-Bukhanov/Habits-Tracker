import { useContext, useEffect, useState } from 'react'
import { IoMdDoneAll } from "react-icons/io"
import { ThemeContext } from '../context/ThemeContext'
import type { HabitType } from '../types/habitType'
import { capitalize } from '../utils/capitalize'

interface IHabitItem {
	habit: HabitType
	countCompletedDays: (id: number) => void
}

export default function HabitItem({habit, countCompletedDays}: IHabitItem) {

	 const {theme} = useContext(ThemeContext)

	 const [completed, setCompleted] = useState<boolean>(false)

	  useEffect(() => {
    	const checkDate = () => {
      const today = new Date().toLocaleDateString()
      const lastDate = localStorage.getItem('lastDate')

      if (lastDate !== today) {
        setCompleted(false)
				localStorage.setItem('lastDate', today)
      }
    }

		checkDate()

		const intervalId = setInterval(checkDate, 3600000)

		return () => clearInterval(intervalId)

  }, [])

	 const completedToday = () => {

			if (!completed) {
				setCompleted(true)
				countCompletedDays(habit.id)
			}
	 }

	return (
		<div className='border mb-5 p-5'>
			<h2 
				className='mb-3 text-center text-xl'
			>
				{ capitalize(habit.title) }
			</h2>
			<p
				className='mb-3'
			>
				Category: {habit.category}
			</p>
			<p
				className='mb-3'
			>
				Completed days: {(habit.completedDates).length}
			</p>
			<div
				className='flex items-center'
			>
				<button
					className={`mr-3 border px-2 cursor-pointer duration-200 
					${theme === 'light' ? 'hover:bg-green-200' : 'hover:bg-green-600'}
					${completed && theme === 'light' ? 'bg-green-200' : ''}
					${completed && theme === 'dark' ? 'bg-green-600' : ''}
					`}
					onClick={completedToday}
				>
					Completed today
				</button>

				<IoMdDoneAll 
					className={`text-2xl ease duration-200 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}
					${completed ? 'opacity-100' : 'opacity-0'}`}
				/>
			</div>
		</div>
	)
}
