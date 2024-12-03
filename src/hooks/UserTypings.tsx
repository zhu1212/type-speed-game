import Caret from "../components/Caret.tsx"

const UserTypings = ({
    userInput, 
    className,
    words
}: {
    userInput: string
    className?: string
    words: string
}) =>{
    const typedCharacters = userInput.split("")
    return(
        <div className={className}>
            {typedCharacters.map((char, index) =>{
                return <Character char={char} key={index} expected={words[index]} />
            })}
            <Caret></Caret>
        </div>

    )
}
const Character = ({char, expected}:{char: string, expected: string}) => {
    const isCorrect = char === expected
    const isWhiteSpace = expected === " "
    return <span className={cn({
        "text-red-500": !isCorrect && !isWhiteSpace,
        "text-green-500": isCorrect && !isWhiteSpace,
        "bg-red-500/50": !isCorrect && isWhiteSpace,
        "dark:text-red-500": !isCorrect && !isWhiteSpace,
        "dark:text-primary-500": isCorrect && !isWhiteSpace,
        "dark:bg-red-500/50": !isCorrect && isWhiteSpace,

    })}
    >
        {expected}
    </span>
}
 function cn(classes: { [key: string]: boolean}) {
    return Object.entries(classes)
    .filter(([, value]) => value)
    .map(([key])=> key)
    .join(" ")

 }
export default UserTypings