export default class Square {
    constructor(id, colorClass, name, parent) {
        this.id = id;
        this.color = colorClass;
        this.figureImg = "";
        this.figure = {};
        this.setSquareView(parent);
        this.name = name;
        this.ref;
    }

    setSquareView(parent) {
        this.div = document.createElement('div');
        this.div.className = this.color;
        this.div.ref = this;
        this.div.innerHTML = this.figureImg;
        parent.appendChild(this.div);
    }

    changeFigure(ob) {
        if (!ob) {
            this.figureImg = "";
            this.figure = {};
        } else {
            this.figureImg = ob.figure;
            this.figure = ob;
        }
        this.div.innerHTML = this.figureImg;
    }

    haveFigure() {
        return Object.keys(this.figure).length !== 0;
    }
}