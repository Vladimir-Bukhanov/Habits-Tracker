import { useContext, useState } from 'react'
import { ModalContext } from '../context/ModalContext'

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

	const { onClose } = useContext(ModalContext)

	const handleSubmit = (e: React.FormEvent) => {

		e.preventDefault()

		if (
			habitFields.title.trim() === ""  
		) {
			setError('Enter title...')
			return
		}

		if (habitFields.category.trim() === "") {
			setError('Enter category...')
			return
		}

		if (habitFields.category.trim() === "" ||
			habitFields.title.trim() === ""
		) {
			setError('Enter category and title...')
			return
		}

		addHabit(habitFields)
		setHabitFields(initialState)
		onClose()
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
					className='outline-0 block w-full text-black border mb-3 px-2'
					placeholder='Enter title of habit'
					value={habitFields.title}
					onChange={handleChange} 
				/>
				<input 
					type="text"
					name='category'
					className='outline-0 block w-full text-black border mb-3 px-2'
					placeholder='Enter category of habit'
					value={habitFields.category}
					onChange={handleChange} 
				/>
				<input 
					type="text"
					name='description'
					className='outline-0 block w-full text-black border mb-3 px-2'
					placeholder='Enter description of habit'
					value={habitFields.description}
					onChange={handleChange} 
				/>
			</div>

			<button 
				className='border px-2 cursor-pointer hover:bg-gray-200 duration-200 mb-3'
				type='submit'
			>
				Add Habit
			</button>

			{ error && <p className='text-red-600'>{error}</p> }
			
		</form>
	)
}
