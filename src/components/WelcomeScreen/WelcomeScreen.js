
import React, { useState, Fragment } from 'react';
import { Button } from '../../assets/Ui';
import { ReactComponent as Logo } from '../../assets/Logo/logo.svg';
import MainScreen from '../../containers/MainScreen/MainScreen'
import './WelcomeScreen.css';

const WelcomeScreen = () => {
    const [isStarted, isStartedSetState] = useState(false);

    return (
        <Fragment>
            {isStarted ? (
                <MainScreen />
            ) : (
                    <section className="container">
                        <Logo />
                        <p>Welcome to Counters</p>
                        <p>Capture cups of lattes, frapuccinos, or anything else that can be counted.</p>
                        <Button onClick={() => {
                            isStartedSetState((true))
                        }}>Get started</Button>
                    </section>
                )
            }
        </Fragment>
    )
}

export default WelcomeScreen;
