import React, {Component} from 'react'
import moment from 'moment'
import { Accordion, AccordionItem, SwitchField, OutlinedButton, AsyncAutocompleteField } from 'luna-react'
import './Result'
import './App.css'
import 'luna-icons'
import { Store } from './types/types'
import { SelectType } from './types/SelectType'

interface State {
    search: string;
    value: string;
    number: number;
    showHFC: boolean;
    openNow: boolean;
    loading: boolean;
}

interface SimpleStoreDetail {
    other_name: string;
    code: string;
}

interface TheseProps {
    setLoading: () => void;
    updateStore: (data: Store) => void;
}

class SearchArea extends Component<TheseProps> {

    public constructor(props: TheseProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.searchStores = this.searchStores.bind(this);
        this.selectStore = this.selectStore.bind(this);
        this.onChangeHFC = this.onChangeHFC.bind(this);
    }

    public state: State = {
        search: "Search Sainsbury's Stores",
        value: '',
        showHFC: false,
        openNow: false,
        loading: false,
        number: 0
    }

    private async onClick () {
        if(this.state.value === "") {
            return
        }
        this.props.setLoading()
        const response = await fetch(`https://api.stores.sainsburys.co.uk/v1/stores/${this.state.value}`)
        await response.json().then(data => this.props.updateStore(data.store))
    }

    private onChangeHFC(event: React.ChangeEvent<HTMLInputElement>) {
        if(event.currentTarget.id === "switchField-hotFood") {
            this.setState({showHFC: !this.state.showHFC})
        }
        else{
            this.setState({openNow: !this.state.openNow})
        }
    }

    private searchStores(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({selectedStore: event.target.value})
    }
    
    private selectStore(event: SelectType) {
        if(event === null) {
            return;
        }
        this.setState({value: event.value})
    }

    public render() {
        let openNow = moment().format('YYYY-MM-DD HH:mm')
        const loadOptions = async (value: string) => {
            let url = `https://api.stores.sainsburys.co.uk/v1/stores/?complete=${value}`;
            if(this.state.showHFC === true) {
                url = `https://api.stores.sainsburys.co.uk/v1/stores/?complete=${value}&facility=Hot+Food+Counter`
            } 
            if(this.state.openNow === true) {
                url = `https://api.stores.sainsburys.co.uk/v1/stores/?complete=${value}&open_at=${openNow}`
            }
            if(this.state.openNow && this.state.showHFC === true)
                url = `https://api.stores.sainsburys.co.uk/v1/stores/?complete=${value}&facility=Hot+Food+Counter&open_at=${openNow}`
            return await fetch(url)
                .then(response => response.json())
                .then(response =>
                    response.results.map((item: SimpleStoreDetail) => ({
                        label: item.other_name,
                        value: item.code,
                    })),
                )}

        return (

            <Accordion multipleOpen titleElement="h3">
                <AccordionItem className="Containers" title="Search Sainsbury's Stores">

                    <p className="Search">Search Sainsbury&apos;s Stores:</p>
            
                    <SwitchField
                        name="switchField"
                        className="Switch"
                        onChange={this.onChangeHFC}
                        listType="inline"
                        options={[
                            { value: 'hotFood',       label: 'Hot Food Counters' },
                            { value: 'openStoreNow',  label: 'Stores Open Now' } ] } />

                    <AsyncAutocompleteField
                        name="async-autocomplete-field-1"
                        label=""
                        placeholder="Search Sainsbury's Stores..."
                        loadOptions={loadOptions}
                        onChange={this.searchStores}
                        onSelect={this.selectStore}
                        minChars={3} />

                    <OutlinedButton 
                        className="SearchButton"
                        onClick={this.onClick}>
                        Search
                    </OutlinedButton> 
                </AccordionItem>
            </Accordion>
        )
    }
}

export default SearchArea