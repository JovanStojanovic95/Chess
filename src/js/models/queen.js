import Figure from "./figure";

export default class Queen extends Figure {
    constructor(player) {
        super(player);
        this.figure;
        if (player === 'white') {
            this.figure = "&#9813;";
        } else {
            this.figure = "&#9819;";
        }
    }

    isMovePossible(src, dest) {
        if (this.samePlayer(dest.figure)) {
            return false;
        }
        if (Math.floor(src.id / 10) === Math.floor(dest.id / 10) ||
            src.id % 10 === dest.id % 10)
            return true;
        if (src.color === dest.color) {
            return (Math.abs(src.id - dest.id) % 9 === 0 ||
                Math.abs(src.id - dest.id) % 11 === 0);
        }
        return false;
    }

    pathToDest(src, dest) {
        let path = [];
        let startPositon;
        let endPosition;
        let acm;
        src.id > dest.id ? startPositon = dest.id : startPositon = src.id;
        src.id > dest.id ? endPosition = src.id : endPosition = dest.id;
        if (Math.abs(src.id - dest.id) % 10 === 0) {
            acm = 10;
            startPositon += 10;
        } else if (Math.abs(src.id - dest.id) % 9 === 0) {
            acm = 9;
            startPositon += 9;
        } else if (Math.abs(src.id - dest.id) % 11 === 0) {
            acm = 11;
            startPositon += 11;
        } else {
            acm = 1;
            startPositon += 1;
        }

        for (let i = startPositon; i < endPosition; i += acm) {
            path.push(i);
        }
        return path;
    }
}