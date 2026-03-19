import { useContext } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5"
import { ModalContext } from '../context/ModalContext'


interface IModal {
	title: string
	children: React.ReactNode
}

export default function Modal({title, children}:IModal) {

	const {onClose} = useContext(ModalContext)

	return (
		<div className='fixed top-0 left-0 right-0 bottom-0 bg-black/60'>
			<div className='w-[90%] max-w-150 min-w-90 p-5 bg-white text-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '>
				<h2 className='text-center text-xl mb-5'>{title}</h2>
				<IoCloseCircleOutline 
					className='text-xl absolute top-4 right-5 cursor-pointer hover:text-red-600 duration-150'
					onClick={onClose}
				/>
				{children}
			</div>
		</div>
	)
}
