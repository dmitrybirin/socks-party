import React from 'react'
import styled from 'styled-components'
import useTheme from '../useTheme'

const StyledButton = styled.button`
	background: transparent;
	opacity: ${({ opacity }) => (opacity ? opacity : 1)};
	/* TODO need to be themed */
	color: ${({ disabled, theme }) => (disabled ? '#c4c4c4' : theme.mainColor)};
	font-size: ${({ big }) => (big ? '4em' : '2em')};
	font-weight: 500;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid ${({ disabled, theme }) => (disabled ? '#c4c4c4' : theme.mainColor)};
	border-radius: 6px;
	:hover {
		box-shadow: 0 0 ${({ disabled }) => (disabled ? 'none' : '20px')}
			${({ theme }) => theme.mainColor};
	}
	cursor: pointer;

	outline: none;
	transform: ${({ scale }) => (scale ? `scale(${scale})` : 'none')};
	animation: ${({ glow }) => (glow ? 'glow 1.5s ease-in-out infinite alternate' : 'none')};

	@keyframes glow {
		${props => {
			const { glowColor } = props.theme
			return `
		from {
			box-shadow: 0 0 10px -20px #fff, 0 0 20px -20px #fff, 0 0 30px -20px #fff, 0 0 40px -20px ${glowColor},
				0 0 70px -20px ${glowColor}, 0 0 80px -20px ${glowColor}, 0 0 100px -20px ${glowColor}, 0 0 150px -20px ${glowColor}, inset 0 0 30px 10px ${glowColor};
		}
		to {
			box-shadow: none;
		}
	`
		}}
	}
`

const Button = props => {
	const theme = useTheme()
	return <StyledButton theme={theme} {...props} />
}

export default Button
