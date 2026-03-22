import type { HabitType } from '../types/habitType'
import { isCompletedToday } from './isCompletedToday'

export const habitsStatistic = (habits: HabitType[]) => {

	const totalHabits = habits.length

	const completedToday = habits.filter(habit => isCompletedToday(habit)).length

	const rate = ((completedToday / totalHabits) * 100).toFixed(1)

	return {totalHabits, completedToday, rate}

}