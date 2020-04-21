import ChessBoard from "./board";
import PlayerController from "./player";

class Game {
    constructor(name1, name2, parent) {
        this.newGame(name1, name2, parent);
    }

    newGame(name1, name2, lap) {
        alert("New Game Start!");
        this.lap = lap;
        this.time = this.lap;
        let player0 = document.querySelector(".player0");
        let player1 = document.querySelector(".player1");
        this.players = [
            new PlayerController("white", name1, player0),
            new PlayerController("black", name2, player1),
        ];
        this.board = new ChessBoard();
        this.activePlayer = "white";
        this.fromMove;
        this.toMove;
        this.k = 0;
        this.boardHandler();
        this.timer = this.timerOn();
        this.activePlayerView(this.activePlayer);
    }

    restartMove() {
        this.fromMove = undefined;
        this.toMove = undefined;
        this.k = 0;
    }

    endPhase() {
        let index;
        this.activePlayer === "white" ? (index = 0) : (index = 1);
        let res = this.board.moveFigure(
            this.fromMove,
            this.toMove,
            this.activePlayer
        );
        if (res.finish) {
            this.timerOff();
            this.lap = this.time;
            this.timer = this.timerOn();
            if (res.endGame) {
                alert("Game end!");
                this.players[index].playerlose();
                this.timerOff();
                location.reload();
                return;
            }
            this.players[index].eat(res.fallFigure);
            this.players[index].nextMove(res.movement);
            this.activePlayer === "white" ?
                (this.activePlayer = "black") :
                (this.activePlayer = "white");
            this.activePlayerView(this.activePlayer);
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

    timerOn() {
        if (this.lap) {
            return setInterval(() => {
                var distance = this.lap--;
                document.querySelector("#timer").innerHTML = distance;
                if (distance < 0) {
                    clearInterval(this.timer);
                    document.querySelector("#timer").innerHTML = "EXPIRED";
                    let index;
                    this.activePlayer === "white" ? (index = 0) : (index = 1);
                    alert("Game end!");
                    this.players[index].playerlose();
                    location.reload();
                }
            }, 1000);
        }
    }

    timerOff() {
        if (this.lap) {
            clearInterval(this.timer);
        }
    }

    activePlayerView(player) {
        document.querySelector(
            ".player_turn"
        ).innerHTML = `${player.toUpperCase()} Player turn!`;
    }
}

const app = new Game("Player 1", "Player 2");