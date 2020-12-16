import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from "@material-ui/core/Container";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
   table: {
      minWidth: 650,
   },
   container:{
      padding:10
   },
   tableHead:{
      background:'gainsboro'
   }
});


const Transactions = (props) => {
   const classes = useStyles();
   const [rows,setRows] = React.useState([]);

   React.useEffect(() => {
      sortTransactions();

   },[props.transactionList]);



   const sortTransactions = () => {
      let enteries = props.transactionList ? props.transactionList.sort((entry1, entry2)=>{
         let firstRowDate = new Date(entry1.date);
         let secondRowDate = new Date(entry2.date);
         return secondRowDate.getTime() - firstRowDate.getTime();
      }) : [];
      setRows(enteries);
   }



   return(
         <>
            <Container width="xl" className={classes.container}>
               <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                     <TableHead className={classes.tableHead}>
                        <TableRow >
                           <TableCell align="left">Date</TableCell>
                           <TableCell align="left">Description</TableCell>
                           <TableCell align="left">Credit</TableCell>
                           <TableCell align="left">Debit</TableCell>
                           <TableCell align="left">Running Balance</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {rows? rows.map((row) => (
                            <TableRow key={row.date}>
                               <TableCell component="th" scope="row" align="left">
                                  {row.date.toString().substring(0,10)}
                               </TableCell>
                               <TableCell align="left">{row.description}</TableCell>
                               <TableCell align="left">{row.transactionType === 'Credit' ? 'Credit' : '-'}</TableCell>
                               <TableCell align="left">{row.transactionType === 'Debit' ? 'Debit': '-'}</TableCell>
                                 <TableCell align="left">{row.runningBalance}</TableCell>
                            </TableRow>
                        )): ''}
                     </TableBody>
                  </Table>
               </TableContainer>
            </Container>
         </>
   )
}

export default Transactions;