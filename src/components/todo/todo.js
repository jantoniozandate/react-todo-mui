import React, { useEffect, useState } from 'react'

import { Container, Button, Typography, Box } from '@mui/material'

import { addTodo, getTodo, updateTodo } from '../../services/api'

import TodoTable from './todo.table'
import TodoLoader from './todo.loader'
import TodoAdd from './todo.add'

export default function Todo() {
	const [list, setList] = useState([])
	const [page, setPage] = useState(0)
	const [isLoading, setLoading] = useState(true)
	const [pageSize, setPageSize] = useState(10)
	const [isSaving, setSaving] = useState({})
	const [editing, setEditing] = useState({
		title: '',
		id: '',
		completed: false,
		userId: null,
	})
	const [modalAdd, setModalAdd] = React.useState(false)

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

	const handleSaving = async ({ title, id, completed }) => {
		let [result, error] = [null, null]
		setEditing({
			title: '',
			id: '',
			completed: false,
			userId: null,
		})
		if (id) {
			;[result, error] = await updateTodo({
				id: id,
				title: title,
				completed: completed,
			})
		} else {
			;[result, error] = await addTodo({
				title: title,
				completed: false,
			})
		}

		if (error) return null
		setSaving(result)
	}

	const handleActionEdit = (indexList) => {
		const realIndex = page * pageSize + indexList
		const todoEdit = list[realIndex]
		setEditing({
			title: todoEdit.title,
			id: todoEdit.id,
			completed: todoEdit.completed,
			userId: todoEdit.userId,
		})
	}

	const handleCancel = () => {
		setEditing({
			title: '',
			id: '',
			completed: false,
			userId: null,
		})
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

	if (isLoading) return <TodoLoader />

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
				<Box display="flex" marginTop="10">
					<Box sx={{ flexGrow: 1 }}>
						<Typography fontSize="2rem" fontWeight="700" fontFamily="Segoe UI">
							Lista de tareas
						</Typography>
					</Box>
				</Box>
				<Box borderWidth="1px" borderRadius="xl">
					<TodoTable
						list={list}
						page={page}
						pageSize={pageSize}
						handleCheckboxChange={handleCheckboxChange}
						handleChangePage={handleChangePage}
						handleChangeRowsPerPage={handleChangeRowsPerPage}
						handleActionEdit={handleActionEdit}
					/>
				</Box>
			</Box>
			<TodoAdd
				editing={editing}
				onSaving={handleSaving}
				onCancel={handleCancel}
			/>
		</Container>
	)
}
