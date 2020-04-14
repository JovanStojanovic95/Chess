import Figure from "./figure";

export default class Queen extends Figure {
    constructor(player) {
        super(player);
        this.figure;
        if (player === 'white') {
            this.figure = "&#9813;"
        } else {
            this.figure = "&#9819;";
        }
    }

    isMovePossible(src, dest) {
        let srcId = src.id;
        let destId = dest.id;
        if (Math.floor(srcId / 10) === Math.floor(destId / 10) ||
            srcId % 10 === destId % 10)
            return true;
        if (src.color === dest.color) {
            return (Math.abs(srcId - destId) % 9 === 0 ||
                Math.abs(srcId - destId) % 11 === 0);
        }
        return false;
    }
}