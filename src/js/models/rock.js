import Figure from "./figure";

export default class Rock extends Figure {
    constructor(player) {
        super(player);
        this.figure;
        if (player === 'white') {
            this.figure = "&#9814;"
        } else {
            this.figure = "&#9820;";
        }
    }

    isMovePossible(src, dest) {
        let srcId = src.id;
        let destId = dest.id;
        return (Math.floor(srcId / 10) === Math.floor(destId / 10) ||
            srcId % 10 === destId % 10);
    }


}