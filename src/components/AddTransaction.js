import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import Container from '@material-ui/core/Container'
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1),
        textAlign: 'right'
    },
    paper:{
        marginTop:10
    },
    grid:{
        display:'grid',
        justifyContent: 'right',
        gridTemplateColumns: '4fr 1fr'
    },
    right:{
        textAlign:'right'
    }
}));

const AddTransaction = (props) => {
    // initialize various form states
    const classes = useStyles();
    const history = useHistory();

    const [transactionType, setTransactionType] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');


    // function to set transaction type
    const handleTransactionTypeChange = (event) => {
        setTransactionType(event.target.value);
    }

    // handle form submission
    const handleFormSubmission = (event) => {
        event.preventDefault();
        props.handleTransaction(transactionType, amount, description, goToTransaction);
    }

    // handle amount change
    const handleAmountChange = (event) => {
        let userAmount = event.target.value;
        userAmount = Number(userAmount);
        setAmount(userAmount);
    }

    // handle description change
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const goToTransaction = () => {
        // go back to transactions page
        history.push("/");
    }

    return(
        <>
            <Container maxWidth="sm" component={Paper} className={classes.paper}>
            <form validate='true' autoComplete='off' onSubmit={handleFormSubmission}>
            <FormControl className={classes.formControl}>
                <InputLabel id="transaction-type-select-label">Transaction Type</InputLabel>
                <Select
                    labelId="transaction-type-select-label"
                    id="transaction-type-select"
                    value={transactionType}
                    required
                    onChange={handleTransactionTypeChange}
                >
                    <MenuItem value={true}>Credit</MenuItem>
                    <MenuItem value={false}>Debit</MenuItem>
                </Select>
            </FormControl>
             <FormControl className={classes.formControl}>
                <TextField
                    id="amount-field"
                    label="Amount"
                    type="number"
                    required
                    onChange={handleAmountChange}
                    max={1000}
                />
             </FormControl>
             <FormControl className={classes.formControl}>
                <TextField
                    id="description-field"
                    label="Description"
                    multiline
                    rowsMax={8}
                    required
                    onChange={handleDescriptionChange}
                />
             </FormControl>
              <div className={classes.grid}>
                  <div className={classes.right}>
                      <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.button}
                          startIcon={<SaveIcon />}
                          type='submit'
                      >Save
                      </Button>
                  </div>
                  <div>
                      <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          className={classes.button}
                          startIcon={<CancelIcon />}
                          onClick={goToTransaction}
                      > Cancel
                      </Button>
                  </div>
              </div>
                {/*<Grid container spacing={3} className={classes.button}>*/}
                {/*    <Button*/}
                {/*        item*/}
                {/*        xs={6}*/}
                {/*        variant="contained"*/}
                {/*        color="primary"*/}
                {/*        size="small"*/}
                {/*        className={classes.button}*/}
                {/*        startIcon={<SaveIcon />}*/}
                {/*        type='submit'*/}
                {/*    >Save*/}
                {/*    </Button>*/}
                {/*    <Button*/}
                {/*        item*/}
                {/*        xs={6}*/}
                {/*        variant="contained"*/}
                {/*        color="secondary"*/}
                {/*        size="small"*/}
                {/*        className={classes.button}*/}
                {/*        startIcon={<CancelIcon />}*/}
                {/*        onClick={goToTransaction}*/}
                {/*    > Cancel*/}
                {/*    </Button>*/}
                {/*</Grid>*/}
            </form>
            </Container>
        </>
    )
}

export default  AddTransaction;

