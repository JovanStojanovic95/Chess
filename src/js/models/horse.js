import Figure from "./figure";

export default class Horse extends Figure {
    constructor(player) {
        super(player);
        this.figure;
        this.jump = true;
        if (player === 'white') {
            this.figure = "&#9816;"
        } else {
            this.figure = "&#9822;";
        }
    }

    isMovePossible(src, dest) {
        let srcId = src.id;
        let destId = dest.id;
        return (Math.abs(srcId - destId) === 19 ||
            Math.abs(srcId - destId) === 21 ||
            Math.abs(srcId - destId) === 12 ||
            Math.abs(srcId - destId) === 8);
    }

}