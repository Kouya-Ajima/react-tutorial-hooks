/** @format */
import { useState } from 'react';
import Board from './Board';
import Clock from './Clock';

export type SquareType = 'O' | 'X' | null;

/**
 * @notice
 * コンポーネントはファイルごとに作成するのが理想。
 *      →default をつけて{} なしでインポートする。
 * @returns
 */
export default function Game() {
    // 配列を初期化
    const historyDefault: SquareType[] = Array(9).fill(null);
    // OX を反転 xIsNext に初期値を代入、＆ 関数を宣言
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState(historyDefault);
    const currentSquares = history[history.length - 1];

    return (
        <>
            <Clock />
            <div className='game'>
                <div className='game-board'>
                    {/* <div className='status'>{status}</div> */}
                    <Board />
                </div>
                <div className='game-info'>
                    <ol>{/*TODO*/}</ol>
                </div>
            </div>
        </>
    );
}
