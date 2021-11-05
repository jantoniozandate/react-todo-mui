import React, { useEffect, useState } from 'react'

import { Container, CircularProgress, Typography, Box } from '@mui/material'

import { getTodo, updateTodo } from '../../services/api'

import TodoTable from './todo.table'
import TodoLoader from './todo.loader'

export default function Todo() {
	const [list, setList] = useState([])
	const [page, setPage] = useState(0)
	const [isLoading, setLoading] = useState(true)
	const [pageSize, setPageSize] = useState(10)
	const [element, setElement] = useState({})
	const [isEditing, setEditing] = useState({})
	const [isSaving, setSaving] = useState({})

	useEffect(() => {
		async function getTodoList() {
			const [result, error] = await getTodo()

			if (error) return null

			setList(result)
			setLoading(false)
		}

		getTodoList()
	}, [isSaving])

	const handleCheckboxChange = (indexList) => {
		const realIndex = page * pageSize + indexList
		let todoEdit = null
		const newList = list.map((item, index) => {
			if (index === realIndex) {
				todoEdit = { ...item, completed: !item.completed }
				return todoEdit
			}
			return item
		})

		updateTodo(todoEdit)
		setList(newList)
	}

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * pageSize - list.length) : 0

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setPageSize(parseInt(event.target.value, 10))
		setPage(0)
	}

	if (isLoading)
		return (
			<TodoLoader />
		)

	return (
		<Container>
			<Box
				display="flex"
				justifyContent="center"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
			>
				<Box>
					<Typography fontSize="2rem" fontWeight="700" fontFamily="Segoe UI">
						Lista de tareas
					</Typography>
				</Box>
				<Box borderWidth="1px" borderRadius="xl">
					<TodoTable
						list={list}
						page={page}
						pageSize={pageSize}
						handleCheckboxChange={handleCheckboxChange}
						handleChangePage={handleChangePage}
						handleChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</Box>
			</Box>
		</Container>
	)
}
