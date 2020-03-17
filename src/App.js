import React from 'react'
import { hot } from 'react-hot-loader'
import styled, { createGlobalStyle } from 'styled-components'
import Game from './Game'

const themes = {
	light: {
		background: '#f0f0f0',
		color: '#4d4d4d',
	},
	dark: {
		background: '#484d5c',
		color: '#ffc400',
	},
}

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		background-color: ${props => themes[props.theme].background};
		color: ${props => themes[props.theme].color};
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
	flex: 1 0 auto;
`

const Footer = styled.footer`
	flex-shrink: 0;
	margin-bottom: 10px;
`

const App = () => {
	return (
		<>
			<GlobalStyle theme={'dark'} />

			<Container>
				<Title>🧦🤔 Socks Party 🤔🧦</Title>
				<SubTitle>socks guessing game</SubTitle>
				<Content>
					<Game />
				</Content>
				<Footer>
					Made with 🧦 & ❤️ by Dmitry Birin
				</Footer>
			</Container>
		</>
	)
}

export default hot(module)(App)
