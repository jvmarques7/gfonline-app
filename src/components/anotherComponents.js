import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

// export const Main = styled.main`

// scroll-behavior: smooth;
// -webkit-font-smoothing: antialiased;
// padding: 24px;
// `

export const component = makeStyles({
    card:{
        margin: 16,
        width: '100%',
        maxWidth: '1280',
        display: 'flex',
        padding: 16,
    },
    box:{
        justifyContent: 'space-between',
      }
})

export const Main = styled.main`
scroll-behavior: smooth;
-webkit-font-smoothing: antialiased;
padding: 24px;
`