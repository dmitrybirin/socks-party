import React from 'react'
import { hot } from 'react-hot-loader'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import App from './App'

const client = new ApolloClient({
	uri: 'https://graphql.fauna.com/graphql',
	cache: new InMemoryCache(),
	// TODO chesking for now, will delete and revoke. Tell me if I didn't :)))
	headers: {
		Authorization: 'Bearer fnADoTYx0JACCyVu6SoNYxtZw3AS0UVp--0uM9US',
	},
})

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	)
}

export default hot(module)(Root)
