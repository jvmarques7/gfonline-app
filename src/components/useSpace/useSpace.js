import React from "react";
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import InputAdornments from './form/index';

const useStyles = makeStyles({
    paper:{
        margin: 16,
        width: '100%',
        maxWidth: '1280',
        display: 'flex',
    }
  });

  export function UseSpace(){

    const classes = useStyles();

    return(
        <Card className={classes.paper}>
            <InputAdornments></InputAdornments>
        </Card>
    );

  }