import { useState } from 'react'
import type { HabitType } from '../types/habitType'

interface IEditForm {
	habit: HabitType
	closeEditForm: () => void
	onSave: (habit: HabitType) => void
}

export default function EditForm({habit, closeEditForm, onSave}: IEditForm) {

	const [newTitle, setNewTitle] = useState<string>('')

	const [newCategory, setNewCategory] = useState<string>('')

	const [newDescription, setNewDescription] = useState<string>('')

	const handleSave = () => {

		onSave({
			...habit,
			title: newTitle,
			category: newCategory,
			description: newDescription
		})
	}

	return (
		<div className='fixed top-0 left-0 right-0 bottom-0 bg-black/60'>
			<div className='w-[90%] max-w-150 min-w-90 p-5 bg-white text-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '>
				<h2 className='text-center text-xl mb-5'>Edit Form</h2>
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
				{habit.description && 
					<input 
						type="text"
						className='outline-0 block w-full text-black border mb-3 px-2'
						placeholder='Enter new description'
						value={newDescription}
						onChange={(e) => setNewDescription(e.target.value)} 
				/>
				}

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
		</div>
	)
}
