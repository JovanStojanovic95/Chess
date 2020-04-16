import * as navsViews from '../views/base';

import ChessBoard from './board';
import PlayerController from './player';

const player = new PlayerController('white', 'jova', 3000);
console.log("HEYYY");


class Game {
    constructor(name1, name2, lap) {
        this.newGame(name1, name2, lap);
    }

    newGame(name1, name2, lap) {
        this.players = [new PlayerController('white', name1, lap), new PlayerController('black', name2, lap)];
        this.board = new ChessBoard();
        this.activePlayer = 'white';
        this.board.init();
        this.fromMove;
        this.toMove;
        this.k = 0;
        this.boardHandler()
        console.log(this.players);
    }
    restartMove() {
        this.fromMove = undefined;
        this.toMove = undefined;
        this.k = 0;
    }

    endPhase() {
        let res = this.board.moveFigure(this.fromMove, this.toMove, this.activePlayer);
        if (res.finish) {
            this.players[this.activePlayer === 'white' ? 0 : 1].eat(res.fallFigure);
            this.players[this.activePlayer === 'white' ? 0 : 1].nextMove(res.movement);
            this.activePlayer === 'white' ? this.activePlayer = 'black' : this.activePlayer = 'white';
        }
        console.log(this.players);

    }

    boardHandler() {
        document.querySelector(".chessboardBox").addEventListener("click", (e) => {
            if (this.k % 2 === 0) {
                this.fromMove = e.target.ref;
                if (!this.fromMove.figureImg) {
                    this.restartMove();
                    return;
                }
            } else {
                this.toMove = e.target.ref;
            }
            this.k++;
            if (this.toMove && this.fromMove) {
                this.endPhase(this.fromMove, this.toMove);
                this.restartMove();
            }
        });
    }
}

const app = new Game("jovan", "aleksa", 0);