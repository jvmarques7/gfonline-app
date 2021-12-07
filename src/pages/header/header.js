import React from "react";
import {Logo, RightSize} from "./style";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import { useStyles } from "./style";
// import { Button } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';

export function Header (){
    
    const classes = useStyles();

    return(

        <AppBar position="static" color="inherit">
            <Toolbar className={classes.toolBar}>
                <Logo src="\images\FGB.png" alt="logo">
                </Logo>
                <RightSize>
                    <Avatar alt="Usuario" src="/"/>
                    {/* <Button variant="contained" color="primary" className={classes.butt}>
                        Logout
                    </Button> */}
                </RightSize>
            </Toolbar>
        </AppBar>

        // <HeaderHome>
        //     <div className='toolbar'>
        //         <Logo>
        //             <img src="\images\logo.png" alt="logo"></img>
        //         </Logo>
        //         <div>
        //             Direita
        //         </div>
        //     </div>
        // </HeaderHome>
    );
}

    