import React from "react";
import {
  TableContainer,
  Table,
  TablePagination,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  Typography,
  IconButton
} from "@mui/material";
import { Avatar, Checkbox, Paper } from "@mui/material";

import TablePaginationActions from "./table.pagination";
import { Edit as EditIcon } from "@mui/icons-material";

export default function TodoTable(props) {
  const {
    list,
    page,
    pageSize,
    handleCheckboxChange,
    handleChangePage,
    handleChangeRowsPerPage
  } = props;

  return (
    <TableContainer component={Paper}>
      <Table variant="simple" size="small" stickyHeader >
        <TableHead>
          <TableRow>
            <TableCell >Usuario</TableCell>
            <TableCell align="center">Tarea</TableCell>
            <TableCell align="center">Completado</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list
            .slice(page * pageSize, page * pageSize + pageSize)
            .map((listItem, indexItem) => (
              <TableRow hover={true} selected={listItem.completed} key={indexItem}>
                <TableCell align="center">
                  <Avatar name={listItem.userName} />
                </TableCell>

                <TableCell align="center">
                  <Typography
                    as={listItem.completed ? "del" : ""}
                    color={listItem.completed ? "gray" : "black"}
                  >
                    {listItem.title}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    onChange={() => handleCheckboxChange(indexItem)}
                    checked={listItem.completed}
                    color="success"
                    size="large"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton><EditIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={list.length}
              rowsPerPage={pageSize}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page"
                },
                native: true
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
