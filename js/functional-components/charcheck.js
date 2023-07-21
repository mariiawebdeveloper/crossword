class Charcheck {
    static getInstance() {
        this.instance = new Charcheck()
        this.getInstance = () => this.instance
        return this.instance
    }

    constructor() {
        this._dataMap = new Map()
    }

    set (key, value){
        this._dataMap.set(key, value)
    }

    clear(){
        this._dataMap.clear()
    }


}

export {
    Charcheck
}