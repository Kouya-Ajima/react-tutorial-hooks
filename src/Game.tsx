/** @format */
import { useState } from 'react';
import Board from './Board';
import Clock from './Clock';

export type SquareType = 'O' | 'X' | null;
/** Squares 配列 の配列。 History ＝ [Squares, Squares, Squares] */
type HistoryType = SquareType[];

/**
 * @notice
 * コンポーネントはファイルごとに作成するのが理想。
 *      →default をつけて{} なしでインポートする。
 * useState
 *      -> Squareの現在の値をstateに保存し、Squareがクリックされたときにそれを変更する
 * @returns
 */
export default function Game() {
    // 配列を初期化
    const historyDefault: HistoryType[] = Array(9).fill(null);
    // OX を反転 xIsNext に初期値を代入、＆ 関数を宣言
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    // Sqares の配列 history に初期値を代入、＆ 関数を宣言
    const [history, setHistory] = useState<HistoryType[]>(historyDefault);
    // 現在の履歴を取得する。 → 配列が0から始まるので、履歴の長さ −１
    const currentSquares = history[history.length - 1];

    /** ボタン押下後、履歴を更新して OX をトグル */
    function handlePlay(nextSquares: SquareType[]) {
        // history の全履歴 ＋ 新しい履歴（Board から渡されたもの）
        setHistory([...history, nextSquares]);
        // O X を トグル
        setXIsNext(!xIsNext);
    }

    return (
        <>
            <Clock />
            <div className='game'>
                <div className='game-board'>
                    <Board
                        xIsNext={xIsNext}
                        // 現在の履歴を渡す
                        squares={currentSquares}
                        onPlay={handlePlay}
                    />
                </div>
                <div className='game-info'>
                    <ol>{/*TODO*/}</ol>
                </div>
            </div>
        </>
    );
}
