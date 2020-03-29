import * as React from 'react'
import PropTypes from 'prop-types'

import AllSocks from './socks'

const Sock = ({ size, number, which }) => {
	if (typeof number !== 'number' || number < 1 || number > 17) {
		throw new Error(`Number should be only int from 1 to 17. You have ${number}`)
	}
	const SockSVG = AllSocks[`Sock${number}`]
	const sockSVGProps = {
		transform: which === 'left' ? 'scale (-1, 1)' : '',
		'transform-origin': which === 'left' ? 'center' : '',
		preserveAspectRatio: 'xMidYMid meet',
		width: `${size}`,
		height: `${size}`,
	}

	return <SockSVG {...sockSVGProps} />
}

Sock.propTypes = {
	size: PropTypes.number.isRequired,
	which: PropTypes.string,
	number: PropTypes.number.isRequired,
}

export default Sock
