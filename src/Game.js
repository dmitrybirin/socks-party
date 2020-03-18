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
	line-height: 200px;
`

const Ready = styled.h3`
	text-align: center;
`

const Game = () => {
	const [number, setNumber] = useState(1)
	useEffect(() => {
		const interval = setInterval(() => {
			setNumber(i => (i + 1) % 16 || 1)
		}, 500)
		return () => clearInterval(interval)
	}, [])
	return (
		<>
			<ReadySoon>
				<Ready>game will be ready </Ready>
				<Soon>SOON</Soon>
			</ReadySoon>
			<h3>but for now...</h3>
			<Sock number={number} size={550} />
		</>
	)
}

export default Game
