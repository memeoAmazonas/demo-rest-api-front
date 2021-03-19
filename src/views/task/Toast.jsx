import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "@material-ui/lab/Alert";


const Toast = ({open, message}) => (
    <div>
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            severity="success"
        >
            <Alert severity="success">{message}</Alert>
        </Snackbar>
    </div>
);

export default Toast;
