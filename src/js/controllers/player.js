import * as modeli from './../models';

export default class PlayerController {
    constructor(color, name) {
        this.name = name;
        this.color = color;
        this.moves = [];
        this.eatenFigure = [];
    }
    eat(figure) {
        if (ob) {
            this.eatenFigure.push(figure);
        }
    }


}