let input = document.getElementById("input")
const rusLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
const rusUpper = rusLower.toUpperCase()
const enLower = 'abcdefghijklmnipqrstuvwxyz'
const num = '0123456789'
const enUpper = enLower.toUpperCase()
const rus = rusLower + rusUpper
const en = enLower + enUpper
const getChar = (event) => String.fromCharCode(event.keyCode || event.charCode)
input.addEventListener('keypress', function (e) {
    const char = getChar(e)
    if (rus.includes(char)) {
        console.log('r')
    } else if (en.includes(char) ) {
        document.getElementById('input').setAttribute("disabled", true)
        setTimeout(function (){alert('вы ввели слово на инглише')}, 500)
        setTimeout(function (){document.getElementById('input').removeAttribute("disabled", true)}, 1500)
        input.value = ''
    } else if (num.includes(char)){
        document.getElementById('input').setAttribute("disabled", true)
        setTimeout(function (){alert('вы ввели не слово, а цифры')}, 500)
        setTimeout(function (){document.getElementById('input').removeAttribute("disabled", true)}, 1500)
        input.value = ''
    } else{
        console.log('myaw')
    }
})
