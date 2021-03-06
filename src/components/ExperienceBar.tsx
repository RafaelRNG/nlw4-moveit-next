import { useContext } from "react";
import { ChallengesContent } from "../contexts/ChallengesContext";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExpirienceBar() {

    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContent);

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />

                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}