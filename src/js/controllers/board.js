import Square from "./../views/square";
import * as modeli from "./../models";
import * as navsViews from "./../views/base";
export default class ChessBoard {
    constructor() {
        this.board = "";
        this.boardMap = new Map();
        this.setNewBoard();
    }

    setNewBoard() {
        this.board = document.querySelector(".chessboardBox");
        var ind = [" ", "A", "B", "C", "D", "E", "F", "G", "H"];
        for (let i = 1; i < 9; i++) {
            let plus = i * 10;
            for (let j = 1; j < 9; j++) {
                let square = new Square(
                    plus + j,
                    `${(j + i) % 2 !== 0 ? "whiteBox" : "blackBox"}`,
                    `${ind[j]}${i}`,
                    this.board
                );
                this.boardMap.set(plus + j, square);
            }
        }
    }

    init() {
        navsViews.renderNav(this.board, document.querySelector(".boardPlace"));
        this.setPlayersByMap();
    }

    moveFigure(src, dest, player) {
        let response = {
            fallFigure: false,
            movement: '',
            finish: false
        };
        if (src.figure.player === player) {


            if (!src.figure.isMovePossible(src, dest, this.boardMap) || !this.pathMove(src, dest)) {
                if (dest.figure.specPower) {
                    src.changeFigure(src.figure);
                    dest.changeFigure(dest.figure);
                    response.finish = true;
                    response.movement = 'ROKADA';
                    console.log(response)
                    return response;
                }
                console.log(response)
                return response;
            } else {
                src.figure.firstMove = false;
                response.finish = true;
                response.movement = `[${src.name}]-${src.figure.figure}->[${dest.name}]-${src.figure.figure}`;
                if (dest.figure instanceof modeli.Figure) {
                    response.fallFigure = dest.figure;
                    response.movement = `[${src.name}]-${src.figure.figure}->[${dest.name}]-${dest.figure.figure}`;

                }
                dest.changeFigure(src.figure);
                src.changeFigure(undefined);
                console.log(response)
                return response;
            }
        }
        return response;
    }

    pathMove(src, dest) {
        let path = src.figure.pathToDest(src, dest).reverse();
        if (path.length === 0) {
            return true;
        }
        let move = path.some(
            (el) => this.boardMap.get(el).figure instanceof modeli.Figure
        );
        return !move;
    }

    setPlayersByMap() {
        let ten = 10;
        let eighty = 80;
        for (let i = 1; i < 9; i++) {
            this.boardMap.get(20 + i).changeFigure(new modeli.Pawn("white", 20 + i));
            this.boardMap.get(70 + i).changeFigure(new modeli.Pawn("black", 70 + i));
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
                this.boardMap.get(ten + i).changeFigure(new modeli.Queen("white"));
                this.boardMap.get(eighty + i).changeFigure(new modeli.Queen("black"));
            }
            if (i === 5) {
                this.boardMap.get(ten + i).changeFigure(new modeli.King("white"));
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