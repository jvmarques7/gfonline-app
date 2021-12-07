import { makeStyles } from '@material-ui/styles';
import styled from 'styled-components';

export const Seccion = styled.div`
    margin: 8px;
    font-family: Arial, sans-serif;
    font-weight: bold;
    border-bottom: 1px solid black;
`

export const Tittle = styled.div`
    margin: 20px 0 0 20px;
    margin-bottom: 25px;
    font-family: Arial, sans-serif;
    font-weight: bold;
    font-size: 2em;
`

export const useStyles = makeStyles({
    paper:{
      margin: 16,
      padding: 16,
      width: 275,
      maxHeight: 300,
    },
    card:{
      margin: 16,
      width: '100%',
      maxWidth: '1280'
    } 
  });
  
  