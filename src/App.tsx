import React, { Component } from 'react';
import './App.css';
import Title from './Title';
import Search from './Search';
import Result from './Result';
import Local from './Local';
import { Store, OpeningTime } from './types/types';

interface StoreState { 
    storeName: '';
    storeAddress: '';
    storeCity: '';
    storeCountry: '';
    storePostCode: '';
    storeTelephone: '';
    storeManager: '';
    openingHours: OpeningTime[];
    loading: boolean;
}

class App extends Component {

    public state: StoreState = {
        storeName: '',
        storeAddress: '',
        storeCity: '',
        storeCountry: '',
        storePostCode: '',
        storeTelephone: '',
        storeManager: '',
        openingHours: [],
        loading: false
    }

    private updateStoreInfo = (store: Store) => {
        this.setState({
            storeName: store.other_name,
            storeAddress: store.contact.address1,
            storeCity: store.contact.city,
            storeCountry: store.contact.country,
            storePostCode: store.contact.post_code,
            storeTelephone: store.contact.telephone,
            storeManager: store.contact.manager,
            openingHours: store.opening_times})
        this.setState({loading: false})
    }

    private setLoading = () => {
        this.setState({loading: true})
    }

    public render() {

        return (
            <div>

                <Title />   <br />
 
                <Search 
                    updateStore = {this.updateStoreInfo} 
                    setLoading = {this.setLoading}
                />

                <Result 
                    storeName={this.state.storeName}
                    storeAddress={this.state.storeAddress}
                    storeCity={this.state.storeCity}
                    storeCountry={this.state.storeCountry}
                    storePostCode={this.state.storePostCode}
                    storeTelephone={this.state.storeTelephone}
                    storeManager={this.state.storeManager}
                    openingHours={this.state.openingHours}
                    loading={this.state.loading}
                /> 

                <Local />

            </div>
        );
    }
}

export default App;