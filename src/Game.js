import React, { useEffect } from 'react'
import styled from 'styled-components'
import Sock from './Sock'
import useRoulette from './useRoulette'
import useSockSize from './useSockSize'
import { useGameContext } from './GameContext'
import { useQuery, gql } from '@apollo/client'

const GameContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const OptionsContainer = styled.div`
	flex-direction: row;
	justify-content: center;
`

const Button = styled.button`
	background: transparent;
	opacity: ${props => (props.opacity ? props.opacity : 1)};
	/* TODO need to be themed */
	color: ${props => (props.disabled ? '#c4c4c4' : '#ffc400')};
	font-size: ${props => (props.big ? '4em' : '2em')};
	font-weight: 500;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid ${props => (props.disabled ? '#c4c4c4' : '#ffc400')};
	border-radius: 6px;
	:hover {
		box-shadow: 0 0 20px #ffc400;
	}
	outline: none;
	transform: ${props => (props.scale ? `scale(${props.scale})` : 'none')};

	animation: ${props => (props.glow ? 'glow 1.5s ease-in-out infinite alternate' : 'none')};

	@keyframes glow {
		from {
			box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ffc400,
				0 0 70px #ffc400, 0 0 80px #ffc400, 0 0 100px #ffc400, 0 0 150px #ffc400;
		}
		to {
			box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ffffff,
				0 0 35px #ffffff, 0 0 40px #ffffff, 0 0 50px #ffffff, 0 0 75px #ffffff;
		}
	}
`

const SockPair = styled.div`
	min-width: 300px;
`

const SockRoulette = ({ answer }) => {
	const [, setGameState] = useGameContext()
	const { socks, done } = useRoulette(answer)

	const [l, r] = answer

	useEffect(() => {
		if (done) {
			setGameState({ rouletteDone: done, disclaimer: l === r ? 'same' : 'different' })
		}
	}, [done])

	const size = useSockSize()

	return (
		<SockPair>
			<Sock number={socks.left} which="left" size={size} />
			<Sock number={socks.right} size={size} />
		</SockPair>
	)
}

const getScale = (buttonOption, option) => {
	if (option === null) {
		return null
	}
	if (buttonOption !== option) {
		return '0.7'
	}
	if (buttonOption === option) {
		return '1.3'
	}
}

const getBrowserDate = () => {
	const now = new Date()
	const month = (now.getMonth() + 1).toString().padStart(2, '0')
	const day = now
		.getDate()
		.toString()
		.padStart(2, '0')
	return `${now.getFullYear()}-${month}-${day}`
}

const getDisclaimer = rawData => {
	const { data, loading, error } = rawData
	if (loading) {
		return 'Searching for socks...'
	}

	if (error) {
		// TODO need to have Errors in scheme
		if (`${error.message}`.includes('Value not found at path')) {
			return 'There is no socks\nfor today'
		}
		return 'Oops\nDo you see the other sock?\nWrite to your admin or whatever'
	}

	if (data) {
		return 'The two has been chosen'
	}
	return null
}

const Game = () => {
	const [gameState, setGameState] = useGameContext()

	const fetchedRawData = useQuery(
		gql`
			query answerByDateQuery($date: String!) {
				answerByDate(date: $date) {
					date
					answer
				}
			}
		`,
		{ variables: { date: getBrowserDate() } }
	)
	useEffect(() => {
		setGameState({
			fetchedRawData,
			answer: fetchedRawData.data && fetchedRawData.data.answerByDate.answer,
			disclaimer: getDisclaimer(fetchedRawData),
		})
	}, [fetchedRawData.data, fetchedRawData.error, fetchedRawData.loading])
	console.log(gameState)

	return !gameState.answer ? null : (
		<>
			<GameContainer>
				{!gameState.rouletteStarted && (
					<OptionsContainer>
						<Button
							scale={getScale('same', gameState.optionSelected)}
							onClick={() => setGameState({ optionSelected: 'same' })}
						>
							🧦 SAME 🧦
						</Button>
						<Button
							scale={getScale('different', gameState.optionSelected)}
							onClick={() => setGameState({ optionSelected: 'different' })}
						>
							🍌 DIFFERENT 🌵
						</Button>
					</OptionsContainer>
				)}

				{!gameState.rouletteStarted && (
					<Button
						disabled={!gameState.optionSelected}
						glow={gameState.optionSelected}
						big
						onClick={() => setGameState({ rouletteStarted: true })}
					>
						SPIN THE SOCKS
					</Button>
				)}
				{gameState.rouletteStarted && <SockRoulette answer={gameState.answer} />}
			</GameContainer>
		</>
	)
}

export default Game
