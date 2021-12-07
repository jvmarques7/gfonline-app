import React, { useEffect } from "react";
import {useStyles} from "./style"
import {Main} from "./style.js";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {Header} from "../header/header";
import NavBar from "../../components/navBar/style"
import Card from "@material-ui/core/Card";
import api from "../../config/services/api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {getWithExpiry} from "../../config/auth/isAuthenticated"
import { List, ListItem, Typography } from "@material-ui/core";
import logoImg from "../../../src/login.png";

function Default (){

    const notify = () => toast.warning(text);
    let text = '';

    let history = useHistory();

    try{
        if(getWithExpiry('token', 'email')===null){
            history.push("/sign");
        }
    }catch(err){
        
    }

    useEffect(() => {
        async function verifyUser(){
            try{
                const email = sessionStorage.getItem('email')
                const response = await api.get(`find_user/${email}`)
                if(response.data.cpf && sessionStorage.getItem('token')){
                    history.push('/');
                }else{
                    if(sessionStorage.getItem('token') && sessionStorage.getItem('token') !== undefined){
                        text = 'Por favor, complete seu cadastro para continuar..'
                        notify();
                        history.push(`/cadastro/${response.data.id}`)
                    }else{
                        history.push('/sign');
                    }
                }
            }catch(err){
                
            }
                }
                verifyUser();
        },[])

    const classes = useStyles();

    return(
        <div>
            <Header />
            <Main>
                <Container maxWidth='xl'>
                    <Box display='flex' className={classes.box}>
                        <NavBar />
                        <Card className={classes.card} sx={{justifyContent: 'center'}}>
                            <Box padding="50px 100px 100px 100px" maxWidth="450px" sx={{display: 'flex', justifyContent: 'center'}}>
                                <List dense={true}>
                                    <ListItem width="20px" sx={{display: 'flex', justifyContent: 'center'}}>
                                        <img src={logoImg}/>
                                    </ListItem>
                                    <ListItem sx={{display: 'flex', justifyContent: 'center'}}>
                                        <Typography sx={{textAlign: 'center'}} variant="subtitle1">
                                            Sistema de gerenciamento para Federações Esportivas.
                                        </Typography>
                                    </ListItem>
                                    <ListItem sx={{display: 'flex', justifyContent: 'center'}}>
                                        <Typography variant="body2">
                                            Versão 1.0.0
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </Main>
        </div>
    );

}

export default Default;