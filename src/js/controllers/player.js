import * as modeli from './../models';

export default class PlayerController {
    constructor(color, name, time) {
        this.name = name;
        this.color = color;
        this.moves = [];
        this.eatenFigure = [];
        this.timer;
        this.time = time;
        this.lose = false;
    }
    eat(figure) {
        if (figure instanceof modeli.Figure) {
            this.eatenFigure.push(figure);
        }
    }
    nextMove(move) {
        this.moves.push(move);
    }
    timerOn() {
        this.timer = setTimeout(() => {
            this.lose = true;
            alert(`Player ${this.name} Lose`);
        }, this.timer);
    }
    timerOff() {
        clearTimeout(this.timer);
    }
    playerlose() {
        return this.lose;
    }


}