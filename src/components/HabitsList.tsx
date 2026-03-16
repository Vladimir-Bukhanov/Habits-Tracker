import type { HabitType } from '../types/habitType'
import HabitItem from './HabitItem'

interface IHabitsList {
	habitsList: HabitType[]
}

export default function HabitsList({habitsList}: IHabitsList) {
	return (
		<div>
			{habitsList.map(habit => (
				<HabitItem
					key={habit.id} 
					habit={habit}
				/>
			))}
		</div>
	)
}
