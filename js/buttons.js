import {Selection} from "./functional-components/selection.js"
import {Charcheck} from "./functional-components/charcheck.js"

const buttonOk = document.getElementById("buttonOk")
const buttonCheck = document.getElementById("buttonCheck")
const checkbox = document.getElementById("checkbox")
const input = document.getElementById("input")
let key
const cellsCheck = {
    cellsCorrect: [],
    cellsWrong: []
}

buttonOk.onclick = () => {

    const enterWord = input.value
    const newLetter = enterWord.split('')

    newLetter.forEach((letter, index) => {
        console.log(Selection.getInstance())
        if (Selection.getInstance().horizontals !== undefined && Selection.getInstance().verticals !== undefined) {
            if (checkbox.checked) {
                Selection.getInstance().horizontals[index].textContent = newLetter[index]

            } else {
                Selection.getInstance().verticals[index].textContent = newLetter[index]
            }

        } else if (Selection.getInstance().verticals !== undefined) {
            Selection.getInstance().verticals[index].textContent = newLetter[index]

        } else if (Selection.getInstance().horizontals !== undefined) {
            Selection.getInstance().horizontals[index].textContent = newLetter[index]
        }
    })
    console.log(Selection.getInstance())

    key = `${Selection.getInstance().x},${Selection.getInstance().y},${Selection.getInstance().horizontals ? Direction.HORIZONTAL : Direction.VERTICAL}`
    Charcheck.getInstance()._dataMap.get(key).entered = enterWord.toString().toUpperCase()

    Charcheck.getInstance()._dataMap.get(key)
    if (Charcheck.getInstance()._dataMap.get(key).entered === Charcheck.getInstance()._dataMap.get(key).correct) {
        if (Selection.getInstance().verticals !== undefined) {
            cellsCheck.cellsCorrect.push(Selection.getInstance().verticals)
        } else {
            cellsCheck.cellsCorrect.push(Selection.getInstance().horizontals)
        }
    } else {
        if (Selection.getInstance().verticals !== undefined) {
            cellsCheck.cellsWrong.push(Selection.getInstance().verticals)
        } else {
            cellsCheck.cellsWrong.push(Selection.getInstance().horizontals)
        }

    }

    buttonCheck.onclick = () => {


        cellsCheck.cellsCorrect.forEach((checkedCells) => {
            checkedCells.forEach((e) => {
                e.classList.add('true')
            })
        })
        cellsCheck.cellsWrong.forEach((checkedCells) => {
            checkedCells.forEach((e) => {
                e.classList.add('false')
            })

        })
    }
    console.log(cellsCheck)


}

