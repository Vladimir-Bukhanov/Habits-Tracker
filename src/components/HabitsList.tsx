import type { HabitType } from '../types/habitType'
import HabitItem from './HabitItem'

interface IHabitsList {
	habitsList: HabitType[]
	countCompletedDays: (id: number) => void
}

export default function HabitsList({habitsList, countCompletedDays}: IHabitsList) {
	return (
		<div>
			{habitsList.map(habit => (
				<HabitItem
					key={habit.id} 
					habit={habit}
					countCompletedDays={countCompletedDays}
				/>
			))}
		</div>
	)
}
