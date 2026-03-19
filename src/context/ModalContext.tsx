import { createContext, useState } from 'react'


interface IModalContext {
	modal: boolean
	onClose: () => void
	open: () => void
}

interface IModalState {
	children: React.ReactNode
}

export const ModalContext = createContext<IModalContext>({
	modal: false,
	onClose: () => {},
	open: () => {}
})

export default function ModalState({children}: IModalState) {

	const [modal, setModal] = useState(false)

	const onClose = () => {
		setModal(false)
	}

	const open = () => {
		setModal(true)
	}

	return (
		<ModalContext.Provider 
			value={{ modal, onClose, open }}
		>
			{children}
		</ModalContext.Provider>
	)

}