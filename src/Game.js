import React, { useEffect } from 'react'
import styled from 'styled-components'
import Sock from './Sock'
import useRoulette from './useRoulette'
import useSockSize from './useSockSize'
import { useGameContext } from './GameContext'
import { useQuery, gql } from '@apollo/client'
import Button from './components/Button'

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

const SockPair = styled.div`
	min-width: 300px;
`

const SockRoulette = ({ answer }) => {
	const [gameState, setGameState] = useGameContext()
	const { socks, done } = useRoulette(answer)

	useEffect(() => {
		if (done) {
			const [l, r] = answer
			const optionAnswered = l === r ? 'same' : 'different'
			setGameState({ rouletteDone: done, disclaimer: optionAnswered })
			const timeout = setTimeout(
				setGameState({
					disclaimer:
						optionAnswered === gameState.optionSelected
							? '🎉 YOU\'VE WON 🎉'
							: '😢YOU\'VE MISTAKEN😢',
				}),
				2500
			)
			return () => clearTimeout(timeout)
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
