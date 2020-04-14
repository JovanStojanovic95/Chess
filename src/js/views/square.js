export default class Square {
    constructor(id, colorClass, move, parent) {
        this.move = move;
        this.id = id;
        this.color = colorClass;
        this.figureImg = "";
        this.figure = {};
        this.setSquareView(parent);
    }
    getSquare() {
        return document.querySelector(`.square_${this.id}`);
    }
    setSquareView(parent) {
        let div = document.createElement('div');
        div.className = `${this.color} square_${this.id}`;
        div.move = this.move;
        div.id = this.id;
        div.ref = this;
        div.innerHTML = this.figureImg;
        parent.appendChild(div);
    }
    changeFigure(ob) {
        if (!ob) {
            this.figureImg = "";
            this.figure = {};
        } else {
            this.figureImg = ob.figure;
            this.figure = ob;
        }
        this.getSquare().innerHTML = this.figureImg;
    }


}