import * as React from 'react'
import { Box, Button, Paper, TextField } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { spacing } from '@mui/system'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

export default function TodoAddModal(props) {
	const { onSaving, onCancel, editing } = props
	const [title, setTitle] = React.useState(editing.title)

	if (editing.title !=='' && title === '') {
		setTitle(editing.title)
	}

	const handleChangeTitle = (e) => {
		setTitle(e.target.value)
	}

	const handleOnClickSave = () => {
		if (editing.id) {
			onSaving({ ...editing, title })
		} else onSaving({ title })
		
		setTitle('')
	}

	const handelOnClickCancel = () => {
		onCancel()
		setTitle('')
	}

	return (
		<div>
			<Box
				display="flex"
				position="absolute"
				bottom="2.5em"
				width="100%"
				left="0"
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					direction: 'row',
				}}
				flexDirection="row"
			>
				<Paper
					style={{ width: '100%', marginLeft: '15%', marginRight: '15%' }}
					elevation={12}
				>
					<Box
						display="flex"
						alignItems="center"
						flexDirection="row"
						width="100%"
					>
						<Box flexGrow="1" sx={{ m: 1 }}>
							<TextField
								placeholder="TODO"
								fullWidth
								size="small"
								variant="outlined"
								onChange={handleChangeTitle}
								value={title}
							></TextField>
						</Box>
						<Box sx={{ m: 1 }}>
							<Button
								variant="outlined"
								startIcon={<AddIcon />}
								color={editing?.id ? 'info' : 'success'}
								onClick={handleOnClickSave}
							>
								{editing?.id ? 'Editar' : 'Agregar'}
							</Button>
						</Box>
						{editing && editing.id !== '' && (
							<Box sx={{ m: 1 }}>
								<Button
									variant="outlined"
									color="error"
									onClick={handelOnClickCancel}
								>
									Cancelar
								</Button>
							</Box>
						)}
					</Box>
				</Paper>
			</Box>
		</div>
	)
}
