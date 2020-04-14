import Square from "./../views/square";
import * as modeli from './../models';
import * as navsViews from "./../views/base";
export default class ChessBoard {
    constructor() {
        this.board = "";
        this.boardSquares = [];
        this.fromMove;
        this.toMove;
        this.k = 0;
        this.setNewBoard();

    }
    restartMove() {
        this.fromMove = undefined;
        this.toMove = undefined;
        this.k = 0;
    }

    setNewBoard() {
        this.board = document.querySelector('.chessboardBox');
        var ind = [" ", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        var k = 1;
        for (let i = 1; i < 9; i++) {
            var k = -1;
            var k1 = 0;
            for (let j = 1; j < 5; j++) {
                k += 2;
                k1 += 2;
                let firstSquare = new Square(i * 10 + k, `${i % 2 === 0  ? "whiteBox" : "blackBox"}`, `${ind[k]}`, this.board);
                let secondSquare = new Square(i * 10 + k1, `${i % 2 === 0 ? "blackBox" : "whiteBox"}`, `${ind[k1]}`, this.board);
                this.boardSquares.push(firstSquare);
                this.boardSquares.push(secondSquare);



            }
        }
    }

    testHandler() {
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
                this.moveFigure(this.fromMove, this.toMove);

            } else {
                console.log("not yet");
            }

        });
    }
    init() {
        navsViews.renderNav(this.board, document.querySelector(".boardPlace"));
        this.testHandler();
        //this.boardSquares[11].changeFigure(new modeli.Queen('white'));
        //this.boardSquares[5].changeFigure(new modeli.Rock('white'));
        this.setPlayers();
    }

    moveFigure(src, dest) {

        let moves = this.boardSquares.filter(el => el === src || el === dest);
        if (moves[0] === moves[1] || moves.length !== 2 || !moves[0].figure || !src.figure.isMovePossible(src, dest) || this.testMoveSamePlayer(src, dest)) {
            this.restartMove();
            return false;
        } else if (true) {
            this.testJumpMove(src);
            let fallFigure = dest.figure
            dest.changeFigure(src.figure);
            src.changeFigure(undefined);
            this.restartMove();
            return fallFigure;
        }

    }
    testMoveSamePlayer(src, dest) {
        if (dest) {
            return src.figure.isSamePlayer(dest.figure.player);
        } else {
            return false;
        }
    }
    testJumpMove(src) {
        // console.log(src.ref.isMovePossible(src.dataset.id, dest.dataset.id))
        let positions = this.boardSquares.filter(el => {
            if (src.figure.isMovePossible(src, el)) { //&& el.figure === ""

                return el;
            }

        });


        console.log(src.id)
        console.log(positions);
    }

    setPlayers() {
        for (let i = 8; i <= 15; i++) {
            this.boardSquares[i].changeFigure(new modeli.Pawn('white'));
            this.boardSquares[i + 40].changeFigure(new modeli.Pawn('black'));
        }
        for (let i = 0; i < 8; i++) {
            if (i === 0 || i === 7) {
                this.boardSquares[i].changeFigure(new modeli.Rock('white'));
                this.boardSquares[i + 56].changeFigure(new modeli.Rock('black'));
            }
            if (i === 1 || i === 6) {
                this.boardSquares[i].changeFigure(new modeli.Horse('white'));
                this.boardSquares[i + 56].changeFigure(new modeli.Horse('black'));
            }
            if (i === 2 || i === 5) {
                this.boardSquares[i].changeFigure(new modeli.Bishop('white'));
                this.boardSquares[i + 56].changeFigure(new modeli.Bishop('black'));
            }
            if (i === 3) {
                this.boardSquares[i].changeFigure(new modeli.King('white'));
                this.boardSquares[i + 56 + 1].changeFigure(new modeli.King('black'));
            }
            if (i === 4) {
                this.boardSquares[i].changeFigure(new modeli.Queen('white'));
                this.boardSquares[i + 56 - 1].changeFigure(new modeli.Queen('black'));
            }
        }

    }
}