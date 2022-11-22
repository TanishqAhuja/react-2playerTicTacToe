import { useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [turn, setTurn] = useState("X");
  const [win, setWin] = useState(null);
  const indices = useRef([[], [], []]);

  const handleCellClick = (e) => {
    if (win) return;
    e.target.innerHTML = turn;
    const [a, b] = e.target.dataset.indice.split(",");
    indices.current[a][b] = turn;

    //horizontal win scenario
    let isWin = true;
    for (let i = 0; i < 3; i++) {
      const val = indices.current[a][i];
      if (val !== turn) {
        isWin = false;
        break;
      }
    }

    //verticle win scenario
    if (isWin) {
      setWin(turn);
    } else {
      isWin = true;
      for (let i = 0; i < 3; i++) {
        const val = indices.current[i][b];
        if (val !== turn) {
          isWin = false;
          break;
        }
      }
    }

    //diagonal win scenario
    if (isWin) {
      setWin(turn);
    } else {
      isWin = true;
      for (let i = 0; i < 3; i++) {
        const val = indices.current[i][i];
        if (val !== turn) {
          isWin = false;
          break;
        }
      }
    }

    //diagonal win scenario 2
    if (isWin) {
      setWin(turn);
    } else {
      isWin = true;
      for (let i = 0, j = 2; i < 3 && j >= 0; i++, j--) {
        const val = indices.current[i][j];
        if (val !== turn) {
          isWin = false;
          break;
        }
      }
    }

    if (isWin) {
      setWin(turn);
    }

    setTurn((prev) => (prev === "X" ? "O" : "X"));
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <h2>Turn: Player {turn}</h2>

      <table>
        <tbody>
          {[0, 1, 2].map((row) => {
            return (
              <tr key={`row-${row}`}>
                {[0, 1, 2].map((col) => {
                  return (
                    <td
                      key={`col-${row},${col}`}
                      data-indice={`${row},${col}`}
                      onClick={handleCellClick}
                    ></td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {win ? <p>{win} wins</p> : null}
    </div>
  );
}
