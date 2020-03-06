
/**
 * This component is used for Drag and Drop in FileUpload Component
 */
import React from 'react';
import {
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import DottedBorder from '../../../assets/dotted-border.png';


// Styles for components
const useStyle = makeStyles((theme: Theme) => {
  return createStyles({
    // Root style
    fileUploader: {
      width: '100%',
      height: `${theme.spacing(1.414)}em`,
      padding: theme.spacing(1.25),
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
    },
    // Style shown while file is being dragged
    fileUploaderDragging: {
      border: `1px dashed ${theme.palette.grey[600]}`,
      backgroundColor: theme.palette.primary.light,
    },
    // Contents style
    fileUploaderContents: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '1.5',
      letterSpacing: '0.15px',
      color: theme.palette.grey[600],
      marginBottom: theme.spacing(3.25),
    },
    dottedBorder: {
      position: 'absolute',
    },
    // Hidden normal file upload to show our own style
    input: {
      display: 'none',
    },
    // Upload icon style
    uploadIcon: {
      width: `${theme.spacing(0.1875)}em !important`,
      height: `${theme.spacing(0.1875)}em !important`,
      color: theme.palette.grey[600],
      marginBottom: theme.spacing(2.125),
    },
  });
});

// Props for DropZone Component
export interface IDropzoneProps {
  children: React.ReactNode;
  dragging: boolean; // Whether dragging
  onDrag: (event: React.DragEvent<HTMLDivElement>) => void; // Called while being dragged
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void; // Called while drag starts
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void; // Called while drag ends
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void; // Called while drag over the drag zone
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void; // Called while starts dragging
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void; // Called while user leaves dragging
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void; // When file is being dropped
  // onAddFilesClick: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add Files button clicked
  showQueue: boolean;
}

const Dropzone: React.FC<IDropzoneProps> = (props: IDropzoneProps) => {
  const classes = useStyle();
  const {
    dragging,
    onDrag,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop,
   //  onAddFilesClick,
    showQueue,
  } = props;
  // Basic styling
  let uploaderClasses = classes.fileUploader;
  // Styling added when file is being dragged
  if (dragging) {
    uploaderClasses += ` ${classes.fileUploaderDragging}`;
  }

  return (
    <div
      className={uploaderClasses}
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* <img
        src={DottedBorder}
        alt="dotted-border"
        className={classes.dottedBorder}
        style={{ width: showQueue ? '452px' : '500px' }}
      /> */}
      <Typography variant="subtitle2" className={classes.fileUploaderContents}>
        Dropzone
      </Typography>
      <Grid item>
        <input
          className={classes.input}
          id="file-input"
          multiple
          type="file"
          // onChange={ondr}
        />
      </Grid>
      {props.children}
    </div>
  );
};

export default Dropzone;
