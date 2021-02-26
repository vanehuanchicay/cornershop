import React, { useState, Fragment } from 'react';
import { Button, useAlert, Alert, NewIcon, CloseIcon, Input, Loading, TrashBinIcon } from '../../assets/Ui';

const DeleteCounter = (props) => {
    const { isVisible: isAlertVisible, hideAlert, showAlert } = useAlert();
    const [hasError, setHasError] = useState(false);

    const deleteCounter = async () => {

        fetch('/api/v1/counter', { method: 'delete', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: props.counterId }) })
            .then(res => {
                if (res.status !== 200) {
                    setHasError(true);
                } else {
                    setTimeout(() => { hideAlert() }, 1400);
                    hideAlert();
                    props.fetchCounter();
                }
                return;
            })
            .catch(err => { console.log(err) });
    }

    return (
        <Fragment>
            <section>
                <Button className="trashIcon" onClick={showAlert}><TrashBinIcon /></Button>
                <Alert
                    isVisible={isAlertVisible}>
                    <Alert.Title>Delete the "{props.counterTitle}" counter?</Alert.Title>
                    <Alert.Message>This cannot be undone.</Alert.Message>
                    <Alert.Actions>
                        <Button kind="raised" onClick={hideAlert}>Cancel </Button>
                        <Button kind="raised" color="danger" onClick={deleteCounter}>
                            Delete
                        </Button>
                    </Alert.Actions>
                </Alert>
            </section>
            <section>
                {hasError ? (
                    <Alert
                        isVisible={isAlertVisible}>
                        <Alert.Title>Couldn’t delete “{props.counterTitle}”</Alert.Title>
                        <Alert.Message>The Internet connection appears to be offline.</Alert.Message>
                        <Alert.Actions>
                            <Button kind="raised" onClick={deleteCounter}>
                                Retry
                            </Button>
                            <Button kind="raised" color="danger" onClick={hideAlert}>
                                Dismiss
                            </Button>
                        </Alert.Actions>
                    </Alert>
                ) : null}
            </section>
        </Fragment>
    )
}

export default DeleteCounter; 