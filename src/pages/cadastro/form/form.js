import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Seccion, Tittle } from '../style';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../config/services/api';
import cep from 'cep-promise';
import { CpfFormatCustom, PhoneFormatNumber, TelFormatNumber } from '../../../components/mask/maskCpf';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 35,
    marginBottom: 35
  },
  paper: {
    margin: 10,
    textAlign: 'center'
  },
  display: {
    display: 'flex',
    width: '100%'
  },
  formControl: {
    padding: 16,
    width: '30%',
  },
}));


export default function FullWidthGrid() {

  const notify = () => toast.error(textError, {theme: 'colored'});
  let textError = '';

  const notifySuccess = () => toast.success(textOk, {theme: 'colored'});
  let textOk = '';

  const [validObject, setValidObject] = useState();
  const {id} = useParams();
  
  let history = useHistory();

  const [show, setShow] = useState(false);

  const [nomeCompleto, setNomeCompleto] = useState();
  const [rg, setRg] = useState();
  const [cpf, setCpf] = useState();
  const [nacionalidade, setNacionalidade] = useState();
  const [dt_nascimento, setDt_Nascimento] = useState();
  const [sexo, setSexo] = useState();
  const [naturalidade, setNaturalidade] = useState();
  const [clube, setClube] = useState();
  const [telefone, setTelefone] = useState();
  const [celular, setCelular] = useState();
  const [passaporte, setPassaporte] = useState();
  const [email, setEmail] = useState();
  const [zipCode, setZipCode] = useState("");
  const [adress, setAdress] = useState({});
  const [logradouro, setLogradouro] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
  const [estado, setEstado] = useState();
  const [numero, setNumero] = useState();
  const [complemento, setComplemento] = useState();

  async function handleCadastro(){

    setValidObject({
      id,
      cpf,
      rg,
      email,
      name: nomeCompleto,
      dt_nascimento,
      naturalidade,
      clube,
      sexo,
      telefone,
      celular,
      passaporte,
      nacionalidade,
      atuacao_id,
      modalidade_id,
      categoria_id,
      cep : zipCode,
      logradouro: adress.street,
      complemento,
      bairro: adress.neighborhood,
      numero,
      cidade: adress.city,
      estado: adress.state,
      user_id: id
    })

    

    if(validate()){
      try{
        const {data} = await api.put('completar_cadastro', {
          id,
          cpf,
          rg,
          email,
          name: nomeCompleto,
          dt_nascimento,
          naturalidade,
          clube,
          sexo,
          telefone,
          celular,
          passaporte,
          nacionalidade,
          atuacao_id,
          modalidade_id,
          categoria_id,
          cep : zipCode,
          logradouro: adress.street,
          complemento,
          bairro: adress.neighborhood,
          numero,
          cidade: adress.city,
          estado: adress.state,
          user_id: id
        });
        api.post(`federacao/${id}`)
        textOk = `Seja bem vindo(a) ${data.nomeCompleto}`
        notifySuccess();
        if(!data.id){
          textError = 'Ops! Parece que o CPF ou RG já estão cadastrados no sistema.'
          notify();
        }else{
          history.push('/');
        }
      }catch(err){
        textError = err
        notify();
      }
    }else{
      if(cpf === undefined){
        textError = 'Campo CPF é obrigatório!'
        notify();
      }if(rg === undefined){
        textError = 'Campo RG é obrigatório!'
        notify();
      }if(nomeCompleto === undefined){
        textError = 'Campo Nome Completo é obrigatório!'
        notify();
      }if(dt_nascimento === undefined){
        textError = 'Campo Data de nascimento é obrigatório!'
        notify();
      }if(sexo === undefined){
        textError = 'Campo Sexo é obrigatório!'
        notify();
      }if(celular === undefined){
        textError = 'Campo Celular é obrigatório!'
        notify();
      }if(nacionalidade === undefined){
        textError = 'Campo RG obrigatório!'
        notify();
      }if(atuacao_id === undefined){
        textError = 'A Atuação é obrigatória!'
        notify();
      }if(modalidade_id === undefined){
        textError = 'A Modalidade é obrigatória!'
        notify();
      }if(categoria_id === undefined){
        textError = 'A Categoria é obrigatória!'
        notify();
      }if(zipCode === undefined){
        textError = 'Campo CEP é obrigatório!'
        notify();
      }if(adress.street === undefined){
        textError = 'Campo Logradouro é obrigatório!'
        notify();
      }if(adress.neighborhood === undefined){
        textError = 'Campo Bairro é obrigatório!'
        notify();
      }if(adress.city === undefined){
        textError = 'Campo Cidade é obrigatório!'
        notify();
      }if(adress.state === undefined){
        textError = 'Campo Estado é obrigatório!'
        notify();
      }if(adress.street === undefined){
        
      }
    }
            
}

async function handleLogout(){
    sessionStorage.clear()
    history.push('/sign');
}

  function validate(){
    if(cpf === undefined){
      return false;
    }if(rg === undefined){
      return false;
    }if(nomeCompleto === undefined){
      return false;
    }if(dt_nascimento === undefined){
      return false;
    }if(sexo === undefined){
      return false;
    }if(celular === undefined){
      return false;
    }if(nacionalidade === undefined){
      return false;
    }if(atuacao_id === undefined){
      return false;
    }if(modalidade_id === undefined){
      return false;
    }if(categoria_id === undefined){
      return false;
    }if(zipCode === undefined){
      return false;
    }if(adress.street === undefined){
      return false;
    }if(adress.neighborhood === undefined){
      return false;
    }if(adress.city === undefined){
      return false;
    }if(adress.state === undefined){
      return false;
    }if(adress.street === undefined){
      return false;
    }
    return true;
  }

  const [atuacao_id, setAtuacao] = React.useState('');
  const handleAtuacao = (event) => {
  setAtuacao(event.target.value);
  };
  
  const [modalidade_id, setModalidade] = React.useState('');
  const handleModalidade = (event) => {
  setModalidade(event.target.value);
  };
  
  const [categoria_id, setCategoria] = React.useState('');
  const handleCategoria = (event) => {
  setCategoria(event.target.value);
  };

  const classes = useStyles();

  useEffect(() => {
    async function getAddressData(){
      try{
        if(zipCode.length >= 8 ){
          const response = await cep(zipCode);
          setAdress(response);
          setShow(!show)
        }
      }catch(err){
        throw new Error(err);
      }
      
    }
    
    getAddressData();
  }, [zipCode])

// useState -> Masks
  const [values, setValues] = React.useState({
    cpf: '',
    telefone: '',
    celular: ''

  });
  const handleCpf = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setCpf(e.target.value)
  };
  const handleTel = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setTelefone(e.target.value)
  };
  const handleCel = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setCelular(e.target.value)
  };

  return (

    <Paper>
    <Box padding="20px">
      <Box justifyContent="space-between" display="flex">
        <Tittle>Cadastro</Tittle>
        <Box margin="10px">
          {/* <button type="button" className="btn" onClick={handleCadastro}>
            Salvar
          </button>
          <button type="button" className="btn btn-secondary" >
            Completar cadastro mais tarde
          </button> */}
          <Button variant="primary" onClick={handleCadastro}>Salvar</Button>{' '}
          <Button variant="secondary" onClick={handleLogout}>Completar cadastro mais tarde</Button>{' '}
        </Box>
      </Box>
      
      {/* Atuacao */}
      <Seccion>Atuação</Seccion>
      <Box justifyContent="space-between" display="flex" padding="7px 9px 9px 9px">
        <FormControl variant="filled" className={classes.formControl} >
          <InputLabel id="simple-select-filled-label">Atuacao*
          </InputLabel>
          <Select
            labelId="simple-select-filled-label"
            id="simple-select-filled"
            value={atuacao_id}
            onChange={handleAtuacao}
          >
            <MenuItem value={1}>Jogador</MenuItem>
            <MenuItem value={2}>Arbitro</MenuItem>
            <MenuItem value={3}>Técnico</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="simple-select-filled-label">Modalidade*</InputLabel>
          <Select
            labelId="simple-select-filled-label"
            id="simple-select-filled"
            value={modalidade_id}
            onChange={handleModalidade}
          >
            <MenuItem value={1}>Adulto</MenuItem>
            <MenuItem value={2}>Paradesporto</MenuItem>
            <MenuItem value={3}>Juvenil</MenuItem>
            <MenuItem value={4}>Mirim</MenuItem>
            <MenuItem value={5}>Infanto-Juvenil</MenuItem>
            <MenuItem value={6}>Infantil</MenuItem>
            <MenuItem value={7}>Master</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="simple-select-filled-label">Categoria*</InputLabel>
          <Select
            labelId="simple-select-filled-label"
            id="simple-select-filled"
            value={categoria_id}
            onChange={handleCategoria}
          >
            <MenuItem value={1}>Feminino</MenuItem>
            <MenuItem value={2}>Masculino</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Dados Pessoais */}
      <Seccion>Dados Pessoais</Seccion>
      <Grid container paddingBottom="20px" spacing={0}>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="nomeCompleto" label="Nome Completo*" variant="outlined" onChange={e => setNomeCompleto(e.target.value)}
                inputProps={{maxLength: 80}}/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="sexo" label="Sexo*" variant="outlined" onChange={e => setSexo(e.target.value)}
                inputProps={{maxLength: 12}}/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
              <TextField
                id="outlined-number"
                label="Data de Nascimento*"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={e => setDt_Nascimento(e.target.value)}
              />
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="naturalidade" label="Naturalidade" variant="outlined" onChange={e => setNaturalidade(e.target.value)}
                inputProps={{maxLength: 15}}/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={5}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="clube" label="Clube" variant="outlined" onChange={e => setClube(e.target.value)}
                inputProps={{maxLength: 25}}/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="telefone" label="Telefone" variant="outlined" onChange={handleTel}
                  value={values.telefone}
                  name="telefone"
                  InputProps={{
                    inputComponent: TelFormatNumber,
                  }}
                />
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="celular" label="Celular*" variant="outlined" onChange={handleCel}
                  value={values.celular}
                  name="celular"
                  InputProps={{
                    inputComponent: PhoneFormatNumber,
                  }}
                />
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="email" label="Email" value={sessionStorage.email} disabled onChange={e => setEmail(e.target.value)}/>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>          
        {/* Documentos */}
        <Seccion>Documentos</Seccion>
        <Grid container paddingBottom="20px" spacing={0}>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="cpf" label="CPF*" variant="outlined" onChange={handleCpf}
                  value={values.cpf}
                  name="cpf"
                  InputProps={{
                    inputComponent: CpfFormatCustom,
                  }}
                />
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="passaporte" label="Passaporte" variant="outlined" onChange={e => setPassaporte(e.target.value)}
                inputProps={{maxLength: 11}}/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="rg" label="RG*" variant="outlined" onChange={e => setRg(e.target.value)}
                inputProps={{maxLength: 9}}/>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <FormControl fullWidth> 
                <TextField id="nacionalidade" label="Nacionalidade*" variant="outlined" onChange={e => setNacionalidade(e.target.value)}
                inputProps={{maxLength: 25}}/>
            </FormControl>
          </Paper>
        </Grid>
        </Grid>

        {/* Endereço */}
        <Seccion>Endereço</Seccion>
        <Grid container paddingBottom="20px" spacing={0}>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <FormControl fullWidth> 
                  <TextField id="cep" label="CEP*" variant="outlined" onChange={(e) => {setZipCode(e.target.value)}}
                  inputProps={{maxLength: 8}}/>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <FormControl fullWidth> 
                  <TextField id="logradouro" label="Logradouro*" variant="outlined" 
                    InputLabelProps={show ? {shrink: true} : {shrink: false}} value={show ? (adress.street) : ''} 
                    onChange={e => setLogradouro(e.target.value)}
                    inputProps={{maxLength: 35}}
                  />
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <FormControl fullWidth> 
                  <TextField id="bairro" label="Bairro*" variant="outlined"
                    InputLabelProps={show ? {shrink: true} : {shrink: false}} value={show ? (adress.neighborhood) : ''} 
                    onChange={e => setBairro(e.target.value)}
                    inputProps={{maxLength: 25}}
                  />
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <FormControl fullWidth> 
                  <TextField id="complemento" label="Complemento" variant="outlined"
                    onChange={e => setComplemento(e.target.value)}
                    inputProps={{maxLength: 70}}
                  />
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <FormControl fullWidth> 
                  <TextField id="numero" label="Número" variant="outlined"
                    onChange={e => setNumero(e.target.value)}
                    inputProps={{maxLength: 4}}
                  />
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <FormControl fullWidth> 
                  <TextField id="estado" label="Estado*" variant="outlined"
                    InputLabelProps={show ? {shrink: true} : {shrink: false}} value={show ? (adress.state) : ''}
                    onChange={e => setEstado(e.target.value)}
                    inputProps={{maxLength: 2}}
                  />
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <FormControl fullWidth> 
                  <TextField id="cidade" label="Cidade*" variant="outlined"
                    InputLabelProps={show ? {shrink: true} : {shrink: false}} value={show ? (adress.city) : ''} 
                    onChange={e => setCidade(e.target.value)}
                    inputProps={{maxLength: 20}}
                  />
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
    </Box>
    </Paper>
  );
}