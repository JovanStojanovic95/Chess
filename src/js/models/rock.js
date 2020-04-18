import Figure from "./figure";
import King from './king';

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

    isMovePossible(src, dest, map) {
        //  this.specialPower(dest, src, map);
        if (this.samePlayer(dest.figure)) {
            return false;
        }
        return (Math.floor(src.id / 10) === Math.floor(dest.id / 10) ||
            src.id % 10 === dest.id % 10
        )
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
        } else {
            acm = 1;
            startPositon += 1;
        }

        for (let i = startPositon; i < endPosition; i += acm) {
            path.push(i);
        }
        return path;
    }


    specialPower(dest, src, map) {
        if (this.firstMove && dest.figure instanceof King && dest.figure.firstMove) {
            if (Math.abs(src.id - dest.id) === 3) {
                if (!(map.get(src.id - 1).figure instanceof Figure) && !(map.get(src.id - 2).figure instanceof Figure)) {
                    dest.figure = new Rock(this.player);
                    src.figure = new King(this.player);
                    dest.figure.specPower = true;
                    src.figure.specPower = true;
                    dest.square = src.id;
                    src.square =
                        console.log('mala rokada')
                    console.log(src, dest);
                }
            }
            if (Math.abs(src.id - dest.id) === 4) {
                if (!(map.get(src.id + 1).figure instanceof Figure) && !(map.get(src.id + 2).figure instanceof Figure) && !(map.get(src.id + 3).figure instanceof Figure)) {
                    dest.figure = new Rock(this.player);
                    src.figure = new King(this.player);
                    dest.figure.specPower = true;
                    src.figure.specPower = true;
                    src.square = dest.id;
                    console.log('velika rokada')
                }
            }
        }
    }

}