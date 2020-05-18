import pieceTypes from '../constants/pieceTypes';

const isEnemyPiece = (pieceType, isWhite) => {
  const targetIsWhite =
    pieceType === pieceTypes.WP ||
    pieceType === pieceTypes.WR ||
    pieceType === pieceTypes.WN ||
    pieceType === pieceTypes.WB ||
    pieceType === pieceTypes.WQ ||
    pieceType === pieceTypes.WK;
  return (targetIsWhite && !isWhite) || (!targetIsWhite && isWhite);
};

export default isEnemyPiece;
