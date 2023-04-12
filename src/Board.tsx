/** @format */
import Square from './Square';
import { useState } from 'react';
import calculateWinner from './calculateWinner';

export type SquareType = 'O' | 'X' | null;

export default function Board() {
    /**
     * useState
     *  -> Squareの現在の値をstateに保存し、Squareがクリックされたときにそれを変更する
     */
    // OX の配列 squares に初期値を代入、＆ 関数を宣言
    const [squares, setSquares] = useState<SquareType[]>(Array(9).fill(null));
    // OX を反転 xIsNext に初期値を代入、＆ 関数を宣言
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    /** click Buton -> writing 'X'  */
    function handleClick(i: number) {
        // 配列の初期値はNull → 値があれば Return する。
        if (calculateWinner(squares) || squares[i]) return;
        // 配列をコピー
        const nextSquares = squares.slice();
        // 取得した配列の０番目を変更
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        // 配列を上書きする
        setSquares(nextSquares);
        // True を反転させて上書きする
        setXIsNext(!xIsNext);
    }

    // handleClick で変更があった時点で再レンダリングされる。
    //  → この記載でも、都度更新される。
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div className='status'>{status}</div>
            <div className='board-row'>
                <Square
                    value={squares[0]}
                    onSquareClick={() => handleClick(0)}
                />
                <Square
                    value={squares[1]}
                    onSquareClick={() => handleClick(1)}
                />
                <Square
                    value={squares[2]}
                    onSquareClick={() => handleClick(2)}
                />
            </div>
            <div className='board-row'>
                <Square
                    value={squares[3]}
                    onSquareClick={() => handleClick(3)}
                />
                <Square
                    value={squares[4]}
                    onSquareClick={() => handleClick(4)}
                />
                <Square
                    value={squares[5]}
                    onSquareClick={() => handleClick(5)}
                />
            </div>
            <div className='board-row'>
                <Square
                    value={squares[6]}
                    onSquareClick={() => handleClick(6)}
                />
                <Square
                    value={squares[7]}
                    onSquareClick={() => handleClick(7)}
                />
                <Square
                    value={squares[8]}
                    onSquareClick={() => handleClick(8)}
                />
            </div>
        </>
    );
}
