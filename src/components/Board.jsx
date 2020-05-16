import React from 'react';

const Board = ({ squares }) => {
  const size = 640;
  const boardStateToComponents = () => {
    const rows = [];
    for (let row = 0; row < 8; row += 1) {
      const cols = [];
      rows.push(cols);
      for (let col = 0; col < 8; col += 1) {
        const index = col + row * 8;
        cols.push(squares[index]);
      }
    }
    return rows;
  };

  const rows = boardStateToComponents(squares);

  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        backgroundColor: 'red',
        left: 0,
        top: 0,
      }}
    >
      <table style={{ height: '100%', width: '100%' }}>
        {rows.forEach(cols => (
          <tr>
            {cols.forEach(square => (
              <td>{square.piece.type}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Board;
