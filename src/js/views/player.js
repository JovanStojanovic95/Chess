export default class PlayerView {
    constructor(color, name, parent) {
        this.color = color;
        this.figureImg = "";
        this.name = name;
        this.parent = parent;
        this.setPlayerView(parent);
        this.setPlayer1View(parent);
    }

    setPlayerView(parent) {
        this.figures = document.createElement('h1');
        this.figures.className = `colWhite figures_${this.color}`
        this.figures.innerHTML = this.figureImg;
        parent.appendChild(this.figures);
    }

    setPlayer1View(parent) {
        this.div = document.createElement('h1');
        this.div.className = `colWhite _${this.color}`;
        this.div.innerHTML = this.name;
        parent.appendChild(this.div);
    }

    changeFigure(figures) {

        this.figures.innerHTML = this.figures.innerHTML + " " + figures.figure;
    }
}