import { useContext } from 'react'
import { IoMdDoneAll } from "react-icons/io"
import { ThemeContext } from '../context/ThemeContext'
import type { HabitType } from '../types/habitType'
import { capitalize } from '../utils/capitalize'
import { isCompletedToday } from '../utils/isCompletedToday'

interface IHabitItem {
	habit: HabitType
	handleToggleHabit: (id: number) => void
	onDelete: (id: number) => void
	onEdit: (habit: HabitType) => void
}

export default function HabitItem({habit, handleToggleHabit, onDelete, onEdit}: IHabitItem) {

	 const {theme} = useContext(ThemeContext)

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
				Completed days: {habit.completedDates.length}
			</p>
			<button
			className='mb-3 border block px-2 hover:bg-red-500 duration-200 cursor-pointer'
				onClick={() => onDelete(habit.id)}
			>
				Delete
			</button>
			<button
			className={`mb-3 border px-2 ${theme === 'light' ? 'hover:bg-blue-200' : 'hover:bg-blue-600'} duration-200 cursor-pointer`}
				onClick={() => onEdit(habit)}
			>
				Edit
			</button>
			<div
				className='flex items-center'
			>
				<button
					className={`mr-3 border px-2 cursor-pointer duration-200 
					${theme === 'light' ? 'hover:bg-green-200' : 'hover:bg-green-600'}
					${isCompletedToday(habit) && theme === 'light' ? 'bg-green-200' : ''}
					${isCompletedToday(habit) && theme === 'dark' ? 'bg-green-600' : ''}
					`}
					onClick={() => handleToggleHabit(habit.id)}
				>
					{isCompletedToday(habit) ? "Done today" : "Mark done"}
				</button>

				<IoMdDoneAll 
					className={`text-2xl ease duration-200 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}
					${isCompletedToday(habit) ? 'opacity-100' : 'opacity-0'}`}
				/>
			</div>
		</div>
	)
}
