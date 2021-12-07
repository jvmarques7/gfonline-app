import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

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
    display: 'flex'
  } 
});

export const Main = styled.main`

scroll-behavior: smooth;
-webkit-font-smoothing: antialiased;
padding: 24px;
`

export const Container = styled.div`

    align-items: center;
    justify-content: space-between;
    height: 100vh;
    box-shadow: darkgreen 0 7px;
    margin-left: 1rem;
    margin-right: 1rem;
    display: flex;
    gap: 2rem;
    padding: 0 300px;


.image{
    display: flex;
}

.text {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    text-align: center;
}

.title {
    font: 700 var(--title-font-size) var(--title-font);
    color: var(--title-color);
    -webkit-font-smoothing: auto;
}
#home .image img {
    position: relative;
    right: 2.93rem;
  }
  
  #home .image img,
  #home .image::before {
    border-radius: 0.25rem;
  }
`

export const Paper = styled.div`
  padding: 16px;
` 

export const Image = styled.div`

`
