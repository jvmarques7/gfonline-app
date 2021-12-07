import { makeStyles } from '@material-ui/styles';
import styled from 'styled-components';

export const Seccion = styled.div`
    margin: 8px;
    font-family: Arial, sans-serif;
    font-weight: bold;
    border-bottom: 1px solid black;
`

export const Tittle = styled.div`
    margin: 8px;
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
    box:{
      justifyContent: 'space-between',
    },
    card:{
      margin: 16,
      width: '100%',
      maxWidth: '1280',
      display: 'flex',
    } 
  });

  export const Main = styled.main`

  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  padding: 24px;
  `
  