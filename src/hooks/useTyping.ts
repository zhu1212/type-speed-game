import { useCallback, useEffect, useRef, useState } from "react"

const isKeyAllowed = (code: string) => {
    return (code == 'Backspace' || code.startsWith('Key') || code.startsWith('Digit') || code == 'Space')
}
const useTyping = (enabled: boolean) => {
    const [typed, setTyped] = useState<string>('')
    const [cursor, setCursor] = useState<number>(0)
    const totalTyped = useRef<number>(0)

    const keydownHandler = useCallback(({key, code}: KeyboardEvent) => {
        if(!enabled || !isKeyAllowed(code)) return

        switch (key) {
            case 'Backspace':
                setTyped(prev => prev.slice(0,-1))
                setCursor(prev => prev-1)
                break
            default:
                setTyped(prev => prev.concat(key))
                setCursor(prev => prev+1)
                totalTyped.current +=1

        }
    },[])

    const clearTyped = () => {
        setTyped('')
        setCursor(0)
    }

    const resetTotalTyped = () => {
        totalTyped.current = 0
    }
    useEffect(() => {
        window.addEventListener('keydown', keydownHandler)
        return () => {
            window.removeEventListener('keydown', keydownHandler)
        }
    }, [keydownHandler])
    return {
        typed, cursor, clearTyped, resetTotalTyped, totalTyped: totalTyped.current
    }
}

export default useTyping;
