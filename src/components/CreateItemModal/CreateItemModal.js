import React, { useState, Fragment , useEffect} from 'react';
import { Button, Modal, useModal, useAlert, Alert, NewIcon, CloseIcon, Input, Loading } from '../../assets/Ui';
import Examples from '../../containers/Examples/Examples';
import './CreateItemModal.css';

const CreateItemModal = ({fetchCounter}) => {
    const { isVisible: isModalVisible, hideModal, showModal } = useModal();
    const { isVisible: isAlertVisible, hideAlert, showAlert } = useAlert();
    const [addExample, setExampleState] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isExample, setExample] = useState('');

    const createCounter = () => {
        fetch('/api/v1/counter', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: inputValue }) })
            .then(res => {
                if (res.status !== 200) {
                    setHasError(true);
                    showAlert();
                } else {
                    hideModal();
                    fetchCounter();
                    setInputValue('');
                    setLoading(false);
                }
                return;
            })
            .catch(err => { console.log(err) });
    }
    const handleExampleTitle = (exampleTitle) => {
        setExample(exampleTitle);
        setInputValue(exampleTitle);
    }
    const handleShowModal = () =>{
        setInputValue('');
        showModal();
    }

    return (
        <Fragment>
            <Button onClick={handleShowModal}> <NewIcon fill="var(--white)" /></Button>
            <Modal isVisible={isModalVisible}>
                {!addExample ? (
                    <Modal.Header >
                        <Button onClick={hideModal} className="hideModal"><CloseIcon /></Button>
                        <Modal.Title className="modalTitle" >Create counter</Modal.Title>
                        <Button className="saveBtn" onClick={createCounter} disabled={!inputValue} >Save</Button>
                    </Modal.Header>) : (
                        <Modal.Header >
                            <Button className="hideModal" onClick={() => { setExampleState(false) }} ><CloseIcon /></Button>
                            <Modal.Title className="modalTitle">Examples</Modal.Title>
                        </Modal.Header>
                    )
                }
                {!addExample ? (
                    <Modal.Body>
                        <h3>Name</h3>
                        <Input
                            placeholder="Ej: Cups of coffee"
                            type="text"
                            value={inputValue}
                            onChange={(e) => { setInputValue(e.target.value) }}
                        />
                        <span className="exampleText">Give it a name. Creative block? See</span> <Button className="exampleBtn" onClick={() => { setExampleState(true) }}><span>examples.</span></Button>
                    </Modal.Body>) : (
                        <Modal.Body>
                            <p className="subtitle">Select an example to add it to your counters</p>
                            <Examples handleExampleTitle={handleExampleTitle} ></Examples>
                        </Modal.Body>
                    )}
                {isLoading ? (<div className="loading"><Loading /></div>) : null}
            </Modal>
            <section>
                <Alert isVisible={isAlertVisible}>
                    <Alert.Title>Couldn’t create counter</Alert.Title>
                    <Alert.Message>The Internet connection appears to be offline.</Alert.Message>
                    <Alert.Actions>
                        <Button kind="raised" onClick={hideAlert}>
                            Dismiss
                        </Button>
                    </Alert.Actions>
                </Alert>
            </section>
        </Fragment>
    )
}

export default CreateItemModal; 