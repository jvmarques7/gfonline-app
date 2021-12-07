import React, {useEffect, useState} from "react";
import api from '../../../config/services/api'
import loginImg from "../../../FGB.png";
import { useHistory } from "react-router-dom";
import {Box} from "@material-ui/core"
import { Snackbar, Stack } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { toast } from "react-toastify";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

 export function Login (props) {
 
    useEffect(() => {
      function load(){
          if(sessionStorage.getItem('token')!==null){
            history.push('/');
          }
      }
      load()
    }, []);

  function setWithExpiry(key, token, ttl) {
    const now = new Date()
  
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: token,
      expiry: now.getTime() + ttl,
    }
    sessionStorage.setItem(key, JSON.stringify(item))
  }

  const notify = () => toast.success(textLogin, {theme: 'colored'});
  let textLogin = '';
  const notifyWarning = () => toast.warning(textLogin);
  let history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [open, setOpen] = useState(false)

   async function handleLogin(){
    const {data} = await api.post('login', {email, password});
    
    if(data.token){
      const response = await api.get(`find_user/${email}`);
      setWithExpiry('token', data.token, 1800000);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('id', response.data.id)
      if(response.data.cpf){
        textLogin = `Seja bem vindo(a) ${response.data.nomeCompleto}`
        notify();
        history.push('/');
      }else{
        textLogin = 'Seja bem vindo(a)'
        notify();
        textLogin = 'Por favor, complete seu cadastro para continuar..'
        notifyWarning();
        history.push(`/cadastro/${response.data.id}`)
      }
    }else{
        handleClickOpen();
        history.push('/sign');
    }
  }
      const handleClickOpen = () => {
      setOpen(true);
      };

      const handleClose = () => {
      setOpen(false);
      };
    
    return (
      <div className="base-container" ref={props.containerRef}>
        <div className="header">Login</div>
        <Box className="content" paddingTop="30px">
          <div className="image">
            <img src={loginImg}/>
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} 
              maxLength="50"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input type="password" name="senha" placeholder="senha"  onChange={e => setPassword(e.target.value)}
              maxLength="25"/>
            </div>
          </div>
        </Box>
        <div className="footer">
          <button type="button" className="btn" onClick={handleLogin}>
            Login
          </button>
          <Stack spacing={2} sx={{ width: '100%' }}>
                        <Snackbar open={open} anchorOrigin={{vertical: "top", horizontal: "right"}} autoHideDuration={3000} onClose={handleClose}>
                            <Alert 
                            onClose={handleClose} 
                            severity="error" 
                            sx={{ width: '100%' }}>
                            Usuário/Senha incorreta! Tente novamente.
                            </Alert>
                        </Snackbar>
                    </Stack>
        </div>
      </div>
    );
  
}
