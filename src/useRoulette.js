import { useState, useEffect } from 'react'

const NUMBER_OF_SOCKS = 16

const socksIndexArray = [...Array(NUMBER_OF_SOCKS+1).keys()].slice(1)

const getRandomSockNumber = () => socksIndexArray[Math.floor(Math.random() * socksIndexArray.length)]

const useRoulette = (answer, gears, gearInterval) => {
	if (!answer) {
		throw new Error('There is no answer submitted. I need answer!!!')
	}
	const speedArray = gears || [50, 100, 150, 200, 300, 500, 1000, 1500, 2000]

	const speedChangeTime = gearInterval || 1000

	const [leftNumber, setLeftNumber] = useState(1)
	const [rightNumber, setRightNumber] = useState(1)
	
	const [speed, setSpeed] = useState(speedArray[0])

	useEffect(() => {
		const interval = setInterval(() => {
			setSpeed(speed => {
				const newIndex = (speedArray.indexOf(speed) + 1) % speedArray.length
				return speedArray[newIndex]
			})
		}, speedChangeTime)
		if (speedArray.indexOf(speed) === speedArray.length - 1) {
			clearInterval(interval)
		}
		return () => clearInterval(interval)
	}, [speed])

	useEffect(() => {
		const interval = setInterval(() => {
			setLeftNumber(getRandomSockNumber())
			setRightNumber(getRandomSockNumber())
		}, speed)
		if (speedArray.indexOf(speed) === speedArray.length - 1) {
			clearInterval(interval)
			setLeftNumber(answer.left)
			setRightNumber(answer.right)
		}
		return () => clearInterval(interval)
	}, [speed])
	
	return [leftNumber, rightNumber]
}

export default useRoulette