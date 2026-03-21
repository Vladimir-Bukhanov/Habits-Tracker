import type { HabitType } from '../types/habitType'

export const habitsStatistic = (habits: HabitType[]) => {

	const today = new Date().toLocaleDateString()

	const totalHabits = habits.length

	const completedToday = habits.filter(habit => habit.completedDates.includes(today)).length

	const rate = (completedToday / totalHabits) * 100

	return {totalHabits, completedToday, rate}

}