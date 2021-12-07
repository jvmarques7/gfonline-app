import React from 'react';
import {Box, Container} from '@material-ui/core'
import InputAdornments from './form/form';
import { Header } from '../header/header';
import {useStyles} from "./style"
import { Main } from '../default/style';

export default function Cadastro() {

    const classes = useStyles();

    return(
        <div>
            <Header />
            <Main>
                <Container maxWidth='xl'>
                    <Box display="flex" className={classes.box}>
                        <Container>
                            <InputAdornments></InputAdornments>
                        </Container>
                    </Box>
                </Container>
            </Main>
            
            
        </div>
    );
}
