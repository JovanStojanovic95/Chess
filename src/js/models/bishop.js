import Figure from "./figure";

export default class Bishop extends Figure {
    constructor(player) {
        super(player);
        this.figure;
        if (player === 'white') {
            this.figure = "&#9815;"
        } else {
            this.figure = "&#9821;";
        }
    }

    isMovePossible(src, dest) {
        let srcId = src.id;
        let destId = dest.id;
        if (src.color === dest.color) {
            return (Math.abs(srcId - destId) % 9 === 0 ||
                Math.abs(srcId - destId) % 11 === 0);
        }
        return false;

    }


}