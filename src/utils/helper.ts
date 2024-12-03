
export function formatPercentage(percentage: number) {
    return percentage.toFixed(0) + '%'
}

export const countErrors = (actual: string, expected: string) => {
    const expectedChars = expected.split('')

    return expectedChars.reduce((errors, expectedChar, index) => {
        const actualChar = actual[index]
        return errors + (actualChar == expectedChar ? 0 : 1)
    }, 0)
}

export const calculateCorrectAccuracy =  (total: number, errors: number) => {
    if(total > 0) {
        const correct = total - errors
        return (correct / total) * 100
    }
    return 0
}