import { indiaDate } from "./DateAndTime.js"

const addTimestamp = (jsonData) => {
    return {...jsonData, lastModified: indiaDate.timestamps}
}

export { addTimestamp }