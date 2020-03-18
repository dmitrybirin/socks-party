import React from 'react'
import styled from 'styled-components'
import photo from './photos/18.03.2020.jpg'

const Image = styled.img`
	width: 400px;
	margin: 10px;
`

const ReadySoon = styled.div`
	flex-direction: column;
	justify-content: space-around;
`

const Soon = styled.p`
	font-family: 'Oswald', sans-serif;
	font-size: 250px;
	margin:0;
	line-height: 200px;
`

const Ready = styled.h3`
	text-align: center;
`

const Game = () => (
	<>
		<ReadySoon>
			<Ready>game will be ready </Ready>
			<Soon>SOON</Soon>
		</ReadySoon>
		<h3>but for now...</h3>
		<Image src={photo} />
	</>
)

export default Game
