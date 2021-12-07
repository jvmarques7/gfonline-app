import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FormControl, TextField } from '@material-ui/core';
// import api from '../../../config/services/api';
// import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: 10,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  
  // let history = useHistory();

  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();

  // async function handleCadastro(){
  //   const {data} = await api.post('user', {email, password});
  //   localStorage.getItem('token', data.token);
  //   history.push('/home');
  // }
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="nomeCompleto" label="Nome Completo" variant="outlined"/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="cpf" label="CPF" variant="outlined"/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="rg" label="RG" variant="outlined"/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
              <TextField
                id="outlined-number"
                label="Data de Nascimento"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="nacionalidade" label="Nacionalidade" variant="outlined"/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="endereco" label="Endereço" variant="outlined"/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

{/* <FormControl fullWidth> 
<TextField id="outlined-basic" label="Outlined" variant="outlined"/>
</FormControl> */}