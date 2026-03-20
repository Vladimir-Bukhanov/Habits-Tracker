import { useState } from 'react'
import type { HabitType } from '../types/habitType'

interface IEditForm {
	habit: HabitType
	closeEditForm: () => void
	onSave: (habit: HabitType) => void
}

export default function EditForm({habit, closeEditForm, onSave}: IEditForm) {

	const [newTitle, setNewTitle] = useState<string>(habit.title)

	const [newCategory, setNewCategory] = useState<string>(habit.category)

	const [newDescription, setNewDescription] = useState<string>(habit.description ? habit.description : '')

	const handleSave = () => {

		onSave({
			...habit,
			title: newTitle,
			category: newCategory,
			description: newDescription
		})
	}

	return (
		<div>
			<div>
				<input 
					type="text"
					className='outline-0 block w-full text-black border mb-3 px-2'
					placeholder='Enter new title'
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)} 
				/>
				<input 
					type="text"
					className='outline-0 block w-full text-black border mb-3 px-2'
					placeholder='Enter new category'
					value={newCategory}
					onChange={(e) => setNewCategory(e.target.value)} 
				/>
				<input 
					type="text"
					className='outline-0 block w-full text-black border mb-3 px-2'
					placeholder='Enter new description'
					value={newDescription}
					onChange={(e) => setNewDescription(e.target.value)} 
				/>

			</div>

			<button 
				className='border px-2 cursor-pointer hover:bg-green-200 duration-200 mr-3'
				onClick={handleSave}
			>
				Save
			</button>
			<button 
				className='border px-2 cursor-pointer hover:bg-gray-200 duration-200'
				onClick={closeEditForm}
			>
				Cancel
			</button>
		</div>
	)
}
