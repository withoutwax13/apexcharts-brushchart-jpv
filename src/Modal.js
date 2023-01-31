import { useState } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const MyModal = ({open, handleClose, whichXAxisData, setXAxisAnnotList})=>{
    const [xAxisAnnot, setXAxisAnnot] = useState('')
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        padding: 4,
      };
    return ( 
        <Modal
        open={open}
      >
        <Box style={style}>
          <Typography variant="h6" component="h2">
            What annotation would you like to add?
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <TextField id="standard-basic" label="Your annotation here" variant="standard" value={xAxisAnnot} onChange={e=>setXAxisAnnot(e.target.value)}/>
          </Typography>
          <Button onClick={()=>{
            setXAxisAnnotList(prev=>[...prev, {text: xAxisAnnot, xAxis: whichXAxisData}])
            setXAxisAnnot('')
            handleClose()
          }}>
            Apply
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
     );
}

export default MyModal;