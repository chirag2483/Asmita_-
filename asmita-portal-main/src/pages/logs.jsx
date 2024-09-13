import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';

function createData(logs) {
  return { logs };
}

function convertUTCtoIST(utcDateString) {
  var utcDateTime =
    new Date(utcDateString).toLocaleTimeString() + ', ' + new Date(utcDateString).toDateString();
  return utcDateTime;
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const [loaded, setDataLoaded] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setDataLoaded(false);
    let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    console.log('loading');
    axios
      .get('https://app-admin-api.asmitaiiita.org/api/logs', config)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setDataLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);
  if (loaded) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Enrollment No</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Changes at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.enrollment_no}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.details}
                </TableCell>
                <TableCell component="th" scope="row">
                  {convertUTCtoIST(row.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <h1>loading</h1>;
  }
}
