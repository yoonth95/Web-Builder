import React, { useState } from 'react';

const TableCell = ({ initialColor }) => {
  const [color, setColor] = useState(initialColor);

  const handleClick = () => {
    setColor(color === 'white' ? 'blue' : 'white');
  };

  return <td style={{ backgroundColor: color }} onClick={handleClick} />;
};

const Table = ({ rows, cols }) => {
  return (
    <table>
      <tbody>
        {Array(rows).fill().map((_, i) => (
          <tr key={i}>
            {Array(cols).fill().map((_, j) => (
              <TableCell key={j} initialColor="white" />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;