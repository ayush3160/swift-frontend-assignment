import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { Comment, useTableData } from "./hook";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

function Home() {
  const {
    commentsPerPage,
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    sortField,
    sortOrder,
    handleSortChange,
    totalRecords,
    search,
    handleSearchChange,
  } = useTableData();

  return (
    <Box>
      <Box mx={"5%"} my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSortChange("postId");
          }}
          endIcon={
            sortOrder === "desc" && sortField === "postId" ? (
              <ArrowDownward />
            ) : (
              <ArrowUpward />
            )
          }
          sx={{ mr: 2 }}
        >
          Sort Post Id
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSortChange("name");
          }}
          endIcon={
            sortOrder === "asc" && sortField === "name" ? (
              <ArrowDownward />
            ) : (
              <ArrowUpward />
            )
          }
          sx={{ mr: 2 }}
        >
          Sort Name
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSortChange("email");
          }}
          endIcon={
            sortOrder === "asc" && sortField === "email" ? (
              <ArrowDownward />
            ) : (
              <ArrowUpward />
            )
          }
          sx={{ mr: 2 }}
        >
          Sort Email
        </Button>
        <TextField
          variant="outlined"
          sx={{ float: "right", width: "30%", marginBottom: "10px" }}
          placeholder="Enter name , email , phone"
          value={search}
          onChange={handleSearchChange}
        />
      </Box>
      <Box mx={"5%"}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="a dense table">
            <TableHead
              sx={{
                backgroundColor: "grey.400",
                height: "60px",
              }}
            >
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Post Id
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commentsPerPage.map((row: Comment) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.postId}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.body.slice(0, 100) + "..."}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    10,
                    50,
                    100,
                    { label: "All", value: -1 },
                  ]}
                  colSpan={3}
                  count={totalRecords}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={(_e, newPage) => {
                    setPage(newPage);
                    localStorage.setItem("page", newPage.toString());
                  }}
                  onRowsPerPageChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    localStorage.setItem("rowsPerPage", e.target.value);
                  }}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Home;
