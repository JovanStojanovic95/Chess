import Figure from "./figure";

export default class King extends Figure {
    constructor(player) {
        super(player);
        this.figure;
        if (player === 'white') {
            this.figure = "&#9812;"
        } else {
            this.figure = "&#9818;";
        }
    }

    isMovePossible(src, dest) {
        let srcId = src.id;
        let destId = dest.id;
        return (src - 9 === destId ||
            srcId - 11 === destId ||
            srcId - 10 === destId ||
            srcId - 1 === destId ||
            srcId + 9 === destId ||
            srcId + 10 === destId ||
            srcId + 11 === destId ||
            srcId + 1 === destId);
    }


}