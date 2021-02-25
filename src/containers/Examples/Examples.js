import React, { Component, Fragment } from 'react';
import { Button } from '../../assets/Ui';
import './Examples.css';

class Examples extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        drinks: [
            { title: 'Smoothie' },
            { title: 'Glasses of water' },
            { title: 'Beers' }
        ],
        food: [
            { title: 'Hot-dogs' },
            { title: 'Cupcakes eaten' },
            { title: 'Chicken wings' },
            { title: 'Ravioli pesto' }
        ],
        misc: [
            { title: 'Times sneezed' },
            { title: 'Naps' },
            { title: 'Day dreaming' },
            { title: 'Meditate' },
        ]
    }

    onExampleTitle = (exampleTitle) => {
        this.props.handleExampleTitle(exampleTitle);
    }
    render() {
        return (
            <Fragment>
                <section>
                    <h3>Drinks</h3>
                    {this.state.drinks.map(drinks => {
                        return <Button className="examplesBtn"
                            key={drinks.title}
                            onClick={() => this.onExampleTitle(drinks.title)}
                        >{drinks.title} </Button>
                    })}
                </section>
                <section>
                    <h3>Food</h3>
                    {this.state.food.map(food => {
                        return <Button className="examplesBtn"
                        key={food.title} 
                        onClick={() => this.onExampleTitle(food.title)}
                        >{food.title}</Button>
                    })}
                </section>
                <section>
                    <h3>Misc</h3>
                    {this.state.misc.map(misc => {
                        return <Button className="examplesBtn"
                        key={misc.title}
                        onClick={() => this.onExampleTitle(misc.title)}
                        >{misc.title}</Button>
                    })}
                </section>
            </Fragment>
        )
    }
}

export default Examples