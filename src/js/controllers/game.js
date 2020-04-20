import * as navsViews from '../views/base';

import ChessBoard from './board';
import PlayerController from './player';

let player0 = document.querySelector(".player0");
let player1 = document.querySelector(".player1");
let boardHtml = document.querySelector('.chessboardBox');
class Game {
    constructor(name1, name2, parent) {
        this.newGame(name1, name2, parent);
    }

    newGame(name1, name2, lap) {
        this.lap = lap;

        let player0 = document.querySelector(".player0");
        let player1 = document.querySelector(".player1");
        this.players = [new PlayerController('white', name1, player0), new PlayerController('black', name2, player1)];
        this.board = new ChessBoard();
        this.activePlayer = 'white';
        this.board.init();
        this.fromMove;
        this.toMove;
        this.k = 0;
        this.boardHandler();

    }
    restartMove() {
        this.fromMove = undefined;
        this.toMove = undefined;
        this.k = 0;
    }

    endPhase() {
        let index;
        this.activePlayer === 'white' ? index = 0 : index = 1;
        let res = this.board.moveFigure(this.fromMove, this.toMove, this.activePlayer);
        // console.log(res);
        if (res.finish) {
            if (res.endGame) {
                alert("Game end!")
                this.players[index].playerlose();
                boardHtml.innerHTML = "";
                this.players.forEach(el => {
                    el.clearAll();
                })
                this.newGame('Player 1', "Player 2");
                return;
            }
            this.players[index].eat(res.fallFigure);
            this.players[index].nextMove(res.movement);
            this.activePlayer === 'white' ? this.activePlayer = 'black' : this.activePlayer = 'white';
        }
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


const app = new Game("Player 1", "Player 2");