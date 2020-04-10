import React, { useState, createContext, useContext } from 'react'

const initialState = {
	fetchedRawData: null,
	answer: null,
	optionSelected: null,
	disclaimer: '',
	rouletteStarted: false,
	rouletteDone: false,
}

const GameContext = createContext()

export const GameContextProvider = ({ children }) => {
	const [state, setState] = useState(initialState)
	const setGameState = obj => {
		// TODO make tests then warnings and logging state.hasOwnProperty
		// TODO make logging only for dev
		// if(process.env.NODE_ENV === 'DEV') {
		// 	console.log('Implementing upon state', obj)
		// }
		setState(state => ({ ...state, ...obj }))
	}

	return <GameContext.Provider value={[state, setGameState]}>{children}</GameContext.Provider>
}

export const useGameContext = () => useContext(GameContext)
