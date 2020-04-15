import * as navsViews from '../views/base';

import ChessBoard from './board';
import CTRLPlayer from './player';
const board = new ChessBoard();

board.init();

//const player = new CTRLPlayer('white');
console.log("HEYYY");


class Game {
    constructor(name1, name2) {
        this.player1 = new CTRLPlayer('white', player1);
        this.player2 = new CTRLPlayer('black', player2);
    }
}