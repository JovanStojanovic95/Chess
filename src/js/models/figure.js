export default class Figure {
    constructor(player) {
        this.player = player;

    }
    isSamePlayer(player) {
        if (!player) {
            return false;
        }
        return this.player === player;
    }
}