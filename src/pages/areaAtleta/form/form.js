import React, { useState , useEffect} from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Tittle } from '../style';
import api from '../../../config/services/api';
import { toast } from 'react-toastify';
import Moment from 'react-moment'
import 'moment-timezone';
import Backdrop from '@mui/material/Backdrop';
import CancelIcon from '@mui/icons-material/Cancel';

const useStyles = makeStyles((theme) => ({
    paper:{
      margin: 16,
      padding: 16,
      width: 225,
      maxHeight: 300,
      // background: 'green'
    }
  }));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  background: "linear-gradient(rgb(245,245,245), white)"
}));

const Info = styled(Grid)(({ theme }) => ({
  direcition: "column",
  justifyContent: "flex-start"
}));


export default function FormAreaAtleta() {

    const notify = () => toast.success(text, {theme: 'colored'});
    let text = '';

    const [loadingEnd, setLoadingEnd] = useState(false);
    const [loadingMod, setLoadingMod] = useState(false);
    const [loadingAtu, setLoadingAtu] = useState(false);
    const [loadingCat, setLoadingCat] = useState(false);

//Carregar User
    const [user, setUser] = useState({});
    const [confirm, setConfirm] = useState(false);
    const [open, setOpen] = useState(false);
    const [eventos, setEventos] = useState([]);
    const [campeonatos, setCampeonatos] = useState([]);
    useEffect(() => {
        async function loadUser() {
            try {
                const {data} = await api.get(`find_user/${sessionStorage.email}`);
                setUser({
                    ...data
                });
                setLoadingMod(true)
                setLoadingEnd(true)
                setLoadingAtu(true)
                setLoadingCat(true)
                verifyFederation()
            } catch (err) {
                toast.error(err);
            }
        }
        async function buscarEventos(){
            const user_id = sessionStorage.getItem('id');
            const { data } = await api.put('historico_list', {tipo: 'e', user_id})
            setEventos(data) 
        }
        async function buscarCampeonatos(){
            const user_id = sessionStorage.getItem('id');
            const { data } = await api.put('historico_list', {tipo: 'c', user_id})
            setCampeonatos(data) 
        }
        loadUser();
        buscarEventos()
        buscarCampeonatos()
    }, [confirm, open]);

//Carregar Endereço
    const [endereco, setEndereco] = useState({});
    useEffect(() => {
        async function loadEndereco() {
            try {
                const user_id = await user.id;
                const {data} = await api.get(`endereco/${user_id}`);
                
                setEndereco({
                    ...data
                });
                
            } catch (err) {
                toast.error(err);
            }
        }
        loadEndereco();
    }, [loadingEnd]);    
   
//Carregar Atuacao
    const [atuacao, setAtuacao] = useState({});
    useEffect(() => {
        async function loadAtuacao() {
            try {
                const atuacao_id = await user.atuacao_id
                const {data} = await api.get(`atuacao/${atuacao_id}`);
                
                setAtuacao({
                    ...data
                });
                
            } catch (err) {
                toast.error(err);
            }
        }
    loadAtuacao();
    }, [loadingAtu]);

//Carregar Modalidade
    const [modalidade, setModalidade] = useState({});
    useEffect(() => {
    async function loadModalidade() {
        try {
            const modalidade_id = await user.modalidade_id
            // alert(modalidade_id)
            const {data} = await api.get(`modalidade/${modalidade_id}`);
            
            setModalidade({
                ...data
            });
        } catch (err) {
            toast.error(err);
        }
    }
    loadModalidade();
}, [loadingMod]);

//Carregar Categoria
    const [categoria, setCategoria] = useState({});
    useEffect(() => {
        async function loadCategoria() {
            try {
                const categoria_id = await user.categoria_id
                const {data} = await api.get(`categoria/${categoria_id}`);
                
                setCategoria({
                    ...data
                });
            } catch (err) {
                toast.error(err);
            }
        }
        loadCategoria();
    }, [loadingCat]);

    //Calcular Idade
    function getAge(dt) {
        var today = new Date();
        var birthDate = new Date(dt);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const classes = useStyles;

    const [federacao, setFederacao] = useState({});

    async function verifyFederation(){
        const { data } = await api.get(`federacao/${sessionStorage.getItem('id')}`)
        if(data){
            const is_ativo = data.is_ativo;
            const is_federado = data.is_federado
            const user_id = data.user_id
            setFederacao( { is_ativo, is_federado, user_id } );
        }else{
            setFederacao()
        }
    }

    function createFederation(){
        setConfirm(true)
        return "Federado com sucesso!"
    }

    async function confirmCreate(){
        await api.post(`federacao/${sessionStorage.getItem('id')}`);
        setConfirm(false)
        setOpen(false)
        text = 'Federação realizada com sucesso!'
        notify();
    }

    async function controlFederation(){
        setConfirm(true)
    }

    async function confirmAtivacao(){
        await api.put(`federacao/${sessionStorage.getItem('id')}`);
        setConfirm(false)
        setOpen(false)
        text = 'Ativação realizada com sucesso!'
        notify();
    }

    function closeConfirm(){
        setConfirm(false)
    }

    function dataFormatada(dt){
        var data = new Date(dt),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
        return (diaF+"/"+mesF+"/"+anoF)
    }

    const federar = () => {
        if(!federacao){
            return(
                <Paper className={classes.paper}>
                    <Box padding="20px" width="400px">
                        <Typography variant="h6"><b>FEDERAÇÃO</b></Typography>
                        <Typography paddingBottom="10px">Situação</Typography>
                        <Button variant="contained" color="error"
                        style={{ cursor: 'default', pointerEvents: 'none' }}>NÃO FEDERADO</Button>
                        <Typography paddingTop="10px" paddingBottom="10px">Você ainda não está federado. Deseja federar-se?</Typography>
                        <Divider />
                        <br />
                        <Grid container flex="1" justifyContent="space-between">
                            <Button variant="contained" color="primary"
                            onClick={createFederation}>Realizar Federação</Button>
                                <Dialog
                                    open={confirm}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    >
                                    <DialogTitle id="alert-dialog-title">
                                    <b>Confirmar Federação</b>
                                    </DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description"> 
                                    <b>Esta ação não pode ser desfeita. Deseja continuar?</b>
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button color="primary" onClick={closeConfirm}>Cancelar</Button>
                                    <Button color="primary" onClick={confirmCreate} autoFocus>
                                        Federar
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            <Button variant="contained" color="warning"
                            onClick={handleClose}>Voltar</Button>
                        </Grid>
                    </Box>
                </Paper>
            );
        }else if(federacao.is_ativo === "n"){
            return(
                <Paper className={classes.paper}>
                    <Box padding="20px" width="400px">
                        <Grid container flex="1" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h6"><b>FEDERAÇÃO</b></Typography>
                            </Grid>
                            <Grid item>
                            <IconButton color="inherit" onClick={handleClose} component="span">
                                <CancelIcon/>
                            </IconButton>
                            </Grid>
                        </Grid>
                        <Typography paddingBottom="10px">Situação</Typography>
                        <Button variant="contained" color="warning"
                        style={{ cursor: 'default', pointerEvents: 'none' }}>NÃO ATIVO</Button>
                        <Typography paddingTop="10px" paddingBottom="10px">
                            Sua Federação está desativada.</Typography>
                        <Typography paddingBottom="10px">
                            Para ativá-la, faça o pagamento da anuidade junto a Federação. Assim que debitado, sua federação será ativada.
                        </Typography>
                    </Box>
                </Paper>
            );
        }else{
            return(
                <Paper className={classes.paper}>
                    <Box padding="20px" width="200px">
                        <Grid container flex="1" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h6"><b>FEDERAÇÃO</b></Typography>
                            </Grid>
                            <Grid item>
                            <IconButton color="inherit" onClick={handleClose} component="span">
                                <CancelIcon/>
                            </IconButton>
                            </Grid>
                        </Grid>
                        <Typography paddingBottom="10px">Situação</Typography>
                            <Button variant="contained" color="success"
                            style={{ cursor: 'default', pointerEvents: 'none' }}>ATIVO</Button>
                        <Typography paddingTop="10px" paddingBottom="10px">Sua Federação está ativa.</Typography>
                    </Box>
                </Paper>
            );
        }
    }

  return (

    <div>
      <Box sx={{ width: "100%", direction:"column", alignContent:"center", justifyContent:"center"  }}>
        <Box justifyContent="space-between" display="flex">
            <Tittle>Cadastro</Tittle>
            <Box padding="10px">
                <Button variant="contained" onClick={handleToggle}>Situação com a Federação</Button>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={verifyFederation}
                >
                    {federar()}
                </Backdrop>
            </Box>
        </Box>
          <Grid sx={{padding: '0 20px 20px 20px'}} container rowSpacing={1.5} columnSpacing={2}>
              <Grid item xs={12}>
                  <Item sx={{fontWeight: "bold", background: "linear-gradient(lightblue, white)"}}>
                      TIPO DE CADASTRO
                  </Item>
              </Grid>
              <Grid item xs={4}>
                  <Item>
                      <Info container>Atuação: {atuacao.atuacao}</Info>
                  </Item>
              </Grid>
              <Grid item xs={4}>
                  <Item>
                      <Info container>Modalidade: {modalidade.modalidade}</Info>
                  </Item>
              </Grid>
              <Grid item xs={4}>
                  <Item>
                      <Info container>Categoria: {categoria.categoria}</Info>
                  </Item>
              </Grid>
          </Grid>
          <Grid sx={{padding: '20px'}} container rowSpacing={1.5} columnSpacing={2}>
              <Grid item xs={12}>
                  <Item sx={{fontWeight: "bold", background: "linear-gradient(lightblue, white)"}}>
                      DADOS PESSOAIS
                  </Item>
              </Grid>
              <Grid item xs={8}>
                  <Item>
                      <Info container>Nome Completo: {user.nomeCompleto}</Info>
                  </Item>
              </Grid>
              <Grid item xs={4}>
                  <Item>
                      <Info container>Sexo: {user.sexo}</Info>
                  </Item>
              </Grid>
              <Grid item xs={4}>
                  <Item>
                      <Info container><span>
                        Idade:{" "+ getAge(user.dt_nascimento) +" anos ("}
                        <Moment format="DD/MM/YYYY">
                             {user.dt_nascimento}
                        </Moment>
                        {")"}
                        </span>
                    </Info>
                  </Item>
              </Grid>
              <Grid item xs={3}>
                  <Item>
                      <Info container>Naturalidade: {user.naturalidade}</Info>
                  </Item>
              </Grid>
              <Grid item xs={5}>
                  <Item>
                      <Info container>Clube: {user.clube}</Info>
                  </Item>
              </Grid>
              <Grid item xs={3}>
                  <Item>
                  <Info container>Telefone: {user.telefone}</Info>
                  </Item>
              </Grid>
              <Grid item xs={3}>
                  <Item>
                      <Info container>Celular: {user.celular}</Info>
                  </Item>
              </Grid>
              <Grid item xs={6}>
                  <Item>
                      <Info container>Email: {user.email}</Info>
                  </Item>
              </Grid>
          </Grid>
          <Grid sx={{padding: '20px'}} container rowSpacing={1.5} columnSpacing={2}>
              <Grid item xs={12}>
                  <Item sx={{fontWeight: "bold", background: "linear-gradient(lightblue, white)"}}>
                      DOCUMENTOS
                  </Item>
              </Grid>
              <Grid item xs={3}>
                  <Item>
                      <Info container>CPF: {user.cpf}</Info>
                  </Item>
              </Grid>
              <Grid item xs={3}>
                  <Item>
                      <Info container>RG: {user.rg}</Info>
                  </Item>
              </Grid>
              <Grid item xs={3}>
                  <Item>
                      <Info container>Passaporte: {user.passaporte}</Info>
                  </Item>
              </Grid>
              <Grid item xs={3}>
                  <Item>
                      <Info container>Naturalidade: {user.naturalidade}</Info>
                  </Item>
              </Grid>
          </Grid>
          <Grid sx={{padding: '20px'}} container rowSpacing={1.5} columnSpacing={2}>
              <Grid item xs={12}>
                  <Item sx={{fontWeight: "bold", background: "linear-gradient(lightblue, white)"}}>
                      ENDEREÇO
                  </Item>
              </Grid>
              <Grid item xs={6}>
                  <Item>
                      <Info container>Logradouro: {endereco.logradouro}</Info>
                  </Item>
              </Grid>
              <Grid item xs={4}>
                  <Item>
                      <Info container>Bairro: {endereco.bairro}</Info>
                  </Item>
              </Grid>
              <Grid item xs={2}>
                  <Item>
                      <Info container>CEP: {endereco.cep}</Info>
                  </Item>
              </Grid>
              <Grid item xs={5}>
                  <Item>
                      <Info container>Complemento: {endereco.complemento}</Info>
                  </Item>
              </Grid>
              <Grid item xs={2}>
                  <Item>
                      <Info container>Número: {endereco.numero}</Info>
                  </Item>
              </Grid>
              <Grid item xs={2}>
                  <Item>
                      <Info container>Estado: {endereco.estado}</Info>
                  </Item>
              </Grid>
              <Grid item xs={3}>
                  <Item>
                      <Info container>Cidade: {endereco.cidade}</Info>
                  </Item>
              </Grid>
          </Grid>

          {/* -----> Histórico <------ */}
          <Tittle>Histórico</Tittle>
          <Grid sx={{padding: '0 20px 20px 20px'}} container rowSpacing={1.5} columnSpacing={2}>
              <Grid item xs={12}>
                  <Item sx={{fontWeight: "bold", background: "linear-gradient(lightblue, white)"}}>
                      CAMPEONATOS
                  </Item>
              </Grid>
              {campeonatos.map(c => (
                <Grid item xs={12}>
                  <Item sx={{textAlign: "start"}}>
                      <Info container sx={{justifyContent: "space-between"}}>
                          <Grid item xs={6}>Título: {c.titulo}</Grid>
                          <Grid item >Colocação:{' '}{c.colocacao}°{' '}Lugar</Grid>
                          <Grid item >Data: {dataFormatada(c.data_evento)}</Grid>
                          <Grid item padding="10px 0 10px 0" xs={12}><Divider  width="100%"/></Grid>
                          <Grid item xs={12}>Descrição: {c.descricao}</Grid>
                      </Info>
                  </Item>
                </Grid>
              ))}
              <Grid item xs={12}>
                  <Item sx={{fontWeight: "bold", background: "linear-gradient(lightblue, white)"}}>
                      EVENTOS
                  </Item>
              </Grid>
              {eventos.map(e => (
                <Grid item xs={12}>
                    <Item sx={{textAlign: "start"}}>
                        <Info container sx={{justifyContent: "space-between"}}>
                            <Grid item xs={8}>Título: {e.titulo}</Grid>
                            <Grid item >Data: {dataFormatada(e.data_evento)}</Grid>
                            <Grid item padding="10px 0 10px 0" xs={12}><Divider  width="100%"/></Grid>
                            <Grid item xs={12}>Descrição: {e.descricao}</Grid>
                        </Info>
                    </Item>
                </Grid>
              ))}
          </Grid>
      </Box>
    </div>
  );
}