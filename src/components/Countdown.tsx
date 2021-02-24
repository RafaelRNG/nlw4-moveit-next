import { useState, useEffect } from "react";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
    const [time, setTime] = useState<number>(25 * 60);
    const [isActive, setIsActive] = useState<boolean>(false);

    const minutes = Math.floor(time / 60);
    const second = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(second).padStart(2, '0').split('');

    function startCountdown() {
        setIsActive(true);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }
    }, [isActive, time]);

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            <button
                type="button"
                className={styles.CountdownButton}
                onClick={startCountdown}>
                Iniciar um ciclo
            </button>
        </div>
    )
}