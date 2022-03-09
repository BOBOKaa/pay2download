import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Grid, OutlinedInput, LinearProgress } from '@mui/material';
import { FileUploader } from "react-drag-drop-files";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import cardImg from '../../assets/card-background.png';
import buttonImg from '../../assets/button.png';
import buttonSecImg from '../../assets/button_sec.png';
import buttonOrangeImg from '../../assets/button_orange.png';

const useStyles = makeStyles(theme => ({
    container: {
      margin: '2rem',
      height: '90%'
    },
    card: {
      backgroundImage: `url(${cardImg})`, 
      backgroundRepeat: 'no-repeat', 
      backgroundSize: '100% 100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative'
    },
    imgButton: {
      backgroundImage: `url(${buttonImg})`, 
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'contain',
      width: 300,
      height: 70,
      fontSize: '25px !important',
      color: 'white !important',
      fontWeight: '600 !important',
      textTransform: 'none !important',
    },
    addMoreButton: {
      backgroundImage: `url(${buttonSecImg})`, 
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'contain',
      width: 150,
      height: 40,
      color: 'white !important',
      textTransform: 'none !important',
      marginRight: '4rem !important',
      marginLeft: '-2rem !important'
    },
    continueButton: {
      backgroundImage: `url(${buttonOrangeImg})`, 
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'contain',
      width: 150,
      height: 40,
      color: 'white !important',
      textTransform: 'none !important',
      marginRight: '4rem !important',
      marginLeft: '-2rem !important'
    },
    fileDragAndDrop: {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
    }
  }));

const BrowseFiles = () => {
  const classes = useStyles();
  const [fileList, setFileList] = React.useState([]);
  const [isUpdate, setIsUpdate] = React.useState(true);
  const [step, setStep] = React.useState(1);
  const hiddenFileInput = React.useRef(null);
  const hiddenMoreFileInput = React.useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleMoreClick = event => {
    hiddenMoreFileInput.current.click();
  };

  const handleClickContinue = event => {
    setStep(step+1);
  }

  const handleClickUpload = event => {
    setStep(step+1);
  }

  const handleBack = event => {
    setStep(step-1);
  }

  const handleChange = event => {
    var fileArr = [];
    Object.keys(event.target.files).forEach(key => fileArr.push(event.target.files[key]));
    setFileList(fileArr);
    console.log(fileArr);
  }

  const handleDragAndDropChange = file => {
    var fileArr = [];
    Object.keys(file).forEach(key => fileArr.push(file[key]));
    setFileList(fileArr);
  }

  const handleMoreChange = event => {
    var fileArr = [];
    var originArr = fileList;
    Object.keys(event.target.files).forEach(key => fileArr.push(event.target.files[key]));
    setFileList(originArr.concat(fileArr));
  }

  const removeFile = (index) => {
    if(isUpdate) {
      setIsUpdate(false);
    }
    else {
      setIsUpdate(true);
    }

    var fileArr = fileList;
    fileArr.splice(index, 1);
    setFileList(fileArr);
  }

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        {
          (step === 2 || step === 3) &&
          <Button style={{textTransform: 'none', position: 'absolute', top: 15, left: 20, color: 'black'}} onClick={handleBack}>{"< Go back"}</Button>
        }
        {step === 1 && <React.Fragment>
          {fileList.length === 0 ? 
            <div>
                <FileUploader 
                  multiple={true}
                  name="file"
                  handleChange={handleDragAndDropChange}
                >
                  <div className={classes.fileDragAndDrop}></div>
                </FileUploader>
                <h2>Drag & Drop Files Here</h2>
                <h2>or</h2>
                <Button className={classes.imgButton} onClick={handleClick}>Browse Files</Button> 
                <input type='file' onChange={handleChange} multiple style={{display: 'none'}} ref={hiddenFileInput}/>
            </div>
          :
            <div>
              <div style={{marginBottom: '30px'}}>
              <TableContainer style={{ maxHeight: '20rem' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>File Name</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{
                    'tr:nth-of-type(odd)': {backgroundColor: '#F8F8F8'}
                  }}>
                    {fileList.map((file, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, 'td': {padding: 0}}}
                      >
                        <TableCell component="th" scope="row">
                          {file.name}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => removeFile(index)}><DeleteIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </TableContainer>
              </div>
              <Button className={classes.addMoreButton} onClick={handleMoreClick}>Add More</Button>
              <Button className={classes.continueButton} onClick={handleClickContinue}>Continue</Button>
              <input type='file' onChange={handleMoreChange} multiple style={{display: 'none'}} ref={hiddenMoreFileInput}/>
            </div>
          }
        </React.Fragment>}
        {step === 2 && <div>
          <Grid container spacing={3}>
            <Grid item lg={5} md={5} sm={12} xs={12} style={{display: 'grid', textAlign: 'end', alignItems: 'center'}}>
              <span>Files for Sale</span>
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12} style={{textAlign: 'start'}}>
              <OutlinedInput type="text" value="" style={{width: '100%', maxWidth: 300}}/>
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12} style={{display: 'grid', textAlign: 'end', alignItems: 'center'}}>
              <span>Name This Item</span>
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12} style={{textAlign: 'start'}}>
              <OutlinedInput type="text" value="" style={{width: '100%', maxWidth: 300}}/>
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12} style={{display: 'grid', textAlign: 'end', alignItems: 'center'}}>
              <span>Set Price (ETH)</span>
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12} style={{textAlign: 'start'}}>
              <OutlinedInput variant="outlined" type="text" value="" style={{width: '100%', maxWidth: 300}}/>
            </Grid>
          </Grid>
          <Button className={classes.imgButton} onClick={handleClickUpload} style={{marginTop: 20}}>Upload</Button> 
        </div>}
        {step === 3 && <div>
          <h3>Waiting for Encryption & Uploading...</h3>
          <LinearProgress variant="determinate" value={30}/>
        </div>}
        {step === 4 && <div>
          <h1>Congratulations!</h1>
          <h3>You have successfully created a sale item.</h3>
          <h3>Sharelinks:<a href="#" style={{color: '#FF8D00'}}>www.sell.crustfiles.io/D82a9TK</a></h3>
        </div>}
      </div>
    </div>
  );
};
export default BrowseFiles;