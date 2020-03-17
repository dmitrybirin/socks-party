import { useEffect, useState } from 'react'

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

export default useSystemTheme
