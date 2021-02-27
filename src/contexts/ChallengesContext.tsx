import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import Challenges from "../../challenges.json";

interface Challenge {
	type: "body" | "eye";
	description: number;
	amount: number;
}

interface ChallengesContextData {
	level: number
	currentExperience: number;
	experienceToNextLevel: number;
	challengesCompleted: number;
	activeChallenge: Challenge;
	levelUp: () => void;
	startNewChallenge: () => void;
	resetChallenge: () => void;
	completeChallenge: () => void
}

interface ChallengesProviderProps {
	children: ReactNode
}

export const ChallengesContent = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {

	const [level, setLevel] = useState(1);
	const [currentExperience, setCurrentExperience] = useState(30);
	const [challengesCompleted, setChallengesCompleted] = useState(0);

	const [activeChallenge, setActiveChallenge] = useState(null);

	const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

	useEffect(() => {
		Notification.requestPermission();
	}, []);

	useEffect(() => {
		Cookies.set("level", String(level))
		Cookies.set("currentExperience", String(currentExperience))
		Cookies.set("challengesCompleted", String(challengesCompleted))
	}, [level, currentExperience, challengesCompleted]);

	function levelUp() {
		setLevel(level + 1);
	}

	function startNewChallenge() {
		const randomChallengeIndex = Math.floor(Math.random() * Challenges.length)
		const challenge = Challenges[randomChallengeIndex]

		setActiveChallenge(challenge);

		new Audio("/notification.mp3").play();

		if (Notification.permission === "granted") {
			new Notification("Novo desafio", {
				body: `Valendo ${challenge.amount}xp`
			});
		}
	}

	function resetChallenge() {
		setActiveChallenge(null);
	}

	function completeChallenge() {
		if (!activeChallenge) {
			return;
		}

		const { amount } = activeChallenge;

		let finalExperience = currentExperience + amount;

		if (finalExperience >= experienceToNextLevel) {
			finalExperience = finalExperience - experienceToNextLevel
			levelUp();
		}

		setCurrentExperience(finalExperience);
		setActiveChallenge(null);
		setChallengesCompleted(challengesCompleted + 1);
	}

	return (
		<ChallengesContent.Provider
			value={{
				level,
				currentExperience,
				experienceToNextLevel,
				challengesCompleted,
				levelUp,
				startNewChallenge,
				activeChallenge,
				resetChallenge,
				completeChallenge
			}}>
			{children}
		</ChallengesContent.Provider>
	);
}