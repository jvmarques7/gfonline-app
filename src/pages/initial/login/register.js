import React, {useState} from "react";
import loginImg from "../../../FGB.png";
import api from '../../../config/services/api';
import { useHistory } from "react-router-dom";
import {Box} from "@material-ui/core"
import { toast } from "react-toastify";
import validator from 'validator'

export function Register (props){

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

  const notify = () => toast.error(textError, {theme: 'colored'});
  let textError = '';

  let history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [senhaConfirm, setSenhaConfirm] = useState();
  
  async function handleRegister(){
    
    if(validate()){
      await api.post('user', {email, password}).then(async({data}) => {
        await api.post('endereco', {user_id: data.id});
        setWithExpiry('token', data.token, 1800000);
        sessionStorage.setItem('id', data.id);
        sessionStorage.setItem('email', data.email);
        history.push(`/cadastro/${data.id}`);
      }).catch((err)=>{
        textError = 'Ops! Parece que esse usuário já existe.'
        notify();
      });
    }else{
      if(email === undefined || !validator.isEmail(email)){
        textError = 'Insira um email válido!'
        notify();
      }if(password === undefined){
        textError = 'Insira uma senha válida!'
        notify();
      }else if(!validator.isStrongPassword(password ,{minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0})){
        textError = 'A senha precisa ter no mínimo 8 caracteres.'
        notify();
      }
      if(senhaConfirm !== password){
        textError = 'As senhas não coincidem!'
        notify();
      }
    }
  }

  function validate(){
    if(email === undefined){
      return false;
    }else if(!validator.isEmail(email)){
      return false;
    }
    if(password === undefined){
      return false;
    }else if(!validator.isStrongPassword(password ,{minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0})){
      return false;
    }
    if(senhaConfirm === undefined){
      return false;
    }if(senhaConfirm !== password){
      return false;
    }
    return true;
  }
  
  

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Registre-se</div>
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
            <input type="password" name="senha" placeholder="senha" onChange={e => setPassword(e.target.value)}
            maxLength="25"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Repita sua senha</label>
            <input type="password" name="senha2" placeholder="senha" onChange={e => setSenhaConfirm(e.target.value)} 
            maxLength="25"/>
          </div>
        </div>
      </Box>
      <div className="footer">
        <button type="button" className="btn" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

