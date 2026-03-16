import { useContext, useState } from 'react'
import { IoMdDoneAll } from "react-icons/io"
import { ThemeContext } from '../context/ThemeContext'
import type { HabitType } from '../types/habitType'
import { capitalize } from '../utils/capitalize'

interface IHabitItem {
	habit: HabitType
}

export default function HabitItem({habit}: IHabitItem) {

	 const {theme} = useContext(ThemeContext)

	 const [completed, setCompleted] = useState<boolean>(false)

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
				Completed days: {habit.completedDates}
			</p>
			<div
				className='flex items-center'
			>
				<button
					className={`mr-3 border px-2 cursor-pointer duration-200 
					${theme === 'light' ? 'hover:bg-green-200' : 'hover:opacity-70'}	`}
					onClick={() => setCompleted(prev => !prev)}
				>
					Completed today
				</button>

				<IoMdDoneAll 
					className={`text-2xl ease duration-200 ${theme === 'light' ? 'text-green-700' : 'text-green-400'}
					${completed ? 'opacity-100' : 'opacity-0'}`}
				/>
			</div>
		</div>
	)
}
