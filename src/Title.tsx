import React, { Component } from 'react'
import Time from 'react-time'
import { withLabel, Sainsburys } from 'luna-images'
import Clock from 'react-live-clock'
import './App.css'

const SainsburysLogo = withLabel(Sainsburys)

interface State { 
    subtitle: string;
    typescript: string;
}

class Title extends Component {

    public state: State = {
        subtitle: "Pizza Locator",
        typescript: "TypeScript Version"
    }

    public render() {
        let now = new Date()
        return (
            <div className="Title">
                <SainsburysLogo label="Sainsburys Group plc" width="320px" />
                <p className="Subtitle">{this.state.subtitle}</p>
                <p className="Date">
                    <Time value={now} format="dddd Do MMMM YYYY" />
                    <Clock format={'h:mm A'} ticking={true} timezine={'US/Pacific'} />
                    {this.state.typescript}
                </p>
            </div>
        );
    }
}

export default Title;