import React, { Fragment, useState } from 'react';
import { Button, IncrementIcon, DecrementIcon, useAlert, Alert } from '../../assets/Ui';
import useCounter from '../../hook/useCounter';
import './Counter.css';

const Counter = (props) => {
    const { counter, increment, decrement } = useCounter(props.sendCounterCount);
    const { isVisible: isAlertVisible, hideAlert, showAlert } = useAlert();
    const [hasError, setHasError] = useState(false);
    const [hasIncrementError, setIncrementError] = useState(false);

    const handleIncrementCounter = () => {
        fetch('/api/v1/counter/inc', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: props.sendCounterId }) })
        .then(res => {
            if (res.status !== 200) {
                setHasError(true);
                showAlert();
                setIncrementError(true)
            } else {
                increment();
            }
            return;
        })
        .catch(err => { console.log(err) });
    }
    const handleDecrementCounter = () => {
        if(counter >= 1){
            fetch('/api/v1/counter/dec', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: props.sendCounterId }) })
                .then(res => {
                    if (res.status !== 200) {
                        setHasError(true);
                        showAlert();
                        setIncrementError(false)
                    } else {
                        decrement();
                    }
                    return;
                })
                .catch(err => { console.log(err) });
        }else return;
        
    }

    return (

        <Fragment>
            {hasError && hasIncrementError ? (
                <Alert
                    isVisible={isAlertVisible}>
                    <Alert.Title>Couldn’t update {props.sendCounterTittle} to {counter + 1 } </Alert.Title>
                    <Alert.Message>The Internet connection appears to be offline.</Alert.Message>
                    <Alert.Actions>
                        <Button kind="raised" onClick={handleIncrementCounter}>
                            Retry
                       </Button>
                        <Button kind="raised" color="danger" onClick={hideAlert}>
                            Dismiss
                       </Button>
                    </Alert.Actions>
                </Alert>
            ) : null}
               {hasError && !hasIncrementError ? (
                <Alert
                    isVisible={isAlertVisible}>
                    <Alert.Title>Couldn’t update {props.sendCounterTittle} to {counter - 1} </Alert.Title>
                    <Alert.Message>The Internet connection appears to be offline.</Alert.Message>
                    <Alert.Actions>
                        <Button kind="raised" onClick={handleDecrementCounter}>
                            Retry
                       </Button>
                        <Button kind="raised" color="danger" onClick={hideAlert}>
                            Dismiss
                       </Button>
                    </Alert.Actions>
                </Alert>
            ) : null}
            <Button onClick={handleIncrementCounter}  className="icons"  ><IncrementIcon/></Button>
            <p className="number"> {counter}</p>
            <Button onClick={handleDecrementCounter}  className="icons" ><DecrementIcon /></Button>
        </Fragment>
    )
}

export default Counter;
