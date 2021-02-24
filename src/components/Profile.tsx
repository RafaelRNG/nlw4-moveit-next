import styles from "../styles/components/Profile.module.css";

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/68453233?s=460&u=696da23868c2738690b7cb7e55bbe5b7b242057e&v=4"
                alt="Rafael Neves Gomila" />
            <div>
                <strong>Rafael Neves Gomila</strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Level 1
                </p>
            </div>
        </div>
    )
}