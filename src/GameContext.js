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
	const setGameState = obj => setState(state => ({ ...state, ...obj }))

	return <GameContext.Provider value={[state, setGameState]}>{children}</GameContext.Provider>
}

export const useGameContext = () => useContext(GameContext)
