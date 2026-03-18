import { useContext, useEffect } from 'react'
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



	  useEffect(() => {
    	const checkDate = () => {
      const today = new Date().toLocaleDateString()
			const lastDate = habit.completedDates[habit.completedDates.length - 1]

      if (lastDate !== today) {
				localStorage.setItem('lastDate', today)
      }
    }

		checkDate()

		const intervalId = setInterval(checkDate, 3600000)

		return () => clearInterval(intervalId)

  }, [])

	 const completedToday = () => {

			if (
				habit.completedDates[habit.completedDates.length-1] !==
				new Date().toLocaleDateString() ||
				habit.completedDates.length === 0
			) {
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
					${habit.completedDates[habit.completedDates.length-1] === 
					new Date().toLocaleDateString() && theme === 'light' ? 'bg-green-200' : ''}
					${habit.completedDates[habit.completedDates.length-1] === 
					new Date().toLocaleDateString() && theme === 'dark' ? 'bg-green-600' : ''}
					`}
					onClick={completedToday}
				>
					Completed today
				</button>

				<IoMdDoneAll 
					className={`text-2xl ease duration-200 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}
					${habit.completedDates[habit.completedDates.length-1] === 
					new Date().toLocaleDateString() ? 'opacity-100' : 'opacity-0'}`}
				/>
			</div>
		</div>
	)
}
