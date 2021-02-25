import React, { Component, Fragment } from 'react';
import { Button, Loading, Input, OpenIcon } from '../../assets/Ui';
import CreateItemModal from '../../components/CreateItemModal/CreateItemModal';
import Counter from '../../components/Counter/Counter';
import DeleteCounter from '../../components/DeleteCounter/DeleteCounter';
import ToolTip from '../../components/ToolTip/ToolTip';
import { IoIosRefresh, IoIosSearch } from 'react-icons/io';
import './MainScreen.css';

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            hasError: false,
            isEmpty: false,
            countersArr: [],
            search: '',
            isRefreshing: false,
            isSelected: false,
            sendIdCounter: '',
            sendCountCounter: 0,
            totalSumCount: 0
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        setTimeout(() => { this.getCouter() }, 1200);
        document.addEventListener("click", this.handleDocumentClick);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }
    handleDocumentClick = e => {
        const isClosest = e.target.closest('.listOfCounters, button, .popover-inner');
        if (!isClosest) {
            this.setState({ isSelected: false });
        }
    };

    getCouter = () => {
        fetch('/api/v1/counter', { method: 'get', headers: { "Content-Type": "application/json" } })
            .then(res => {
                this.setState({ isLoading: false })
                if (res.status !== 200) {
                    this.setState({ hasError: true });
                }
                return res;
            }).then(res => {
                return res.json();
            }).then(body => {
                if (body.length === 0) {
                    this.setState({ isEmpty: true });
                } else {
                    this.setState({ countersArr: body });
                }
            })
    }

    refreshCounters = () => {
        this.getCouter();
        this.setState({ isRefreshing: true })
        setTimeout(() => {
            const totalCount = this.state.countersArr.map(elem => elem.count);
             this.state.totalSumCount = totalCount.reduce((a, b) => a + b, 0);
        }, 1000);
        setTimeout(() => { this.setState({ isRefreshing: false }) }, 1000);
    }
    searchFilter = (ev) => {
        this.setState({ search: ev.target.value });
    }
    closeModal = () => {
        this.getCouter();
        this.setState({ countersArr: [] });
    }
    handleSelect = (id, count, title) => {
        this.setState({ isSelected: true, sendIdCounter: id, sendCountCounter: count, sendTitleCounter: title })
    }

    render() {
        const { isLoading, hasError, isEmpty, countersArr, totalSumCount, isRefreshing, isSelected, sendIdCounter, sendCountCounter, sendTitleCounter } = this.state;
        let counterFilter = this.state.countersArr.filter(counter => {
            return counter.title.toLowerCase().includes(this.state.search.toLowerCase());
        })

        const test = counterFilter.map(el => el.id);
        const result = test.find(el => el === sendIdCounter)

        return (
            <Fragment >
                <div className="inputSearch">
                    <IoIosSearch className="searchIcon" />
                    <Input placeholder="Search Counters" onChange={this.searchFilter} ></Input>
                </div>
                {isLoading ? (<div className="loading"><Loading /></div>) : null}
                {isEmpty && !hasError && counterFilter.length === 0 ? (
                    <section className="noContent">
                        <h3>No counters yet</h3>
                        <p>“When I started counting my blessings, my whole life turned around.” —Willie Nelson</p>
                    </section>
                ) : null}
                {!hasError && !isLoading && counterFilter.length !== 0 ? (
                    <ul className="listOfCounters">
                        <p className="conteinerTxt"> {countersArr.length} items <span> {totalSumCount} times </span><Button
                            onClick={this.refreshCounters}
                            className="refreshBtn"> <IoIosRefresh /> </Button>
                            {isRefreshing ? (
                                <span className="refreshingTxt">
                                    Refreshing...
                                </span>
                            ) : null}
                        </p>

                        {Object.keys(counterFilter).map(counterKey => {
                            return [...Array(counterFilter[counterKey])].map(counter => {
                                return (
                                    <li key={counter.id} className={counter.id === result && isSelected ? "stateSelected" : "stateNoSelected"}>
                                        <div className="leftTitle" >
                                            <p onClick={() => { this.handleSelect(counter.id, counter.count, counter.title) }}  >{counter.title}</p>
                                        </div>
                                        <div className="rightCounters">
                                            <Counter sendCounterId={counter.id}
                                                sendCounterTittle={counter.title}
                                                sendCounterCount={counter.count}
                                            >
                                            </Counter>
                                        </div>
                                    </li>
                                )
                            })
                        })}
                    </ul>
                ) : null}
                {counterFilter.length === 0 && !isLoading && !isEmpty && !hasError ? (
                    <section>
                        <p>No content</p>
                    </section>
                ) : null}
                {hasError ? (
                    <section>
                        <h3>Couldn’t load the counters</h3>
                        <p>The Internet connection appears to be offline.</p>
                        <Button color="inverse" onClick={() => { this.getCouter() }}>Retry</Button>
                    </section>
                ) : null}
                {isSelected ? (
                    <section>
                        <div className="selectedIcons">
                            <DeleteCounter
                                counterId={sendIdCounter}
                                fetchCounter={this.closeModal}
                                counterTitle={sendTitleCounter}
                            />
                            <ToolTip totalCount={sendCountCounter}
                            ></ToolTip>
                        </div>
                        <div className="modalBtn">
                            <hr />
                            <CreateItemModal fetchCounter={this.closeModal} />
                        </div>
                    </section>
                ) :
                    <section className="modalBtn">
                        <hr />
                        <CreateItemModal fetchCounter={this.closeModal} />
                    </section>}
            </Fragment>
        )
    }
}

export default MainScreen;
