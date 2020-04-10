import { useEffect, useState } from 'react'

const DEFAULT_THEME = 'dark'

// TODO need test that themes got the same properties deep
const themes = {
	light: {
		background: '#f0f0f0',
		mainColor: '#4d4d4d',
		glowColor: '#70a7ff',
	},
	dark: {
		background: '#484d5c',
		mainColor: '#ffc400',
		glowColor: '#ffc400',
	},
}

const useSystemTheme = () => {
	const [theme, setTheme] = useState(null)
	useEffect(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('dark')
		}
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
			setTheme('light')
		}
	}, [])
	return theme
}

const useTheme = () => {
	const systemTheme = useSystemTheme()
	//TODO safe choice to local storage
	const currentTheme = systemTheme || DEFAULT_THEME
	return themes[currentTheme]
}

export default useTheme
