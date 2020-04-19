import Figure from "./figure";
import Rock from './rock';

export default class King extends Figure {
    constructor(player, square) {
        super(player);
        this.square = square;
        this.figure;
        if (player === 'white') {
            this.figure = "&#9812;"
        } else {
            this.figure = "&#9818;";
        }
    }

    isMovePossible(src, dest, map) {

        if (this.firstMove) {


            this.specialPower(dest, src, map)
        }

        if (this.samePlayer(dest.figure)) {
            return false;
        }
        if (src.id - 9 === dest.id ||
            src.id - 11 === dest.id ||
            src.id - 10 === dest.id ||
            src.id - 1 === dest.id ||
            src.id + 9 === dest.id ||
            src.id + 10 === dest.id ||
            src.id + 11 === dest.id ||
            src.id + 1 === dest.id) {
            this.firstMove = false;
            return true;
        }

    }

    pathToDest(src, dest) {
        return [];
    }
    specialPower(dest, src, map) {

        if (dest.figure.firstMove !== false && src.figure.firstMove !== false && dest.figure instanceof Rock) {

            if (Math.abs(src.id - dest.id) === 3) {
                console.log(src.id)
                if (!(map.get(src.id + 1).figure instanceof Figure) && !(map.get(src.id + 2).figure instanceof Figure)) {
                    src.figure = new Rock(this.player);
                    dest.figure = new King(this.player);
                    console.log('mala rokada');
                    dest.figure.firstMove = false;
                    src.square = dest.id;
                    dest.square = null;
                }
            }
            if (Math.abs(src.id - dest.id) === 4) {
                if (!(map.get(src.id - 1).figure instanceof Figure) && !(map.get(src.id - 2).figure instanceof Figure) && !(map.get(src.id - 3).figure instanceof Figure)) {
                    src.figure = new Rock(this.player);
                    dest.figure = new King(this.player);
                    dest.figure.firstMove = false;
                    src.square = dest.id;
                    dest.square = null;
                    console.log('velik rokada');
                }
            }
        }
        return false

    }

    specPath(src, dest) {

    }
    isCheckmate() {
        return [this.square + 1, this.square - 1, this.square + 9, this.square - 9,
            this.square - 9, this.square + 10, this.square - 10, this.square + 11, this.square - 11
        ];


    }
}