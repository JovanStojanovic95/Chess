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

    pathToDest(src, dest) {
        let path = [];
        let startPositon;
        let endPosition;
        let acm;
        if (src.id > dest.id) {
            startPositon = dest.id;
            endPosition = src.id;
        } else {
            startPositon = src.id;
            endPosition = dest.id;
        }
        if (Math.abs(src.id - dest.id) % 9 === 0) {
            acm = 9;
            startPositon += 9;
        } else {
            acm = 11;
            startPositon += 11;
        }

        for (let i = startPositon; i < endPosition; i += acm) {
            path.push(i);
        }
        return path;
    }

}