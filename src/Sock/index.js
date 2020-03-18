import * as React from 'react'
import PropTypes from 'prop-types'

import AllSocks from './socks'

const Sock = ({ size, number }) => {
	if (typeof number !== 'number' || number < 1 || number > 16) {
		throw new Error(`Number should be only int from 1 to 16. You have ${number}`)
	}
	const SockSVG = AllSocks[`Sock${number}`]
	return <SockSVG viewBox={`0 0 ${size} ${size}`} width={`${size}px`} height={`${size}px`} />
}

Sock.propTypes = {
	size: PropTypes.number.isRequired,
	which: PropTypes.string,
	number: PropTypes.number.isRequired,
}

export default Sock
