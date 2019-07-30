import React, {Component} from 'react'
import { AccordionItem, ProgressIndicator, ProgressBar, Accordion } from 'luna-react'
import { TableContainer, TableBody, TableRow, TableCell, TableHeaderRow, TableHeaderCell } from "luna-react"
import Clock from 'react-live-clock'
import moment from 'moment'
import { LocalState } from './types/LocalState';
import { OpeningTime } from './types/types'
import { Store } from './types/types';

class Local extends Component {

    public state: LocalState = {
        latitude: '', 
        longitude: '', 
        loading: false,
        localName: '',
        localAddress: '',
        localCity: '',
        localCountry: '',
        localPostCode: '',
        localTelephone: '',
        localManager: '',
        localHours: [],
        loadingLocal: false
    }

    public componentWillMount() {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition((position)=> {
                this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
                console.log(this.state.latitude, this.state.longitude)
                this.getLocalStore()
            }
            )
        }
    }

    private getLocalStore = async () => {
        let openNow = moment().format('YYYY-MM-DD HH:mm')
        this.setState({loadingLocal: true})
        const response = await fetch(`https://api.stores.sainsburys.co.uk/v1/stores/?sort=by_distance&lat=${this.state.latitude}&lon=${this.state.longitude}&facility=Hot+Food+Counter&open_at=${openNow}`);
        return await response.json().then(data => this.updateLocation(data.results[0]))
    }

    private updateLocation(data: Store) {
        this.setState({
            localName: data.other_name,
            localAddress: data.contact.address1,
            localCity: data.contact.city,
            localCountry: data.contact.country,
            localPostCode: data.contact.post_code,
            localTelephone: data.contact.telephone,
            localManager: data.contact.manager,
            localHours: data.opening_times})
        this.setState({loadingLocal: false})
    }

    private displayLocalOpeningTimes() {
        const weekday=new Array(7);
        weekday[0]="Monday"
        weekday[1]="Tuesday"
        weekday[2]="Wednesday"
        weekday[3]="Thursday"
        weekday[4]="Friday"
        weekday[5]="Saturday"
        weekday[6]="Sunday"
    
        const list = 
        this.state.localHours.map((openingSlot: OpeningTime) =>
            <TableRow key={openingSlot.day}> 
                <TableCell> {weekday[openingSlot.day]} </TableCell> 
                <TableCell> {openingSlot.start_time} - {openingSlot.end_time} </TableCell> 
            </TableRow>
        );
        return list;
    }

    public render() {
        return (
            <Accordion>
                <AccordionItem className="Containers" title="Your Local Hot Food Counter Store">
                    <p className="Search">Your Local Hot Food Counter Store: </p>

                    { this.state.loadingLocal === false &&
        <div>
            <TableContainer className="LocalTable">
                <TableBody>
                    { this.state.localName !== "" &&
                    <TableRow>
                        <TableCell> Local Store: </TableCell>
                        <TableCell> {this.state.localName} </TableCell>
                    </TableRow> }
                    { this.state.localAddress !== "" &&
                    <TableRow>
                        <TableCell> Local Stores Address: </TableCell>
                        <TableCell> {this.state.localAddress} </TableCell>
                    </TableRow> }
                    { this.state.localCity !== "" &&
                    <TableRow>
                        <TableCell> Local Stores Town / City: </TableCell>
                        <TableCell> {this.state.localCity} </TableCell>
                    </TableRow> } 
                    { this.state.localCountry !== "" &&
                    <TableRow>
                        <TableCell> Local Stores Country: </TableCell>
                        <TableCell> {this.state.localCountry} </TableCell>
                    </TableRow> }
                    { this.state.localPostCode !== "" &&
                    <TableRow> 
                        <TableCell> Local Stores Post Code: </TableCell>
                        <TableCell> {this.state.localPostCode} </TableCell>
                    </TableRow> }
                    { this.state.localTelephone !== "" &&
                    <TableRow>
                        <TableCell> Local Stores Telephone Number: </TableCell>
                        <TableCell> {this.state.localTelephone} </TableCell>
                    </TableRow> }
                    { this.state.localManager !== "" &&
                    <TableRow>
                        <TableCell> Local Stores Manager: </TableCell>
                        <TableCell> {this.state.localManager} </TableCell>
                    </TableRow> }
                </TableBody>
            </TableContainer> <br/>
            <p className="Time">Current Time- <Clock format={'HH:mm'} ticking={true} timezine={'US/Pacific'} /> <br /> </p>
            <TableContainer className="Table">
                <TableBody>
                    <TableHeaderRow>
                        <TableHeaderCell>Week Days: </TableHeaderCell>
                        <TableHeaderCell>Opening Hours: </TableHeaderCell>
                    </TableHeaderRow>
                    {this.displayLocalOpeningTimes()}
                </TableBody>
            </TableContainer> 
        </div> }
                    { this.state.loadingLocal === true && 
      <div>
          <ProgressIndicator loading preventFocus>
              <ProgressBar 
                  className="ln-u-push-bottom-sm" />
              <ProgressBar small />
          </ProgressIndicator> 
          <h3 className="Loading"> ...LOADING... </h3> 
      </div> }
                </AccordionItem> 
            </Accordion>
        )
    }
}


export default Local;