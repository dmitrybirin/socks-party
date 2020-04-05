import { useState, useEffect } from 'react'

const NUMBER_OF_SOCKS = 17

const socksIndexArray = [...Array(NUMBER_OF_SOCKS + 1).keys()].slice(1)

const getRandomSockNumber = () =>
	socksIndexArray[Math.floor(Math.random() * socksIndexArray.length)]

const useRoulette = (answer, gears, gearInterval) => {
	const [done, setDone] = useState(false)

	const [leftAnswer, rightAnswer] = answer || [getRandomSockNumber(), getRandomSockNumber()]
	const speedArray = gears || [50, 100, 150, 200, 300, 500, 1000, 1500, 2000]

	const speedChangeTime = gearInterval || 1000

	const totalSwitches = speedArray.reduce(
		(acc, gear) => acc + Math.floor(speedChangeTime / gear),
		0
	)

	const [switchNumber, setSwitchNumber] = useState(0)

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
			setSwitchNumber(switchNumber => switchNumber + 1)
			setLeftNumber(getRandomSockNumber())
			setRightNumber(getRandomSockNumber())
		}, speed)
		if (speedArray.indexOf(speed) === speedArray.length - 1) {
			clearInterval(interval)
			setLeftNumber(leftAnswer)
			setRightNumber(rightAnswer)
			setDone(true)
		}
		return () => clearInterval(interval)
	}, [speed])

	return {
		socks: { left: leftNumber, right: rightNumber },
		done,
		progress: (switchNumber / totalSwitches).toPrecision(2),
	}
}

export default useRoulette
