import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Game from './Game'
import useSystemTheme from './useSystemTheme'
import { useQuery, gql } from '@apollo/client'

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

const GameState = ({ state }) => {
	const { data, loading, error } = state
	if (loading) {
		return <Disclaimer>Searching for socks...</Disclaimer>
	}

	if (error) {
		// TODO need to have Errors in scheme
		if (`${error.message}`.includes('Value not found at path')) {
			return (
				<Disclaimer>
					There is no socks
					<br />
					for today
				</Disclaimer>
			)
		}
		return (
			<Disclaimer>
				Oops
				<br />
				Do you see the other sock?
				<br />
				Write to your admin or whatever
			</Disclaimer>
		)
	}

	if (data) {
		return <Disclaimer>The two has been chosen</Disclaimer>
	}
	return null
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

const App = () => {
	console.log(getBrowserDate())
	const theme = useSystemTheme()
	const state = useQuery(
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

	return (
		<>
			<GlobalStyle theme={theme || 'dark'} />

			<Container>
				<i className="fas fa-socks"></i>
				<Title>🧦🤔 Socks Party 🤔🧦</Title>
				<SubTitle>socks guessing game</SubTitle>
				<Content>
					<GameState state={state} />
					{state.data && <Game answer={state.data.answerByDate.answer} />}
				</Content>
				<Footer>Made with 🧦 & ❤️ by Dmitry Birin</Footer>
			</Container>
		</>
	)
}

export default App
