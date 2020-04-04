import React from 'react'
import Sock from './Sock'

const ShowOff = () =>
	[...Array(16).keys()].map(i => (
		<div key={i}>
			<h1>{i + 1}</h1>
			<Sock number={i + 1} />
		</div>
	))

export default ShowOff
