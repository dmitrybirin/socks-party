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
`

const Footer = styled.footer`
	flex-shrink: 0;
	margin-bottom: 10px;
`

const App = () => {
	const theme = useSystemTheme()
	const { data } = useQuery(
		gql`
			query answerByDateQuery($date: String!) {
				answerByDate(date: $date) {
					date
					answer
				}
			}
		`,
		{ variables: { date: new Date().toISOString().slice(0, 10) } }
	)

	return (
		<>
			<GlobalStyle theme={theme || 'dark'} />

			<Container>
				<i className="fas fa-socks"></i>
				<Title>🧦🤔 Socks Party 🤔🧦</Title>
				<SubTitle>socks guessing game</SubTitle>
				<Content>
					{data ? <Game answer={data.answerByDate.answer} /> : <h2>There is no socks</h2>}
				</Content>
				<Footer>Made with 🧦 & ❤️ by Dmitry Birin</Footer>
			</Container>
		</>
	)
}

export default App
