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

import React from 'react';

import {
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      flexDirection: 'column',
      display: 'flex',
    },
    emptyMediaImage: {
      maxWidth: 600,
      maxHeight: 800,
    },
    emptyMediaImageDiv: {
      display: 'flex',
      justifyContent: 'center',
      margin: `${theme.spacing(0.129)}em`,
      marginTop: '100px'
    },
    uploadMediaBtnDiv: {
      display: 'flex',
      justifyContent: 'center',
    },
    card: {
      maxWidth: 345,
    },
    emptyMediaItemDiv: {
      display: 'flex',
      justifyContent: 'center',
      margin: `${theme.spacing(0.2)}em`,
      marginBottom: `${theme.spacing(0.06)}em`,
      fontSize: `${theme.spacing(0.125 * 1.4)}rem`,
    },
    emptyMediaDragDropDiv: {
      display: 'flex',
      justifyContent: 'center',
      margin: `${theme.spacing(0.125)}em`,
      marginBottom: `${theme.spacing(0.190)}em`,
      fontSize: `${theme.spacing(0.125 * 1)}rem`,
      color: theme.palette.grey[600],
    },
  });
});

const EmptyMediaItems: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.emptyMediaImageDiv}>
        <img src='/images/graphic.png' alt="test" className={classes.emptyMediaImage} />
      </div>
      
      {/* <div className={classes.emptyMediaDragDropDiv}>
        {intl.get('app.emptyMediaItems.dragAndDrop.label')}
      </div> */}
      {/* <div>
        <UploadButton />
      </div> */}
    </div>
  );
};

export default EmptyMediaItems;
