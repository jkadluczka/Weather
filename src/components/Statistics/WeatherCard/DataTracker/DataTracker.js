export class DataTracker {
    constructor(){
        this.data = []
    }

    insert = (value) => {
        this.data.push(value);
        this.data.sort((a, b) => { return a - b })
    }

    showMin = () => {
        return this.data[0]
    }

    showMax = () => {
        return this.data[this.data.length - 1]
    }

    showMean = () => {
        return Number(this.data.length > 0 && this.data.reduce((acc, value) => {
            return acc + value
        }) / this.data.length).toFixed(2)
    }

    showMode = () => {
        return this.data[Math.round(this.data.length / 2)]
    }
}
