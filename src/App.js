import React from 'react'
import { hot } from 'react-hot-loader'
import styled, { createGlobalStyle } from 'styled-components'
import Game from './Game'
import useSystemTheme from './useSystemTheme'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

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

const client = new ApolloClient({
	uri: 'https://graphql.fauna.com/graphql',
	cache: new InMemoryCache(),
	// TODO chesking for now, will delete and revoke. Tell me if I didn't :)))
	headers: {
		Authorization: 'Bearer fnADoI3XFeACAG7zlJal2sduazSuEqDjAn6Yy1rk',
	},
})

const App = () => {
	const theme = useSystemTheme()

	return (
		<ApolloProvider client={client}>
			<GlobalStyle theme={theme || 'dark'} />

			<Container>
				<i className="fas fa-socks"></i>
				<Title>🧦🤔 Socks Party 🤔🧦</Title>
				<SubTitle>socks guessing game</SubTitle>
				<Content>
					<Game />
				</Content>
				<Footer>Made with 🧦 & ❤️ by Dmitry Birin</Footer>
			</Container>
		</ApolloProvider>
	)
}

export default hot(module)(App)
