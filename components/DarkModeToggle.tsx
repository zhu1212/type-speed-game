import useDarkMode from "./useDarkMode"
import { MdDarkMode } from "react-icons/md"
import { CiLight } from "react-icons/ci"
import { useRef } from "react"

export const DarkModeToggle = () =>{
    const { isDark, setIsDark} = useDarkMode()
    const toggleRef = useRef<HTMLButtonElement>(null)


    const handleToggleClick = () =>{
        toggleRef.current?.blur()
        setIsDark(!isDark)
    }

    return (
    <button 
    ref={toggleRef}
        className="w-4 h-5 absolute top-4 right-4 dark:text-slate-400" 
        onClick={handleToggleClick} 
    >
        {isDark ? <MdDarkMode/> : <CiLight/>}

    </button>
    )
}