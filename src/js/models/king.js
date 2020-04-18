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
        //  this.specialPower(dest, src, map)
        if (this.samePlayer(dest.figure)) {
            return false;
        }
        return (src.id - 9 === dest.id ||
            src.id - 11 === dest.id ||
            src.id - 10 === dest.id ||
            src.id - 1 === dest.id ||
            src.id + 9 === dest.id ||
            src.id + 10 === dest.id ||
            src.id + 11 === dest.id ||
            src.id + 1 === dest.id)
    }

    pathToDest(src, dest) {
        return [];
    }
    specialPower(dest, src, map) {
        if (dest.figure.specPower === false && src.figure.specPower === false) {
            if (this.firstMove && dest.figure instanceof Rock && dest.figure.firstMove) {

                if (Math.abs(src.id - dest.id) === 3) {
                    console.log(src.id)
                    if (!(map.get(src.id + 1).figure instanceof Figure) && !(map.get(src.id + 2).figure instanceof Figure)) {
                        src.figure = new Rock(this.player);
                        dest.figure = new King(this.player);
                        console.log('mala rokada');
                        dest.figure.specPower = true;
                        src.figure.specPower = true;
                        src.square = dest.id;
                    }
                }
                if (Math.abs(src.id - dest.id) === 4) {
                    if (!(map.get(src.id - 1).figure instanceof Figure) && !(map.get(src.id - 2).figure instanceof Figure) && !(map.get(src.id - 3).figure instanceof Figure)) {
                        src.figure = new Rock(this.player);
                        dest.figure = new King(this.player);
                        dest.figure.specPower = true;
                        src.figure.specPower = true;
                        src.square = dest.id;
                    }
                }
            }
            return false
        }
    }

    specPath(src, dest) {

    }
    isCheckmate() {
        return [this.square + 1, this.square - 1, this.square + 9, this.square - 9,
            this.square - 9, this.square + 10, this.square - 10, this.square + 11, this.square - 11
        ];


    }
}