import br from './br.png';
import bn from './bn.png';
import bb from './bb.png';
import bq from './bq.png';
import bk from './bk.png';
import bp from './bp.png';
import wr from './wr.png';
import wn from './wn.png';
import wb from './wb.png';
import wq from './wq.png';
import wk from './wk.png';
import wp from './wp.png';
import pt from '../constants/pieceTypes';

const images = {
  [pt.BLACK_ROOK]: br,
  [pt.BLACK_KNIGHT]: bn,
  [pt.BLACK_BISHOP]: bb,
  [pt.BLACK_QUEEN]: bq,
  [pt.BLACK_KING]: bk,
  [pt.BLACK_PAWN]: bp,
  [pt.WHITE_ROOK]: wr,
  [pt.WHITE_KNIGHT]: wn,
  [pt.WHITE_BISHOP]: wb,
  [pt.WHITE_QUEEN]: wq,
  [pt.WHITE_KING]: wk,
  [pt.WHITE_PAWN]: wp,
};

export default images;
