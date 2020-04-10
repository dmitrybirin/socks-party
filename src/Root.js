import React from 'react'
import { hot } from 'react-hot-loader'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import App from './App'

const client = new ApolloClient({
	uri: 'https://graphql.fauna.com/graphql',
	cache: new InMemoryCache(),
	headers: {
		Authorization: 'Bearer fnADpHJnjLACAJocZIAmDUBtN7kALj02NJ6-LPkZ',
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
