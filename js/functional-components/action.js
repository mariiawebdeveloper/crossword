import {Selection} from "./selection.js";
import {Charcheck} from "./charcheck.js";

function generateField(field) {
    const [horizontals, verticals] = [field.horizontals, field.verticals]
    const matrix = new Array(field.height).fill(null)
        .map(() => new Array(field.width))
    horizontals.forEach((word) => {
        const [w, x, y] = Object.values(word)

        w.split('')
            .forEach((letter, index) => {
                matrix[y][x + index] = {
                    letter: letter,
                    indexHorizontal: index,
                    wordHorizontal: w,
                    direction: Direction.HORIZONTAL
                }
            })


    })
    verticals.forEach((word) => {
        let [w, x, y] = Object.values(word)
        w.split('')
            .forEach((letter, index) => {
                if (matrix[y + index][x] === undefined) {
                    matrix[y + index][x] = {
                        letter: letter,
                        indexVertical: index,
                        wordVertical: w,
                        direction: Direction.VERTICAL,
                    }

                } else {
                    matrix[y + index][x].indexVertical = index
                    matrix[y + index][x].wordVertical = w
                    matrix[y + index][x].direction = Direction.CROSSED_LINES

                }
            })

    })

    horizontals.forEach((word) => {
        const direction = Direction.HORIZONTAL
        const key = `${word.x},${word.y},${direction}`
        const value = {
            correct: word.w,
            entered: null,
            check: false
        }
        Charcheck.getInstance().set(key, value)
    })
    verticals.forEach((word) => {
        const direction = Direction.VERTICAL
        const key = `${word.x},${word.y},${direction}`
        const value = {
            correct: word.w,
            entered: null,
        }
        Charcheck.getInstance().set(key, value)
    })
    console.log(Charcheck.getInstance())

    function untouched() {
        let selection = Selection.getInstance();

        if (selection.horizontals !== undefined) {
            selection.horizontals.forEach((selectedCell) => {

                selectedCell.style.background = DEFAULT_EMPTY_CELL_BACKGROUND_COLOR;
            })
            selection.horizontals = undefined

        } else if (selection.verticals !== undefined) {
            selection.verticals.forEach((selectedCell) => {

                selectedCell.style.background = DEFAULT_EMPTY_CELL_BACKGROUND_COLOR;

            })

        }
        selection.horizontals = undefined
        console.log(selection)
    }

    Array.from(document.getElementsByClassName("cell"))
        .forEach((cell, index, cells) => {
                let [x, y] = [index % field.width, Math.floor(index / field.height)]
                let letter = matrix[y][x]
                if (letter === undefined) {
                    cell.style.backgroundColor = DEFAULT_CELL_BACKGROUND_COLOR;
                    cell.onclick = () => untouched();
                    return
                } else {
                    cell.classList.add('word')
                }


                let boardedCellsHorizontal = (letter.wordHorizontal === undefined ? undefined : new Array(letter.wordHorizontal.length))
                let boardedCellsVertical = (letter.wordVertical === undefined ? undefined : new Array(letter.wordVertical.length))

                if (boardedCellsHorizontal !== undefined) {
                    for (let i = 0; i < boardedCellsHorizontal.length; i++) {
                        boardedCellsHorizontal[i] = cells[y * field.width + x - letter.indexHorizontal + i]
                    }
                }
                if (boardedCellsVertical !== undefined) {
                    for (let i = 0; i < boardedCellsVertical.length; i++) {
                        boardedCellsVertical[i] = cells[(y - letter.indexVertical + i) * field.width + x]
                    }

                }


                cell.onclick = () => {
                    console.log(matrix[y][x])

                    Selection.getInstance().x = letter.indexHorizontal === undefined ? x : x - letter.indexHorizontal
                    Selection.getInstance().y = letter.indexVertical === undefined ? y : y - letter.indexVertical


                    if (Selection.getInstance().horizontals !== undefined) {
                        Selection.getInstance().horizontals.forEach((boardedCell) => {

                            boardedCell.style.backgroundColor = DEFAULT_CELL_BACKGROUND_COLOR


                        })
                    }
                    if (Selection.getInstance().verticals !== undefined) {
                        Selection.getInstance().verticals.forEach((boardedCell) => {
                            boardedCell.style.backgroundColor = DEFAULT_CELL_BACKGROUND_COLOR
                        })
                    }

                    if (boardedCellsVertical !== undefined) {
                        boardedCellsVertical.forEach((boardedCellVertical) => {
                            document.getElementById('checkbox').setAttribute('disabled', true)
                            boardedCellVertical.style.backgroundColor = SELECTED_CELL_BACKGROUND_COLOR
                        })
                    } else {
                        boardedCellsHorizontal.forEach((boardedCellHorizontal) => {
                            document.getElementById('checkbox').setAttribute('disabled', true)
                            boardedCellHorizontal.style.backgroundColor = SELECTED_CELL_BACKGROUND_COLOR
                        })

                    }


                    Selection.getInstance().horizontals = boardedCellsHorizontal
                    Selection.getInstance().verticals = boardedCellsVertical


                    if (letter.direction === Direction.CROSSED_LINES) {


                        boardedCellsHorizontal.forEach((boardedCellVertical) => {
                            document.getElementById('checkbox').removeAttribute('disabled', true)
                            boardedCellVertical.style.backgroundColor = SELECTED_CELL_BACKGROUND_COLOR

                        })
                        boardedCellsVertical.forEach((boardedCellHorizontal) => {

                            document.getElementById('checkbox').removeAttribute('disabled', true)
                            boardedCellHorizontal.style.backgroundColor = DEFAULT_CROSSED_CELL_BACKGROUND_COLOR
                            cell.style.backgroundColor = "#ff6781"
                        })
                    }

                }
                cell.addEventListener('click', readCell)
            function readCell() {


                if (matrix[y][x].direction === "HORIZONTAL") {

                    const textHorizontal = matrix[y][x].wordHorizontal
                    const utterance = new SpeechSynthesisUtterance(textHorizontal)
                    utterance.lang = "ru-RU";
                    window.speechSynthesis.speak(utterance)
                }else {
                    const textVertical = matrix[y][x].wordVertical
                    const utterance = new SpeechSynthesisUtterance(textVertical)
                    utterance.lang = "ru-RU";
                    window.speechSynthesis.speak(utterance)
                }

            }

            }
        )
}
function cleanField(){
    [...document.getElementsByClassName('word')].forEach(element =>{
        element.classList.remove('word','true','false')
        element.textContent=''
    })

}

generateField(FIELD)
const buttonGenerate = document.getElementById("buttonGenerate")

buttonGenerate.onclick = () => {

    Charcheck.getInstance().clear()
    cleanField()
    async function fetchRandomWords() {

        return await (await fetch(`https://random-word-api.herokuapp.com/word?number=10`)
            .then(response => response))
            .json()

    }

    fetchRandomWords().then(words => fetchData(words))
        .catch((reason) => alert(reason))

    async function fetchData(words) {

        (await fetch(`https://crossword.worddict.net/?words=${words}`)
            .then(response => response))
            .json()
            .then(data => {
                generateField(data), console.log(data)
            })
    }

}
