import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import type { FilterBtnType } from '../types/filterBtnType'

interface IFilterBtn {
	current: FilterBtnType
	onFilter: (filterBtn: FilterBtnType) => void
}

export default function FilteredButtons({current, onFilter}: IFilterBtn) {

	const {theme} = useContext(ThemeContext)

	return (
		<div className='mb-3'>
			{(["All", "Completed today", "Not completed today"] as FilterBtnType[]).map(btn => (
				<button
					key={btn}
					className={`px-2 mr-3 border 	cursor-pointer ease duration-200 
					${theme === "light" && current === btn ? "bg-blue-200" : ""}
					${theme === "dark" && current === btn ? "bg-blue-700" : ""}
					`}
					onClick={() => onFilter(btn)}
				>
					{btn}
				</button>
			))}
		</div>
	)
}
