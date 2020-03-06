/*
 ********************************************************************
 * Licensed Materials - Property of HCL                             *
 *                                                                  *
 * Copyright HCL Technologies Ltd. 2001, 2019. All Rights Reserved. *
 *                                                                  *
 * Note to US Government Users Restricted Rights:                   *
 *                                                                  *
 * Use, duplication or disclosure restricted by GSA ADP Schedule    *
 ********************************************************************
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Grid, { GridSpacing } from '@material-ui/core/Grid';


// Styles for the component
const useStyle = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
        marginTop: '20px'
      },
      chip: {
        margin: theme.spacing(0.5),
      },
      image: {
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
      },
      borderright: {
        borderRight: '1px solid black',
      },
      
  });
});


const ImageClassifier: React.FC<any> = (props: any) => {
    const classes = useStyle();
    return (
        <React.Fragment>
            <Grid container className={classes.root} spacing={2}>
      <Grid item md={8} className={classes.borderright}>
        <Grid container justify="center">
        <div className={classes.image}>
                <img width="1000"  src={props.imagePath}></img>
        </div>
        </Grid>
      </Grid>
      
      <Grid item md={4} >
        <Grid container justify="center">
        <Paper className={classes.root}>
      {props.classificationData.map((data: { description: string | number | undefined; label: React.ReactNode; }, index: number) => {
        return (
          <Chip
            key={index}
            label={data.description}
            onDelete={() => {props.handleDelete(data)}}
            className={classes.chip}
          />
        );
      }
      )}
    </Paper>
    <div className={classes.image}>
    <Button
    color="primary"
    variant="contained"
    > 
    Save 
    </Button>
    </div>
        </Grid>
      </Grid>
      </Grid>
             
            
   
    
        </React.Fragment>

    );
    
}
export default ImageClassifier;