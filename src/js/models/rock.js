import Figure from "./figure";

export default class Rock extends Figure {
    constructor(player) {
        super(player);
        this.figure;
        if (player === "white") {
            this.figure = "&#9814;";
        } else {
            this.figure = "&#9820;";
        }
    }

    isMovePossible(src, dest) {
        let srcId = src.id;
        let destId = dest.id;
        return (
            Math.floor(srcId / 10) === Math.floor(destId / 10) ||
            srcId % 10 === destId % 10
        );
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
        if (Math.abs(src.id - dest.id) % 10 === 0) {
            acm = 10;
            startPositon += 10;
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