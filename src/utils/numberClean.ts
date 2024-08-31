export const numberClean = (raw: string): string => {
    //Mute +3400000 
    const number = raw.toLowerCase().replace('bot', '').replace(/\s/g, '').replace('+', '')
    // 3400000
    if (number.length === 9)
        return '51' + number

    return number
}