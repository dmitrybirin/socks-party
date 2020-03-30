import React from 'react'
import styled from 'styled-components'
import Sock from './Sock'
import useRoulette from './useRoulette'

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
	const answer = [11, 10]

	const [left, right] = useRoulette(answer)

	return (
		<>
			<ReadySoon>
				<Ready>game will be ready </Ready>
				<Soon>SOON</Soon>
				<ForNow>but for now...</ForNow>
				<Sock number={left} which="left" size={550} />
				<Sock number={right} size={550} />
			</ReadySoon>
		</>
	)
}

export default Game
