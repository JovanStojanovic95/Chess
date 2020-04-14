import * as navsViews from '../views/base';

//console.log(chessBoard);
//navsViews.renderNav(chessBoard, document.querySelector('.boardPlace'));
import ChessBoard from './board';
import CTRLPlayer from './player';
const board = new ChessBoard();

board.init();

//const player = new CTRLPlayer('white');
console.log("HEYYY");