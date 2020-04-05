import { useEffect, useState } from 'react'

const useSockSize = () => {
	const isClient = typeof window === 'object'

	function getWidth() {
		return isClient ? window.innerWidth : undefined
	}

	const [width, setWidth] = useState(getWidth())

	useEffect(() => {
		if (!isClient) {
			return false
		}

		function handleResize() {
			setWidth(getWidth())
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	if (width) {
		if (width > 1500) {
			return 500
		}
		if (width < 600) {
			return 250
		}
		return width / 3
	} else {
		return 300
	}
}

export default useSockSize
