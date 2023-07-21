class Selection {

    static getInstance() {
        this.instance = new Selection()
        this.getInstance = () => this.instance
        return this.instance
    }

    get horizontals() {
        return this._horizontals
    }

    set horizontals(value) {
        this._horizontals = value
    }

    get verticals() {
        return this._verticals
    }

    set verticals(value) {
        this._verticals = value
    }

    set x(selectionX){
        this._x = selectionX
    }
    set y(selectionY){
        this._y = selectionY
    }

    get x(){
        return this._x
    }

    get y(){
        return this._y
    }

}


export {
    Selection
}
