import { createContext, useEffect, useState } from 'react'
import type { ThemeType } from '../types/themeType'


interface IThemeContext {
	theme: ThemeType
	toggleTheme: () => void
}

interface IThemeState {
	children: React.ReactNode
}

export const ThemeContext = createContext<IThemeContext>({
	theme: "light",
	toggleTheme: () => {}
})

export default function ThemeState({children}: IThemeState) {

	const [theme, setTheme] = useState(() => {
		return (localStorage.getItem("theme") as ThemeType) || "light"
	})

	useEffect(() => {
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme(prev => prev === "light" ? "dark" : "light")
	}

	return (
		<ThemeContext.Provider 
			value={{ theme, toggleTheme }}
		>
			{children}
		</ThemeContext.Provider>
	)

}