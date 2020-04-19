export default class Figure {
    constructor(player) {
        this.player = player;
        this.firstMove = true;
        this.specPower = true;
    }
    haveFigure(figure) {
        if (figure instanceof Figure)
            return true;
        return false;
    }
    samePlayer(figure) {
        if (this.haveFigure(figure))
            return this.player === figure.player;
        return false;
    }

}