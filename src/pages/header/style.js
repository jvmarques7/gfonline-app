import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
//import SvgIcon from '@material-ui/core/SvgIcon';


export const HeaderHome = styled.header`

    background: rgb(216, 253, 216);
    width: 100%;
    box-shadow: darkgreen 0 7px;
    position: flex;
;
.toolbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 50px;
}

.logo{
    display: flex;
}

.menu{
    display: flex;
}

.compMenu{
    padding: 15px;
}`

export const Logo = styled.img`
    padding: 10px 50px;
    max-width: 100px;
`
export const RightSize = styled.div`
    display: flex;
    padding: 0 50px;
    align-items: center;
`

export const useStyles = makeStyles((theme)=>({
    toolBar:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    butt:{
        alignItems: 'center',
        margin: 15,
    },
    appBar:{
        color: 'inherit',
    }
  }));