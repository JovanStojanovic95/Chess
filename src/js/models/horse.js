import Figure from "./figure";

export default class Horse extends Figure {
    constructor(player) {
        super(player);
        this.figure;
        if (player === 'white') {
            this.figure = "&#9816;";
        } else {
            this.figure = "&#9822;";
        }
    }

    isMovePossible(src, dest) {
        if (this.samePlayer(dest.figure)) {
            return false;
        }
        return (Math.abs(src.id - dest.id) === 19 ||
            Math.abs(src.id - dest.id) === 21 ||
            Math.abs(src.id - dest.id) === 12 ||
            Math.abs(src.id - dest.id) === 8);
    }

    pathToDest(src, dest) {
        return [];
    }
}