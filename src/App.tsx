import React from 'react';
import Dropzone from './FileUpload/Dropzone';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ButtonAppBar from './Appbar';
import EmptyMediaItems from './EmptyMediaItems';
import FileUpload from './FileUpload/FileUpload';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);
function App() {
  return (
    <div className="App">
        <div className="Card">

          <ButtonAppBar/>
          <FileUpload />
          
          {/* <Dropzone onFilesAdded={console.log} /> */}
        </div>
      </div>
  );
}

export default App;
