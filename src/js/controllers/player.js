import * as modeli from './../models';
import PlayerView from "./../views/player";

export default class PlayerController {
    constructor(color, name, parent) {
        this.name = name;
        this.color = color;
        this.moves = [];
        this.eatenFigure = [];
        this.lose = false;
        this.parent = parent;
        this.view = new PlayerView(this.color, this.name, parent);

    }
    eat(figure) {

        if (figure instanceof modeli.Figure) {
            this.view.changeFigure(figure);
            this.eatenFigure.push(figure);
        }
    }
    nextMove(move) {
        this.moves.push(move);
    }

    playerlose() {

        alert(`Player ${this.name} Lose`);

    }
    clearAll() {
        this.parent.innerHTML = "";
    }




}