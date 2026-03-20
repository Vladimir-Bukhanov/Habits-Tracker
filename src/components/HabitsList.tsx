import type { HabitType } from '../types/habitType'
import HabitItem from './HabitItem'

interface IHabitsList {
	habitsList: HabitType[]
	handleToggleHabit: (id: number) => void
	onDelete: (id:number) => void
	onEdit: (habit: HabitType) => void
}

export default function HabitsList({habitsList, handleToggleHabit, onDelete, onEdit}: IHabitsList) {
	return (
		<div>
			{habitsList.map(habit => (
				<HabitItem
					key={habit.id} 
					habit={habit}
					handleToggleHabit={handleToggleHabit}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			))}
		</div>
	)
}
