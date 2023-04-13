/** @format */
import Square from './Square';
import { SquareType } from './Game';
import { calculateWinner } from './calculateWinner';

type BoardProps = {
    xIsNext: boolean;
    squares: Array<SquareType>;
    // TS では、引数にも型をつける。
    onPlay: (nextSquares: Array<SquareType>) => void;
};

export default function Board(props: BoardProps) {
    /** click Buton -> writing 'X'  */
    function handleClick(i: number) {
        // 配列の初期値はNull → 値があれば Return する。
        if (calculateWinner(props.squares) || props.squares[i]) return;
        // 配列をコピー → OX の配列が格納されている。
        const nextSquares = props.squares.slice();
        // 取得した配列の０番目を変更 → 新たなOX を配列に記入する
        if (props.xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        // 履歴に、新しく OX が書かれた 配列を追加する ＋ xIsNext を反転
        props.onPlay(nextSquares);
    }

    // handleClick で変更があった時点で再レンダリングされる。
    //  → この記載でも、都度更新される。
    const winner = calculateWinner(props.squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (props.xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div className='status'>{status}</div>
            <div className='board-row'>
                <Square
                    value={props.squares[0]}
                    onSquareClick={() => handleClick(0)}
                />
                <Square
                    value={props.squares[1]}
                    onSquareClick={() => handleClick(1)}
                />
                <Square
                    value={props.squares[2]}
                    onSquareClick={() => handleClick(2)}
                />
            </div>
            <div className='board-row'>
                <Square
                    value={props.squares[3]}
                    onSquareClick={() => handleClick(3)}
                />
                <Square
                    value={props.squares[4]}
                    onSquareClick={() => handleClick(4)}
                />
                <Square
                    value={props.squares[5]}
                    onSquareClick={() => handleClick(5)}
                />
            </div>
            <div className='board-row'>
                <Square
                    value={props.squares[6]}
                    onSquareClick={() => handleClick(6)}
                />
                <Square
                    value={props.squares[7]}
                    onSquareClick={() => handleClick(7)}
                />
                <Square
                    value={props.squares[8]}
                    onSquareClick={() => handleClick(8)}
                />
            </div>
        </>
    );
}
