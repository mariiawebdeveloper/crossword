function draw(field) {



    document.write('<div class="locationTable"><table id="field"></div>')
    for (let i = 0; i < field.height; i++) {
        document.write('<tr class="row">')
        for (let j = 0; j < field.width; j++) {
            document.write(`<td class="cell"><p class="cellText"></p></td>`)

        }

    }

}


draw(FIELD)


