import { useContext, useEffect } from 'react'
import { ThemeContext } from './context/ThemeContext'


export default function App() {

  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    document.body.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <>
      <h1>
        Habits Tracker
      </h1>
      <button
        className={`border mt-5 px-3 cursor-pointer ${theme === "light" ? "hover:bg-blue-200" : "hover:bg-blue-700"}`}
        onClick={toggleTheme}
      >
        Change Theme
      </button>
    </>
  )
}

