import React, { useState } from 'react'
import styled from 'styled-components'
import Sock from './Sock'
import useRoulette from './useRoulette'

// const Image = styled.img`
// 	width: 400px;
// 	margin: 10px;
// `

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
	/* TODO need to be themed */
	color: ${props => (props.disabled ? '#c4c4c4' : '#ffc400')};
	font-size: ${props => (props.big ? '3em' : '2em')};
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

const SockRoulette = ({ answer }) => {
	const [left, right] = useRoulette(answer)
	return (
		<>
			<Sock number={left} which="left" size={550} />
			<Sock number={right} size={550} />
		</>
	)
}

const getScale = (buttonOption, option) => {
	if (option === null) {
		return null
	}
	if (buttonOption !== option) {
		return '0.8'
	}
	if (buttonOption === option) {
		return '1.2'
	}
}

const Game = ({ answer }) => {
	const [triggerGame, setTriggerGame] = useState(false)
	const [option, setOption] = useState(null)

	return (
		<>
			<GameContainer>
				<OptionsContainer>
					<Button scale={getScale('same', option)} onClick={() => setOption('same')}>
						🧦 SAME 🧦
					</Button>
					<Button
						scale={getScale('different', option)}
						onClick={() => setOption('different')}
					>
						🍌 DIFFERENT 🌵
					</Button>
				</OptionsContainer>

				{!triggerGame && (
					<Button
						disabled={!option}
						glow={option}
						big
						onClick={() => setTriggerGame(true)}
					>
						SPIN THE SOCKS
					</Button>
				)}
				{/* {!triggerGame && <button onClick={() => setTriggerGame(true)}> THE SOCKS</button>} */}
				{triggerGame && <SockRoulette answer={answer} />}
			</GameContainer>
		</>
	)
}

export default Game
