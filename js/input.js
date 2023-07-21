const DEFAULT_CELL_BACKGROUND_COLOR = getPropertyValue("--default-cell-color")

const SELECTED_CELL_BACKGROUND_COLOR = getPropertyValue("--selected-cell-background-color")

const DEFAULT_EMPTY_CELL_BACKGROUND_COLOR = getPropertyValue("--selected-empty-cell-background-color")

const DEFAULT_CROSSED_CELL_BACKGROUND_COLOR = getPropertyValue("--default-crossed-cell-background-color")

let FIELD = {
    "width":20,"height":20,
    "horizontals":
        [
            {"w":"ОБОЗ","x":8,"y":9},
            {"w":"АМБАР","x":4,"y":10},
            {"w":"ГРАММ","x":2,"y":13},
            {"w":"ЛАДАН","x":10,"y":11},
            {"w":"НАБОР","x":0,"y":11},
            {"w":"ОЗНОБ","x":13,"y":8},
            {"w":"РЕДИС","x":14,"y":13},
            {"w":"СОВЕТ","x":15,"y":6},
            {"w":"АЛТАРЬ","x":11,"y":15},
            {"w":"АТЕИСТ","x":2,"y":6},
            {"w":"ЖЕЛЕЗО","x":11,"y":4},
            {"w":"ЗАПРЕТ","x":4,"y":2},
            {"w":"МНЕНИЕ","x":1,"y":16},
            {"w":"ОСАДКИ","x":4,"y":18},
            {"w":"ПОКРОВ","x":1,"y":4},
            {"w":"РОМАНС","x":8,"y":0},
            {"w":"АГРОНОМ","x":11,"y":17},
            {"w":"ВТОРНИК","x":13,"y":2}
        ],"verticals":
        [
            {"w":"ОРЕЛ","x":8,"y":9},
            {"w":"ЯЗВА","x":11,"y":8},
            {"w":"АРКАН","x":4,"y":10},
            {"w":"МОЛВА","x":13,"y":7},
            {"w":"НОРМА","x":14,"y":11},
            {"w":"ОЛОВО","x":16,"y":4},
            {"w":"СКАРБ","x":6,"y":6},
            {"w":"ТАПИР","x":17,"y":10},
            {"w":"АРЕНДА","x":0,"y":8},
            {"w":"ГАЛОШИ","x":5,"y":1},
            {"w":"ЖИЛИЩЕ","x":18,"y":1},
            {"w":"МАНЕРА","x":6,"y":13},
            {"w":"НАЧАЛО","x":11,"y":14},
            {"w":"ОСМОТР","x":1,"y":14},
            {"w":"РВЕНИЕ","x":8,"y":0},
            {"w":"ТЕЛЕГА","x":19,"y":6},
            {"w":"АКРОБАТ","x":2,"y":1},
            {"w":"КЛАССИК","x":9,"y":13}
        ]
}

function getPropertyValue(propertyName) {
    return getComputedStyle(
        document.querySelector(":root"))
        .getPropertyValue(propertyName)
}