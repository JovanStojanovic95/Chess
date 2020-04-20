 import Figure from "./figure";
 import Queen from './queen';
 export default class Pawn extends Figure {
     constructor(player, nativePosition) {
         super(player);
         this.figure;
         this.nativePosition = nativePosition;
         if (player === 'white') {
             this.figure = "&#9817;"
         } else {
             this.figure = "&#9823;";
         }
     }

     isMovePossible(src, dest) {
         this.specialPower(src)
         //console.log(src, dest);
         // if (this.samePlayer(dest.figure)) {
         //  return false;
         //  }
         if (dest.figure instanceof Figure) {
             if (!this.samePlayer(dest.figure)) {
                 if (this.player === 'white') {
                     return src.id + 11 === dest.id || src.id + 9 === dest.id
                 } else {
                     return src.id - 11 === dest.id || src.id - 9 === dest.id
                 }
             }
         }
         if (this.player === 'white') {
             if (this.firstMove) {
                 return src.id + 10 === dest.id || src.id + 20 === dest.id;
             }
             return src.id + 10 === dest.id;
         } else {
             if (this.firstMove) {
                 return src.id - 10 === dest.id || src.id - 20 === dest.id;
             }
             return src.id - 10 === dest.id;
         }
     }


     isEnemy(dest) {
         return this.player !== dest.figure.player;
     }


     pathToDest(src, dest) {
         return [];
     }

     specialPower(dest) {
         //  console.log(dest)
         if (this.player === 'white') {
             if (dest.id > 80) {
                 console.log("Power ON")
                 dest.figure = new Queen(this.player);
                 dest.changeFigure(dest.figure);
             }
         } else {
             if (dest.id < 20) {
                 console.log("Power ON")
                 dest.figure = new Queen(this.player);
                 dest.changeFigure(dest.figure);
             }
         }
         return false;
     }

     getElement(player) {
         return document.querySelector(`.figures_${player}`)
     }
 }