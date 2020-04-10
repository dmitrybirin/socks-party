import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Game from './Game'
import { GameContextProvider, useGameContext } from './GameContext'
import useTheme from './useTheme'

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		background-color: ${props => props.theme.background};
		color: ${props => props.theme.mainColor};
		font-family: 'Cardo', serif;
	}

	h1, h2, h3, h4, h5, h6, footer {
		font-family: 'Oswald', sans-serif;
		text-transform: uppercase;
	}
	
`
const Title = styled.h1`
	text-align: center;
	text-transform: uppercase;
`
const SubTitle = styled.h3`
	margin: 0;
	text-align: center;
	text-transform: uppercase;
`
const Container = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
`

const Content = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	flex-direction: column;
`

const Footer = styled.footer`
	flex-shrink: 0;
	margin-bottom: 10px;
`

const Disclaimer = styled.h1`
	font-size: 4em;
	display: flex;
	margin: 2em 0;
	text-align: center;
	align-items: flex-start;
	justify-content: center;
`

const GameDisclaimer = () => {
	const [{ disclaimer }] = useGameContext()
	return <Disclaimer>{disclaimer}</Disclaimer>
}

const App = () => {
	const theme = useTheme()

	return (
		<>
			<GlobalStyle theme={theme} />

			<Container>
				<Title>🧦🤔 Socks Party 🤔🧦</Title>
				<SubTitle>socks guessing game</SubTitle>
				<Content>
					<GameContextProvider>
						<GameDisclaimer />
						<Game />
					</GameContextProvider>
				</Content>
				<Footer>Made with 🧦 & ❤️ by Dmitry Birin</Footer>
			</Container>
		</>
	)
}

export default App
