class GlobalData {
    constructor() {
        if (!GlobalData.instance) {
            this.data = {}; 
            GlobalData.instance = this;
        }
        return GlobalData.instance;
    }

    setData(key, value) {
        this.data[key] = value;
    }

    getData(key) {
        return this.data[key];
    }
}

const instance = new GlobalData();
Object.freeze(instance);
module.exports = instance;
