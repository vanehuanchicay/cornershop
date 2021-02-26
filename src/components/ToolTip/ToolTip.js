import React, { useState } from 'react';
import { OpenIcon } from '../../assets/Ui';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import './ToolTip.css'
import 'bootstrap/dist/css/bootstrap.min.css';



const ToolTip = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Button id="PopoverClick" type="button" className="toolTipBtn" ><OpenIcon /></Button>
            <UncontrolledPopover trigger="click" placement="top" target="PopoverClick" className="mainCard">
                <PopoverHeader className="toolTipCard">Shared 1 counter </PopoverHeader>
                <PopoverBody className="toolTipCard">
                <Button onClick={() => setIsOpen(!isOpen)} id="copyBtn">Copy</Button>
                <div className="paperNote">
                    <p >{props.totalCount} x {props.counterTitle}</p>
                </div>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )
}

export default ToolTip; 