/** @format */
import { useEffect, useState } from 'react';

export default function Clock() {
    const [date, newDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            // 変わるたびにEffectのクリーンアップとセットアップが繰り返されることを防止
            //  -> Effectは依存する必要がなくなりました。
            newDate(new Date());
        }, 1000);
        // 関数を実行
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1>Welcom tic-tac-toe-ts!</h1>
            <h2>{'It is ' + date}</h2>
        </div>
    );
}
