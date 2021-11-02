import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  TableContainer,
  Table,
  TablePagination,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableFooter
} from "@mui/material";
import {
  Container,
  CircularProgress,
  Typography,
  Box,
  Avatar,
  Checkbox,
  Button,
  ButtonGroup,
  Paper
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import getTodo from "./api";

import TodoTable from "./todo.table";

export default function Todo() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [element, setElement] = useState({});
  const [isEditing, setEditing] = useState({});
  const [isSaving, setSaving] = useState({});

  useEffect(() => {
    async function getTodoList() {
      const [result, error] = await getTodo();

      if (error) return null;

      setList(result);
      setLoading(false);
    }

    getTodoList();
  }, [isSaving]);

  const handleCheckboxChange = (indexList) => {
    const realIndex = page * pageSize + indexList;
    const newList = list.map((item, index) => {
      if (index === realIndex) return { ...item, completed: !item.completed };
      return item;
    });

    setList(newList);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * pageSize - list.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading)
    return (
      <div
        style={{
          height: "100vh",
          display: "grid",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CircularProgress
        // thickness="4px"
        // speed="0.65s"
        // emptyColor="gray.200"
        // color="blue.500"
        // size="xl"
        />
      </div>
    );

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
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
  );
}
