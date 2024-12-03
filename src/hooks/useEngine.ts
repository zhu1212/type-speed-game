import { useCallback, useEffect, useState } from "react"
import useWords from "./useWords"
import useCountdownTimer from "./useCountdownTimer"
import { countErrors } from "../utils/helper"
import useTyping from "./useTyping"

export type State = 'start' | 'run' | 'finish'
const initialTime = 30

const useEngine = () => {
    const [state, setState] = useState<State>("start")
    const [countdownSeconds, setCountdownseconds] = useState(0)
    const {timeLeft, resetCountdown, startCountdown} = useCountdownTimer(initialTime)
    const { typed, resetTotalTyped, clearTyped, totalTyped, cursor } = useTyping(state != 'finish')
    const [errors, setErrors] = useState(0)

    const { words, updateWords } = useWords(6)
    const areWordsFinished = cursor == words.length
    const restart = () => {
        resetCountdown()
        resetTotalTyped()
        setState('start')
        updateWords()
        clearTyped()
        setErrors(0)
        
    }

    const sumErrors = useCallback(() => {
        const wordsReached = words.substring(0, Math.min(words.length, totalTyped))
        setErrors(prevErrors => prevErrors + countErrors(typed, wordsReached))
    }, [typed, words, totalTyped])

    useEffect(() => {
        if(state == 'start' && cursor > 0) {
            setState('run')
            startCountdown()
        }
    }, [state, startCountdown, cursor])
    
    useEffect(() => {
        if(timeLeft == 0 && state =='run'){
            setState('finish')
            sumErrors()
            setCountdownseconds(0)
        }
    }, [timeLeft, state, sumErrors])

    useEffect(() => {
        if(areWordsFinished){
            updateWords()
            clearTyped()
            sumErrors()
        }
    }, [areWordsFinished, updateWords, clearTyped, sumErrors])
    return {state, words, updateWords, timeLeft, typed, errors, totalTyped, restart, setCountdownseconds}
}

export default useEngine