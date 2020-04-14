import * as modeli from './../models';

export default class PlayerController {
    constructor(color) {
        this.color = color;
        this.previusMove;
        this.moves = [];
        this.fallFigure = [];
        // this.setInitialPositions();
    }
    init() {

    }
    setInitialPositions() {
        var i;
        if (this.color === 'white') {
            i = 1;
        } else {
            i = 8;
        }
        for (let j = i; j < 9; j++) {
            let postion = document.querySelector(`.square_${i}${j}`);
            postion.ref = new modeli.Pawn(this.color);
            postion.innerHTML = `${postion.ref.figure}`;

        }
    }


}