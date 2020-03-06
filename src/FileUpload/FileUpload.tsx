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
import axios from 'axios';



import { Button } from '@material-ui/core';
import EmptyMediaItems from '../EmptyMediaItems';
import ImageClassifier from '../ImageClassifier';


// Styles for the component
const useStyle = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      width: '100%',
      backgroundColor: 'inherit',
    },
    input: {
      display: 'none',
    },
    padding24: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    uploadMediaBtnDiv: {
        display: 'flex',
        justifyContent: 'center',
        marginRight: `${theme.spacing(0.0625)}em`,
        marginTop: '20px'
      },
  });
});

export const BYTES = 1024 * 1024;

// Component props
export interface IFileUploadProps {
  header: React.ReactElement; // The heading of this section
  files: any; // Files array
  setFiles(files: any): void; // Function to add/update files array
  newFileAdded(file: any): void; // Trigger callback when new files are added
  onFileUpload(): void; // Function which indicates starting of file upload
  showQueue: boolean; // Flag to indicate whether to show queue or not
  collectionId: string;
}

// Component state type
export interface IFileUploadState {
  dragging: boolean;
  invalidFiles: Array<IInvalidFiles>;
}

export interface IInvalidFiles {
  file: File;
  errorMessage: string;
}

export interface IUploadStatus {
  isSuccess: boolean;
  errorMessage: string;
}

const FileUpload: React.FC = (props: any) => {
  const classes = useStyle();

  const [targetFiles, setTargetFiles] = useState();
  const [classificationData, setClassificationData] = useState([]);
  const [showKeywordsPage, setShowKeyWordsPage] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [buttonName, setButtonName] = useState('Upload File');

  const onFileChange = async (e:any) => {
    setTargetFiles(e.target.files[0]);
    const data = new FormData();
   data.append('file', e.target.files[0]);
   // console.log(data);

   const response = await axios({
    url:'http://localhost:5000/upload',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    data: data,
  });
  
  setClassificationData(response.data.classificationData.labelAnnotations);
  setImagePath(response.data.filePath);
  }

  const handleDelete = (dataToDelete: any) => {
      console.log('delete', dataToDelete);
    setClassificationData(classificationData => classificationData.filter((data, index) => data['description'] !== dataToDelete.description));
  }

  useEffect(() => {
      if(classificationData.length > 0) {
        //   classificationData.filter((data) => console.log)
        // console.log(classificationData);
          setShowKeyWordsPage(true);
          setButtonName('Upload New File');
      }
      
    
  }, [classificationData, imagePath, targetFiles]);

  

  return (
      <React.Fragment>
          {/* { showKeywordsPage && (<img src={`${URL.createObjectURL(targetFiles)}`}></img>)} */}
          { !showKeywordsPage && <EmptyMediaItems /> }
          <input
              type="file"
              id="file-input"
              name="myImage"
              className={classes.input}
              onChange={onFileChange}
          />
          <div className={classes.uploadMediaBtnDiv}>
              <label htmlFor="file-input">
                  <Button

                      id="upload-media-button"
                      color="primary"
                      variant="contained"
                      component="span"
                
                  >
                      {buttonName}
                    </Button>
              </label>
          </div>
          { showKeywordsPage && 
          <ImageClassifier
          classificationData={classificationData}
          handleDelete={handleDelete}
          imagePath={URL.createObjectURL(targetFiles)}
        />
        }
          

      </React.Fragment>
  );
}


export default FileUpload;
