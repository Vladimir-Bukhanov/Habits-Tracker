import type { HabitType } from '../types/habitType'

export const isCompletedToday = (habit: HabitType) => {

		const today = new Date().toLocaleDateString()

		return habit.completedDates.includes(today)
		
	 }