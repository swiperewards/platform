import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';


/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */

const DialogBox = (props) => {
    let { displayDialogBox, message, actions } = props;
    return (
        <div>
            <Dialog
                open={displayDialogBox}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">{message}</DialogTitle>

                <DialogActions>
                    {actions}
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default DialogBox;