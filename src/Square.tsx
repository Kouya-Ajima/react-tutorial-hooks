/** @format */

import { SquareType } from './Board';

// Props の型を定義する
type SquareProps = {
    value: SquareType;
    onSquareClick: () => void;
};

/**
 * Propsを経由して値にアクセスする。
 */
export default function Square(props: SquareProps) {
    return (
        <>
            {/* useState で渡ってきたPropsの、クリックイベントを呼ぶ。 */}
            <button className='square' onClick={props.onSquareClick}>
                {props.value}
            </button>
        </>
    );
}
