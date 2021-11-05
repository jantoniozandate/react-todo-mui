import { CircularProgress } from '@mui/material'
import React from 'react'

export default function TodoLoader() {
	return (
		<div
			style={{
				height: '100vh',
				display: 'grid',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CircularProgress />
		</div>
	)
}
