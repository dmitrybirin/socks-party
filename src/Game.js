import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Sock from './Sock'

// const Image = styled.img`
// 	width: 400px;
// 	margin: 10px;
// `

const ReadySoon = styled.div`
	flex-direction: column;
	justify-content: space-around;
`

const Soon = styled.p`
	font-family: 'Oswald', sans-serif;
	font-size: 250px;
	margin: 0;
	text-align: center;
	line-height: 200px;
`


const ForNow = styled.h3`
	margin-top: 30px;
	text-align: center;
`

const Ready = styled.h3`
	text-align: center;
`

const Game = () => {
	const [leftNumber, setLeftNumber] = useState(1)
	const [rightNumber, setRightNumber] = useState(1)
	const speeds = [50, 100, 150, 200, 300, 500, 1000, 1500, 2000]
	const [speed, setSpeed] = useState(speeds[0])

	const answer = {
		left: 1,
		right: 3,
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setSpeed(speed => {
				const newIndex = (speeds.indexOf(speed) + 1) % speeds.length
				return speeds[newIndex]
			})
		}, 1000)
		if (speeds.indexOf(speed) === speeds.length - 1) {
			clearInterval(interval)
		}
		return () => clearInterval(interval)
	}, [speed])

	useEffect(() => {
		const interval = setInterval(() => {
			setLeftNumber(i => (i + 1) % 16 || 1)
			setRightNumber(i => (i + 2) % 16 || 1)
		}, speed)
		if (speeds.indexOf(speed) === speeds.length - 1) {
			clearInterval(interval)
			setLeftNumber(answer.left)
			setRightNumber(answer.right)
		}
		return () => clearInterval(interval)
	}, [speed])
	return (
		<>
			<ReadySoon>
				<Ready>game will be ready </Ready>
				<Soon>SOON</Soon>
				<ForNow>but for now...</ForNow>
				<Sock number={leftNumber} which="left" size={550} />
				<Sock number={rightNumber} size={550} />
			</ReadySoon>
		</>
	)
}

export default Game
