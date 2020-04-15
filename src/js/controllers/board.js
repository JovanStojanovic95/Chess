import Square from "./../views/square";
import * as modeli from "./../models";
import * as navsViews from "./../views/base";
export default class ChessBoard {
    constructor() {
        this.board = "";
        this.fromMove;
        this.toMove;
        this.k = 0;
        this.boardMap = new Map();
        this.setNewBoard();
    }
    restartMove() {
        this.fromMove = undefined;
        this.toMove = undefined;
        this.k = 0;
    }

    setNewBoard() {
        this.board = document.querySelector(".chessboardBox");
        var ind = [" ", "A", "B", "C", "D", "E", "F", "G", "H"];
        for (let i = 1; i < 9; i++) {
            let plus = i * 10;
            for (let j = 1; j < 9; j++) {
                let square = new Square(plus + j, `${(j+i) % 2 !== 0 ? "whiteBox" : "blackBox"}`,
                    `${ind[j]}${i}`,
                    this.board)
                this.boardMap.set(plus + j, square);
            }

        }
    }

    testHandler() {
        document.querySelector(".chessboardBox").addEventListener("click", (e) => {
            console.log(e.target.ref);
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
        this.setPlayersByMap();
        this.testHandler()
    }

    moveFigure(src, dest) {
        if (
            !src.figure.isMovePossible(src, dest) ||
            this.testMoveSamePlayer(src, dest) ||
            !this.testJumpMove(src, dest)
        ) {
            this.restartMove();
            return false;
        } else if (true) {
            let fallFigure = dest.figure;
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

    test() {
        // console.log(src.ref.isMovePossible(src.dataset.id, dest.dataset.id))
        let mapPos;
        /*let positions = this.boardSquares.filter((el) => {
            if (src.figure.isMovePossible(src, el)) {
                //&& el.figure === ""

                return el;
            }
        });*/
    }
    testJumpMove(src, dest) {
        let path = src.figure.pathToDest(src, dest).reverse();
        if (path.length === 0) {
            return true;
        }
        let move = path.some(el => this.boardMap.get(el).figure instanceof modeli.Figure);
        return !move;
    }

    setPlayersByMap() {
        let ten = 10;
        let eighty = 80;
        for (let i = 1; i < 9; i++) {
            this.boardMap.get(20 + i).changeFigure(new modeli.Pawn("white"));
            this.boardMap.get(70 + i).changeFigure(new modeli.Pawn("black"));
            if (i === 1) {
                this.boardMap.get(ten + i).changeFigure(new modeli.Rock("white"));
                this.boardMap.get(eighty + i).changeFigure(new modeli.Rock("black"));
            }
            if (i === 2) {
                this.boardMap.get(ten + i).changeFigure(new modeli.Horse("white"));
                this.boardMap.get(eighty + i).changeFigure(new modeli.Horse("black"));
            }
            if (i === 3) {
                this.boardMap.get(ten + i).changeFigure(new modeli.Bishop("white"));
                this.boardMap.get(eighty + i).changeFigure(new modeli.Bishop("black"));
            }
            if (i === 4) {
                this.boardMap.get(ten + i).changeFigure(new modeli.King("white"));
                this.boardMap.get(eighty + i).changeFigure(new modeli.Queen("black"));
            }
            if (i === 5) {

                this.boardMap.get(ten + i).changeFigure(new modeli.Queen("white"));
                this.boardMap.get(eighty + i).changeFigure(new modeli.King("black"));
            }
            if (i === 6) {
                this.boardMap.get(ten + i).changeFigure(new modeli.Bishop("white"));
                this.boardMap.get(eighty + i).changeFigure(new modeli.Bishop("black"));
            }
            if (i === 7) {
                this.boardMap.get(ten + i).changeFigure(new modeli.Horse("white"));
                this.boardMap.get(eighty + i).changeFigure(new modeli.Horse("black"));
            }
            if (i === 8) {
                this.boardMap.get(ten + i).changeFigure(new modeli.Rock("white"));
                this.boardMap.get(eighty + i).changeFigure(new modeli.Rock("black"));
            }

        }

    }
}