import React from 'react'
import styled from 'styled-components'
import Sock from './Sock'
import useRoulette from './useRoulette'
import { gql, useQuery } from '@apollo/client'

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
	const {data, loading} = useQuery(gql`query {
		allAnswers {
		  data {
			date
			answer
		  }
		}
	  }`)

	// if (loading) {
	// 	return <h1>Loading...</h1>
	// }

	const today = new Date().toISOString().slice(0,10)
	console.log(data?.allAnswers?.data)
	const todayAnswer = data?.allAnswers?.data?.find(answer => answer.date.slice(0,10) === today)
	console.log(todayAnswer)
	const [left, right] = useRoulette(todayAnswer?.answer)

	return (
		<>
			<ReadySoon>
				<Ready>game will be ready </Ready>
				<Soon>SOON</Soon>
				<ForNow>but for now...</ForNow>
				<Sock number={11} which="left" size={550} />
				<Sock number={10} size={550} />
			</ReadySoon>
		</>
	)
}

export default Game
