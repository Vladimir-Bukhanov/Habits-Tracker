import { IoCheckmarkDoneCircleOutline } from "react-icons/io5"
import type { HabitType } from '../types/habitType'

interface IHabitItem {
	habit: HabitType
}

export default function HabitItem({habit}: IHabitItem) {
	return (
		<div>
			<h2>{habit.title}</h2>
			<p>{habit.category}</p>
			<p>{habit.completedDates}</p>
			<IoCheckmarkDoneCircleOutline />
		</div>
	)
}
