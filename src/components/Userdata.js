// import React from 'react'

import {
  Container,
  Paper,
  Box,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TablePagination,
  Modal,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";
import MaterialTable from "material-table";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { upload } from "@testing-library/user-event/dist/upload";
import { Search } from "@material-ui/icons";

const Userdata = (user) => {
  const [datas, setDatas] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  // const[users ,setUsers]=useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState([5]);
  const [search, setSearch] = useState("");
  const [sortingType, setSortingType] = useState("Assending")
  const [sorting, setSorting] = useState(-1);
  const getData = async () => {
    const options = {
      page: 1,
      limit: 10,
      sortby: { _id: -1 },
      filter: "",
      search,
      sorting,
    };
    axios
      .get(`http://localhost:4000/api/user/users`, {
        params: {
          options,
        },
      })
      .then((res) => {
        console.log("res", res);
        setDatas([...res.data.users]);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    // console.log("sorting ",sorting);
    getData(search, sorting);
  }, [search, sorting]);

  const navigate = useNavigate();

  const hadleNavigate = (user) => {
    navigate("/adduser", { state: { user: user } });
  };

  const handleDelete = async (id) => {
    // await axios
    // .delete(`/api/user/${id}`)
    // .then(response => {
    //   console.log("deleted successfully!");
    //   getData();

    // })
    setId(id);

    setOpen(true);
  };
  const DeleteId = async () => {
    let response = await axios.delete(`/api/user/${id}`);
    getData();
    setOpen(false);
  };

  const onChangePage = (event, nextpage) => {
    console.log("nextpage", nextpage);
    setPage(nextpage);
  };

  const onChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const SearchBox = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };

  const handleShort = (sort) => {
    if (sort === "Assending") {
      setSorting(1);
    } else {
      setSorting(-1);
    }

    // console.log("lfhs",sort)
  };

  return (
    <div>
      <Container className="Userlist">
        <TableContainer component={Paper}>
      
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortingType}
          label="Dessending"
          onChange={(e)=>{setSortingType(e.target.value)}}
        >
            <MenuItem value={"Assending"} onClick={() => handleShort("Assending")}>
              Assending
            </MenuItem>
            <MenuItem value={"Desending"}onClick={() => handleShort("Desending")}>
              Desending
            </MenuItem>
          </Select>
          
            
          <TextField
            id="search-bar"
            className="text"
            label="Search By name or Email"
            variant="outlined"
            placeholder="Search..."
            size="small"
            onChange={SearchBox}
          />

          <Table>
            <TableHead>
              <Button onClick={() => navigate("/adduser")} color="primary">
                Home
              </Button>

              <TableRow>
                <TableCell>FirstName</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>PhoneNo</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Uploadimage</TableCell>
              </TableRow>
            </TableHead>

            {datas?.length > 0 &&
              datas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((user) => (
                  <TableBody>
                    <TableRow key={user?._id}>
                      <TableCell>{user.Firstname}</TableCell>

                      {console.log("usrevsvcjs===>", user)}
                      <TableCell>{user.Lastname}</TableCell>
                      <TableCell>{user.Email}</TableCell>
                      <TableCell>{user.Phoneno}</TableCell>
                      <TableCell>{user.Gender}</TableCell>
                      <img
                        width="100%"
                        height="100"
                        src={`http://localhost:4000/uploads/${user.Uploadimage}`}
                      />
                      {/* {(console.log("dfjjjfjd",Modal.file))} */}
                      {/* <TableCell>{user.Uploadimage}</TableCell> */}
                      <TableCell>{user.createdAT}</TableCell>
                      <TableCell
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                      >
                        Delete
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          hadleNavigate(user);
                        }}
                        color="primary"
                      >
                        Edit
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
            count={datas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </TableContainer>
      </Container>

      {open ? (
        <PopUp setOpen={setOpen} open={open} DeleteId={DeleteId} />
      ) : null}
    </div>
  );
};

export default Userdata;
