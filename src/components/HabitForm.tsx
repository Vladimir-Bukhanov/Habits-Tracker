import { useState } from 'react'

interface IHabitForm {
	addHabit: (newHabit: IHabitFields) => void
}

export interface IHabitFields {
	title: string
	category: string
	description: string
}

const initialState: IHabitFields = {
	title: '',
	category: '',
	description: ''
}

export default function HabitForm({addHabit}: IHabitForm) {

	const [habitFields, setHabitFields] = useState<IHabitFields>(initialState)

	const [error, setError] = useState<string>('')

	const handleSubmit = (e: React.FormEvent) => {

		e.preventDefault()

		if (
			habitFields.title.trim() === "" ||
			habitFields.category.trim() === ""  
		) {
			setError('Fill in all fields...')
			return
		}

		addHabit(habitFields)
		setHabitFields(initialState)

	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
		
		setError('')
		const {name, value} = e.target
		setHabitFields(prev => ({...prev, [name]: value}) )

	}

	return (
		<form
			onSubmit={handleSubmit}
		>
			<div>
				<input 
					type="text"
					name='title'
					placeholder='Enter title of habit'
					value={habitFields.title}
					onChange={handleChange} 
				/>
				<input 
					type="text"
					name='category'
					placeholder='Enter category of habit'
					value={habitFields.category}
					onChange={handleChange} 
				/>
				<input 
					type="text"
					name='description'
					placeholder='Enter description of habit'
					value={habitFields.description}
					onChange={handleChange} 
				/>
			</div>

			<button type='submit'>
				Add Habit
			</button>

			{ error && <p>{error}</p> }
			
		</form>
	)
}
