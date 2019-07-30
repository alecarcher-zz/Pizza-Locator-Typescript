import { OpeningTime } from "./types";

export interface LocalState {
    latitude: string;
    longitude: string;
    loading: boolean;
    localName: string;
    localAddress: string;
    localCity: string;
    localCountry: string;
    localPostCode: string;
    localTelephone: string;
    localManager: string;
    localHours: OpeningTime[];
    loadingLocal: boolean;
}