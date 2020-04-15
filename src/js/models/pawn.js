 import Figure from "./figure";

 export default class Pawn extends Figure {
     constructor(player) {
         super(player);
         this.figure;
         this.firstMove = true;
         if (player === 'white') {
             this.figure = "&#9817;"
         } else {
             this.figure = "&#9823;";
         }
     }

     isMovePossible(src, dest) {
         // ne radi ako rucka!!!
         let srcId = src.id;
         let destId = dest.id;
         if (this.firstMove) {
             this.firstMove = false;
             return (Math.abs(srcId - destId) === 10 || Math.abs(srcId - destId) === 20);
         }
         return (Math.abs(srcId - destId) === 10);
     }

     pathToDest(src, dest) {
         return [];
     }
 }