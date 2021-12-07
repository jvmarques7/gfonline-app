import React, { Fragment, useEffect, useState } from "react";
import { 
    Container, 
    Card, 
    Tab, Tabs, 
    Divider, 
    Button, 
    Grid, 
    Backdrop, 
    Paper, 
    FormControl, 
    TextField,
    RadioGroup,
    Radio,
    FormControlLabel,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
    } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import NavBar from "../../components/navBar/style";
import {Main, useStyles} from "../default/style"
import { Header } from "../header/header";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tittle } from "./style";
import {getWithExpiry} from "../../config/auth/isAuthenticated"
import { useHistory } from "react-router-dom";
import api from '../../config/services/api';
import Moment from "react-moment";
import { toast } from 'react-toastify';
import CircleIcon from '@mui/icons-material/Circle';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </Box>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function tabProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

export function Calendar(){

    const erro = () => toast.error(text, {theme: 'colored'});
    const success = () => toast.success(text, {theme: 'colored'})
    var text = '';

    let history = useHistory();

    if(getWithExpiry('token', 'email') === null){
        history.push("/");
    }

    const [value, setValue] = useState(0);
    const handleTabs = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);
    const [eventId, setEventId] = useState();
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setEventId(event)
    };


    //Contrução da lista de eventos trazidos pela API
    const [eventsList, setEventsList] = useState([]);
    const [inscricoes, setInscricoes] = useState([]);
    const [participacoes, setParticipacoes] = useState([]);
    const [tipo, setTipo] = useState("");
    const [dt_inicial, setDt_inicial] = useState("");
    const [dt_final, setDt_final] = useState("");
    const [buscar, setBuscar] = useState('off');
    const [inscritos, setInscritos] = useState();
    useEffect(() => {
        const id = sessionStorage.getItem('id')
        async function atualizarEventos(){
            const { data } = await api.put('event_notsigned', {id, tipo, dt_inicial, dt_final});
            const response = await api.get("inscricao")
            setInscritos(response.data);
            setEventsList(data);
        }
        async function atualizarInscricoes(){
            const { data } = await api.put('event_signed', {id, tipo, dt_inicial, dt_final});
            setInscricoes(data);
        }
        async function atualizarParticipacoes(){
            const { data } = await api.put('event_partof', {id, tipo, dt_inicial, dt_final});
            setParticipacoes(data);
        }
        atualizarParticipacoes();
        atualizarEventos();
        atualizarInscricoes();
        setExpanded(false)
    }, [buscar]);
    
    

    //Definição do tipo de evento de acordo
    //o que é trazido pela API
    function definirTipo(e) {
        if (e === 'c') {
            return "Campeonato"
        } else {
            return "Evento"
        }
    }

    const [confirm, setConfirm] = useState(false);
    const openConfirm = () => {
        setConfirm(true)
    }
    const closeConfirm = () => {
        setConfirm(false)
    }    

    
    function isInscrito(event_id){

        var no = (<></>);
        var yes = (<></>);
        var verifyDigit = 0;

        const user_id = sessionStorage.getItem('id')
        inscritos.forEach(entry => {
            if(user_id === entry.user_id && event_id === entry.evento_id){
                verifyDigit = 1;
                yes = (
                    <CircleIcon color="success"/>
                )
            }else{
                no = (
                    <CircleIcon color="disabled"/>
                )
            }
        });

        if(verifyDigit === 1){
            return yes;
        }else{
            return no;
        }
    }

    const realizarIncricao = (id) => {

        async function salvarInscricao(){
            const user_id = sessionStorage.getItem('id')
            const evento_id = id;
            const {data} = await api.get(`federacao/${user_id}`);
            if(data.is_ativo === 's'){
                try{
                    const res = await api.post('inscricao', {evento_id, user_id})
                    text='Inscrição realizada com sucesso'
                    success();
                }catch(err){
                    text = 'Erro ao se inscrever'
                    erro();
                }
            }else{
                text = 'Inscrição não realizada! Usuário não possui federação ativa!'
                erro();
            }
            realizarBusca();
            setConfirm(false)
        }

        return(
            <Fragment>
                <Paper>
                    <Box padding="20px">
                        <Typography variant="h6" paddingBottom="20px">
                            Deseja realmente se inscrever?
                        </Typography>
                        <Typography variant="h6" paddingBottom="20px">
                            Você pode cancelar sua inscrição a qualquer momento.
                        </Typography>
                        <Grid container display="flex" paddingTop="20px">
                            <Grid item xs="auto" paddingRight="10px">
                                <Button variant="contained" onClick={salvarInscricao}>Confirmar</Button>
                            </Grid>
                            <Grid item xs="auto">
                                <Button color="warning" variant="contained" onClick={closeConfirm}>Cancelar</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Fragment>
        )
    }

    const desfazerInscricao = (id) => {
        async function removerInscricao(){
            try{
                await api.delete(`inscricao/${id}`);
                text = 'Sua inscrição nesse evento foi removida!'
                success();
            }catch(err){
                text = 'Erro ao se desinscrever!'
                erro();
            }
            realizarBusca();
            setConfirm(false)
        }

        return(
            <Fragment>
                <Paper>
                    <Box padding="20px">
                        <Typography variant="h6" paddingBottom="20px">
                            Deseja realmente remover essa inscrição?
                        </Typography>
                        <Typography variant="h6" paddingBottom="20px">
                            Você pode voltar a se inscrever quando quiser.
                        </Typography>
                        <Grid container display="flex" paddingTop="20px">
                            <Grid item xs="auto" paddingRight="10px">
                                <Button variant="contained" onClick={removerInscricao}>Confirmar</Button>
                            </Grid>
                            <Grid item xs="auto">
                                <Button color="warning" variant="contained" onClick={closeConfirm}>Cancelar</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Fragment>
        )
    }

    function listaInscricoes(){
    if(inscricoes.length !== 0){
        return (
                <>
                {inscricoes.map(e =>
                    (<Box key={e.event_id} paddingLeft="20px" style={{ listStyleType: "none" }}>
                        <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === e.event_id} onChange={handleChange(e.event_id)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '20%', flexShrink: 0 }}>
                                    #{e.event_id} - {definirTipo(e.event_tipo)}
                                </Typography>
                                <Typography sx={{ width: '35%', flexShrink: 0 }}>
                                    {e.event_titulo}
                                </Typography>
                                <Typography sx={{ width: '30%', color: 'text.secondary' }}>
                                    {"Data do evento: "}
                                    <Moment format="DD/MM/YYYY">
                                        {e.event_data}
                                    </Moment>
                                </Typography>
                                <Typography sx={{ width: '15%', color: 'text.secondary' }}>
                                    {/* {definirEstado(e.event_estado)} */}
                                </Typography>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                <Grid container paddingTop="10px">
                                        <Grid item xs={10}>
                                            {"Data do evento: "}
                                            <Moment format="DD/MM/YYYY">
                                                {e.event_data}
                                            </Moment>
                                        </Grid>
                                </Grid>
                                <br />
                                <Grid container flex="1" justifyContent="space-between">
                                    <Grid item xs={12}>Descrição: {e.event_decricao}</Grid>
                                </Grid>
                                <br />
                                <Divider />
                                <Grid container paddingTop="20px" flex="1" justifyContent="flex-end">
                                    <Grid item paddingRight="10px">
                                        <Button variant="contained" onClick={openConfirm}>Remover Inscrição</Button>
                                        <Backdrop
                                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                            open={confirm}
                                        >
                                            {desfazerInscricao(e.inscricao_id)}
                                        </Backdrop>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <br />
                    </Box>)
                    )}
                    </>
            )
        }else{
            return (
                <>
                <Box paddingBottom="20px" display="flex" justifyContent="center">
                    <Paper variant="outlined">
                        <Box padding="20px 100px 20px 100px">
                            <FormControl fullWidth>
                                <Button variant="outlined" display="flex" color="primary" 
                                style={{ cursor: 'default', pointerEvents: 'none' }}>
                                    Sem inscrições até o momento.
                                </Button>
                            </FormControl>
                        </Box>
                    </Paper>
                </Box>
                </>
            )
        }
    }

    function buttonInscricao(event_id){

        var no = (<></>);
        var yes = (<></>);
        var verifyDigit = 0;

        const user_id = sessionStorage.getItem('id')
        inscritos.forEach(entry => {
            if(user_id === entry.user_id && event_id === entry.evento_id){
                verifyDigit = 1;
                yes = (
                    <Button variant="contained" disabled>Já inscrito</Button>
                )
            }else{
                no = (
                    <Button variant="contained" onClick={openConfirm}>Inscrição</Button>
                )
            }
        });

        if(verifyDigit === 1){
            return yes;
        }else{
            return no;
        }
    }

    function listaEventos(){
        if(eventsList.length !== 0){
            return(
                <>
                <Grid container flex="1" justifyContent="center" padding="0px 0 20px 30px">
                    <Grid item>
                        <FormControlLabel label="Inscrito"
                        control={ <CircleIcon color="success"/>}/>
                    </Grid>
                    <Grid item paddingLeft="10px">
                        <FormControlLabel label="Não Inscrito" 
                        control={ <CircleIcon color="disabled"/>}/>
                    </Grid>
                </Grid>
                {eventsList.map(e =>
                    (<Box key={e.event_id} paddingLeft="10px" style={{ listStyleType: "none" }}>
                        <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === e.event_id} onChange={handleChange(e.event_id)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '20%', flexShrink: 0 }}>
                                    #{e.event_id} - {definirTipo(e.event_tipo)}
                                </Typography>
                                <Typography sx={{ width: '35%', flexShrink: 0 }}>
                                    {e.event_titulo}
                                </Typography>
                                <Typography sx={{ width: '30%', color: 'text.secondary' }}>
                                    {"Data do evento: "}
                                    <Moment format="DD/MM/YYYY">
                                        {e.event_data}
                                    </Moment>
                                </Typography>
                                <Typography sx={{ width: '15%', color: 'text.secondary' }}>
                                    {isInscrito(e.event_id)}
                                </Typography>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                <Grid container paddingTop="10px">
                                        <Grid item xs={10}>
                                            {"Data do evento: "}
                                            <Moment format="DD/MM/YYYY">
                                                {e.event_data}
                                            </Moment>
                                        </Grid>
                                </Grid>
                                <br />
                                <Grid container flex="1" justifyContent="space-between">
                                    <Grid item xs={12}>Descrição: {e.event_decricao}</Grid>
                                </Grid>
                                <br />
                                <Divider />
                                <Grid container paddingTop="20px" flex="1" justifyContent="flex-end">
                                    <Grid item paddingRight="10px">
                                        {buttonInscricao(e.event_id)}
                                        <Backdrop
                                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                            open={confirm}
                                        >
                                            {realizarIncricao(e.event_id)}
                                        </Backdrop>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <br />
                    </Box>)
                    )}
                </> 
            )
        }else{
            return(
                <>
                <Box paddingBottom="20px" display="flex" justifyContent="center">
                    <Paper variant="outlined">
                        <Box padding="20px 100px 20px 100px">
                            <FormControl fullWidth>
                                <Button variant="outlined" display="flex" color="primary" 
                                style={{ cursor: 'default', pointerEvents: 'none' }}>
                                    Sem eventos para você.
                                </Button>
                            </FormControl>
                        </Box>
                    </Paper>
                </Box>
                </>
            )
        }
    }

    function listarParticipacoes(){
        if(participacoes.length !== 0){
            return (
                <>
                {participacoes.map(e =>
                    (<Box key={e.event_id} paddingLeft="20px" style={{ listStyleType: "none" }}>
                        <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === e.event_id} onChange={handleChange(e.event_id)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '20%', flexShrink: 0 }}>
                                    #{e.event_id} - {definirTipo(e.event_tipo)}
                                </Typography>
                                <Typography sx={{ width: '35%', flexShrink: 0 }}>
                                    {e.event_titulo}
                                </Typography>
                                <Typography sx={{ width: '30%', color: 'text.secondary' }}>
                                    {"Data do evento: "}
                                    <Moment format="DD/MM/YYYY">
                                        {e.event_data}
                                    </Moment>
                                </Typography>
                                <Typography sx={{ width: '15%', color: 'text.secondary' }}>
                                    {/* {definirEstado(e.event_estado)} */}
                                </Typography>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                <Grid container paddingTop="10px">
                                        <Grid item xs={10}>
                                            {"Data do evento: "}
                                            <Moment format="DD/MM/YYYY">
                                                {e.event_data}
                                            </Moment>
                                        </Grid>
                                </Grid>
                                <br />
                                <Grid container flex="1" justifyContent="space-between">
                                    <Grid item xs={12}>Descrição: {e.event_decricao}</Grid>
                                </Grid>
                                <br />
                            </AccordionDetails>
                        </Accordion>
                        <br />
                    </Box>)
                    )}
                </>
            )
        }else{
            return(
                <Box paddingBottom="20px" display="flex" justifyContent="center">
                    <Paper variant="outlined">
                        <Box padding="20px 100px 20px 100px">
                            <FormControl fullWidth>
                                <Button variant="outlined" display="flex" color="primary" 
                                style={{ cursor: 'default', pointerEvents: 'none' }}>
                                    Você ainda não possui participações
                                </Button>
                            </FormControl>
                        </Box>
                    </Paper>
                </Box>
            )
        }
    }

    // function setDataInicial(dt) {
    //     var date = new Date(dt);
    //     setDt_inicial(
    //         date
    //     )
    // }

    // function setDataFinal(dt) {
    //     setDt_final(
    //         dt+' 21:00:00'
    //     )
    // }

    function realizarBusca(){
        if(buscar === 'on'){
            setBuscar('off')
        }else{
            setBuscar('on')
        }
    }

    return(
        <>
        <Header />
        <Main>
            <Container maxWidth='xl'>
                <Box display='flex' className={classes.box}>
                    <NavBar />
                    <Card className={classes.card} sx={{direction:"column", justifyContent:"flex-start", padding: 4, minHeight:500}}>
                        <Box width="100%">
                            <Tittle>Calendário de Eventos</Tittle>
                            <Box>
                                <Grid container flex="1" justifyContent="space-between" >
                                    <Grid item xs={12} >
                                        <FormControl fullWidth> 
                                            <Paper variant="outlined" >
                                                <Grid container padding="10px 0 0 20px" alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Button padding="10px" style={{ cursor: 'default', pointerEvents: 'none' }} 
                                                        startIcon={<FilterAltIcon />}>filtros</Button>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                                                padding="10px 20px 10px 20px" flex="1" justifyContent="flex-start" >
                                                    <Grid item xs={1} sm={2} md={3}>
                                                        <FormControl fullWidth> 
                                                            <TextField id="inicial-date" label="Inicial" type="date" 
                                                            size="small" InputLabelProps={{shrink: true}}
                                                            onChange={(event) => setDt_inicial(event.target.value)}/>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={1} sm={1} md={3}>
                                                        <FormControl fullWidth> 
                                                            <TextField id="final-date" label="Final" type="date"
                                                            size="small" InputLabelProps={{shrink: true}}
                                                            onChange={(event) => setDt_final(event.target.value)}/>
                                                        </FormControl>
                                                    </Grid>
                                                        <Grid item>
                                                        <FormControl component="fieldset" fullWidth>
                                                            <RadioGroup
                                                            row
                                                            aria-label="gender"
                                                            name="row-radio-buttons-group"
                                                            onChange={(event) => setTipo(event.target.value)}
                                                            >
                                                            <FormControlLabel
                                                                value="c"
                                                                control={<Radio />}
                                                                label="Campeonato"
                                                            />
                                                            <FormControlLabel
                                                                value="e"
                                                                control={<Radio />}
                                                                label="Evento"
                                                            />
                                                            <FormControlLabel
                                                                defaultChecked={true}
                                                                value=""
                                                                control={<Radio />}
                                                                label="Todos"
                                                            />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button variant="contained"
                                                        onClick={realizarBusca}>Buscar</Button>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                            <br/>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleTabs} aria-label="basic tabs example">
                                    <Tab label="Eventos Disponíveis" {...tabProps(0)} onClick={realizarBusca}/>
                                    <Tab label="Inscrições" {...tabProps(1)} onClick={realizarBusca}/>
                                    <Tab label="Participações" {...tabProps(2)} onClick={realizarBusca}/>
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    {listaEventos()}
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    {listaInscricoes()}
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    {listarParticipacoes()}
                                </TabPanel>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            </Container>
        </Main>
        </>
    );


}