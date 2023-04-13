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
    const historyDefault: HistoryType[] = Array(9).fill([null]);
    // Sqares の配列 history に初期値を代入、＆ 関数を宣言
    const [history, setHistory] = useState<HistoryType[]>(historyDefault);
    // 現在、何手目かを表示する ->初期値 ０
    const [currentMove, setCurrentMove] = useState(0);
    // currentMove が更新され、偶数なら X（True）、奇数なら O（False）
    const xIsNext = currentMove % 2 === 0;
    // 現在の履歴を取得する。 → 最終手ではなく、現時点での手までの履歴を格納する。
    const currentSquares = history[currentMove];

    /** ボタン押下後、履歴を更新して OX をトグル */
    function handlePlay(nextSquares: SquareType[]) {
        // currentMove + 1 -> 今の手順。→ Slice は、最後のインデックスが含まれないため ＋1
        //   → それに対して、NextSquares をプラスする。
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        // history の全履歴 ＋ 新しい履歴（Board から渡されたもの）
        setHistory(nextHistory);
        // 現在の手を更新 → 更新された全履歴の最後の手になるように更新する
        setCurrentMove(nextHistory.length - 1);
    }

    // 履歴を更新する → 指定のインデックスまでの配列に置き換える。
    function jumpTo(nextMove: number) {
        // 今の手を、ボタンを押した時点の手に更新する。
        setCurrentMove(nextMove);
    }

    /** move -> index , squares -> 値 */
    const moves = history.map((squares, move) => {
        let description;
        // move があれば -> インデックスが0 以上であれば
        if (move > 0) {
            description = 'Go to move' + move;
        } else {
            // 履歴がない場合の処理 → 開始文字
            description = 'Go to game start';
        }
        return (
            // 兄弟要素を生成する場合、キーに一意な値を入れないと警告が出る。
            //  → 再レンダリングをする際に、Reactが識別するものとして Key が必要になる。
            //  → ボタンを押下したときなど、どのボタンを押したかどうかをReactが識別する。
            <li key={move}>
                {/* () =>  を、関数の呼び出し時にはつける。 */}
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

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
                    <ol>{moves}</ol>
                </div>
            </div>
        </>
    );
}
