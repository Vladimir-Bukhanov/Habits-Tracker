import { AnimatePresence, motion } from 'framer-motion'
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
		<AnimatePresence mode='popLayout'>
		<div>
			{habitsList.map(habit => (
				<motion.li
					key={habit.id}
					className='list-none'
					layout
					initial={{ opacity:0, y:-10 }}
					animate={{ opacity:1, y:0 }}
					exit={{ opacity:0, y:10 }}
					transition={{ duration:0.2 }}
				>
					<HabitItem
						habit={habit}
						handleToggleHabit={handleToggleHabit}
						onDelete={onDelete}
						onEdit={onEdit}
					/>
				</motion.li>
			))}
		</div>
		</AnimatePresence>
	)
}
