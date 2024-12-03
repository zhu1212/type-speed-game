import './App.css'
import RestartButton from "./components/RestartButton"
import Results from "./components/Results"
import UserTypings from "./hooks/UserTypings"
import useEngine from "./hooks/useEngine"
import { DarkModeToggle} from "./components/DarkModeToggle"
import { calculateCorrectAccuracy } from './utils/helper'


function App() {
  const {state, words, updateWords, timeLeft, typed, errors, totalTyped, restart, setCountdownseconds} = useEngine()
  return (
    <>
    <DarkModeToggle />
    <CountdownTimer timeLeft={timeLeft}/>
    <WordsContainer>
      <GenerateWords words = {words}/>
      <UserTypings userInput={typed} className="absolute inset-0" words ={words}/>
    </WordsContainer>

    <RestartButton 
      className={"mx-auto mt-10 text-slate-400"} 
      onRestart={restart}/>
      <Results 
        errors={errors}
        state={state}
        accuracyPercentage={calculateCorrectAccuracy(totalTyped, errors)}
        total={totalTyped}
        className="mt-10"    
         />
    </>
  )
}

const WordsContainer =({ children }: { children: React.ReactNode }) =>{
  return (
  <div className="relative text-3xl max-w-xl leading-relaxed break-all">
    {children}
  </div>
  )
}
const GenerateWords = ({words}: {words:string}) =>{
  return <div className="dark:text-slate-500 text-black">{words}</div>
}
const CountdownTimer = ({ timeLeft }: { timeLeft: number }) =>{
  return <h2 className=" dark:text-primary-300 text-green-500 font-medium mb-3">Time: {timeLeft}</h2>
}
export default App
