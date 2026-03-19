import type { HabitType } from '../types/habitType'
import HabitItem from './HabitItem'

interface IHabitsList {
	habitsList: HabitType[]
	handleToggleHabit: (id: number) => void
}

export default function HabitsList({habitsList, handleToggleHabit}: IHabitsList) {
	return (
		<div>
			{habitsList.map(habit => (
				<HabitItem
					key={habit.id} 
					habit={habit}
					handleToggleHabit={handleToggleHabit}
				/>
			))}
		</div>
	)
}
