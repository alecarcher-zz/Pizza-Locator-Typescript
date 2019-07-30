export interface AdditionalData {
}

export interface Closed {
    description: string;
    end_date?: any;
    start_date?: any;
}

export interface Contact {
    address1: string;
    address2: string;
    city: string;
    country: string;
    country_code: string;
    country_name: string;
    county: string;
    fax_number: string;
    manager: string;
    post_code: string;
    state: string;
    telephone: string;
}

export interface Facility {
    category_id: number;
    category_name: string;
    id: number;
    name: string;
}

export interface ConfidenceInManagement {
    description: string;
    score: number;
}

export interface Hygiene {
    description: string;
    score: number;
}

export interface Structural {
    description: string;
    score: number;
}

export interface FsaScores {
    confidence_in_management: ConfidenceInManagement;
    fhrs_id: number;
    hygiene: Hygiene;
    rating_date: string;
    score: string;
    structural: Structural;
}

export interface LocalCharity {
    charity_category: string;
    charity_name: string;
    charity_url: string;
    nomination_number: number;
    registered_charity_number: string;
    winner: boolean;
}

export interface LocalCharity2 {
    charity_category: string;
    charity_name: string;
    charity_url: string;
    registered_charity_number: string;
}

export interface Location {
    lat: string;
    lon: string;
}

export interface Time {
    end_time: string;
    start_time: string;
}

export interface OpeningTime {
    day: number;
    end_time: string;
    start_time: string;
    times: Time[];
}

export interface ZoneGroup {
    zone_description: string;
    zone_group_description: string;
    zone_group_id: number;
    zone_id: number;
}

export interface Store {
    additional_data: AdditionalData;
    closed: Closed;
    code: string;
    contact: Contact;
    district_code: string;
    exception_times: any[];
    facilities: Facility[];
    fsa_scores: FsaScores;
    local_charities: LocalCharity[];
    local_charity: LocalCharity2;
    location: Location;
    name: string;
    opening_times: OpeningTime[];
    other_name: string;
    store_type: string;
    zone_groups: ZoneGroup[];
}

export interface RootObject {
    store: Store;
}