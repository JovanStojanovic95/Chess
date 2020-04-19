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
            movement: "",
            finish: false,
        };
        if (src.figure.player === player) {
            if (src.id === dest.id) {
                return response;
            }
            if (this.testingChess(src.figure.player) && this.testingChess(src.figure.player)) {
                console.log('end game')
            }
            if (
                !src.figure.isMovePossible(src, dest, this.boardMap) ||
                !this.pathMove(src, dest)
            ) {
                if (dest.figure.specPower) {
                    src.changeFigure(src.figure);
                    dest.changeFigure(dest.figure);
                    response.finish = true;
                    response.movement = "ROKADA";
                    return response;
                }
                return response;
            } else {
                src.figure.firstMove = false;
                response.finish = true;
                response.movement = `[${src.name}]-${src.figure.figure}->[${dest.name}]-${src.figure.figure}`;
                if (dest.figure instanceof modeli.Figure) {
                    response.fallFigure = dest.figure;
                    response.movement = `[${src.name}]-${src.figure.figure}->[${dest.name}]-${dest.figure.figure}`;
                }
                if (src.figure instanceof modeli.King && src.figure.player === player) {
                    src.figure.square = dest.id;
                }

                dest.changeFigure(src.figure);
                src.changeFigure(undefined);
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

    testingChess(player) {
        let king;
        player === 'white' ? king = this.whiteKing : king = this.blackKing;
        let kingSquere = this.boardMap.get(king.square);
        this.boardMap.forEach(el => {
            if (el.figure instanceof modeli.Figure) {
                if (el.figure.player !== player) {
                    if (!el.figure.isMovePossible(el, kingSquere, this.boardMap) ||
                        !this.pathMove(el, kingSquere)) {

                    } else {
                        alert("Sah");
                        let sahMat = this.testing(player);
                    }
                }
            }
            return false;
        })

    }
    haveFigure(square) {
        if (this.boardMap.get(square)) {
            if (this.boardMap.get(square).figure instanceof modeli.Figure) {
                return true;
            }
        }
        return false;
    }

    testing(player) {
        console.log("TESTING")
        let king;
        player === 'white' ? king = this.whiteKing : king = this.blackKing;
        let positions;
        let ocupate = [];
        let br = 0;
        let max = [];

        function removeDuplicates(data) {
            return [...new Set(data)]
        }
        positions = removeDuplicates(king.isCheckmate());

        positions.forEach(pos => {
            if (this.boardMap.has(pos)) {
                let dangerSquare = this.boardMap.get(pos);
                console.log(dangerSquare);
                if (!(dangerSquare.figure instanceof modeli.Figure)) {

                    this.boardMap.forEach(el => {
                        if (el.figure instanceof modeli.Figure) {

                            if (el.figure.player !== player) {

                                if (!el.figure.isMovePossible(el, dangerSquare, this.boardMap) ||
                                    !this.pathMove(el, dangerSquare)) {

                                } else {
                                    // console.log(el.figure, dangerSquare)
                                    if (ocupate.length === 0) {
                                        ocupate.push(dangerSquare.id);
                                    }
                                    ocupate.forEach(e => {
                                        if (dangerSquare.id !== e) {
                                            ocupate.push(dangerSquare.id);
                                        }
                                    })

                                }
                            }
                        }
                    })
                    br--;

                }
                br++;
                console.log(pos)
                max++;
            }
        })
        console.log(ocupate);
        console.log(`${br} + ${ocupate.length} = ${max}`)
        if (ocupate.length !== 0) {
            if (ocupate.length + br >= max) {
                console.log("SahMat")
                return true;
            } else {
                return false;
            }
        }

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
                this.whiteKing = new modeli.King("white", ten + i);
                this.blackKing = new modeli.King("black", eighty + i);
                this.boardMap.get(ten + i).changeFigure(this.whiteKing);
                this.boardMap.get(eighty + i).changeFigure(this.blackKing);
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