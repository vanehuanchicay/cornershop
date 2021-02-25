import React, { useState } from 'react';
import { OpenIcon } from '../../assets/Ui';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import './ToolTip.css'
import 'bootstrap/dist/css/bootstrap.min.css';



const ToolTip = (props) => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div>
            <Button id="PopoverFocus" type="button" className="toolTipBtn"><OpenIcon /></Button>
            <UncontrolledPopover trigger="focus" placement="top" target="PopoverFocus" className="mainCard">
                <PopoverHeader className="toolTipCard">Shared 1 counter </PopoverHeader>
                <PopoverBody className="toolTipCard">
                <Button onClick={() => setIsOpen(!isOpen)} id="copyBtn">Copy</Button>

                <div className="paperNote">
                    <p >hola</p>
                </div>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )
}

// const PopoverContent = ({ scheduleUpdate }) => {
//     const [isOpen, setIsOpen] = useState(false);
  
//     return (
//       <>
//         <PopoverHeader>Shared 1 counter</PopoverHeader>
//         <PopoverBody>
//           <Button onClick={() => setIsOpen(!isOpen)}>Copy</Button>
//           <Collapse isOpen={isOpen} onEntered={scheduleUpdate} onExited={scheduleUpdate}>
//             cantidad
//           </Collapse>
//         </PopoverBody>
//       </>
//     );
//   }
  
//   const ToolTip = () => {
//     return (
//       <div className="text-center">
//         <Button id="ScheduleUpdateButton" type="button">
//         <OpenIcon />
//         </Button>
//         <UncontrolledPopover trigger="click" placement="top" target="ScheduleUpdateButton">
//           {({ scheduleUpdate }) => (
//             <PopoverContent  />
//           )}
//         </UncontrolledPopover>
//       </div>
//     );
//   }
export default ToolTip; 