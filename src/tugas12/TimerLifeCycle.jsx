import React from 'react';
import './TimerLifeCycle.css'

class TimerLifeCycle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeNow: 0,
            time: 100,
        }
    }

    componentDidMount() {
        if (this.props.start !== undefined) {
            this.state({ time: this.props.start })
        }

        // cetak hitungan berulang dengan setInterval
        this.timerID = setInterval(() => {
            this.tick()
        }, 1000)

        // cetak jam lokal berulang dengan setInterval
        this.renderClock()
        this.timerClock = setInterval(() => {
            this.renderClock()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
        clearInterval(this.timerClock)
    }

    // cetak jam ke state
    renderClock() {
        this.clockNow = new Date().toLocaleTimeString();
        this.setState({
            ...this.state,
            timeNow: this.clockNow
        })
    }

    // cetak hitungan ke state
    tick() {
        this.setState({
            ...this.state,
            time: this.state.time - 1
        })
    }

    render() {
        return (
            <>
                {
                    this.state.time >= 0 &&
                    <div>
                        <p>sekarang jam : {this.state.timeNow}</p>
                        <p>hitung mundur : {this.state.time}</p>
                    </div>
                }
            </>
        )
    }
}


export default TimerLifeCycle;