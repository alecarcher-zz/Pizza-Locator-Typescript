export interface SearchState {
    result: string;
    storeName: string;
    storeAddress: string;
    storeCity: string;
    storeCountry: string;
    storePostCode: string;
    storeTelephone: string;
    storeManager: string;
    openingHours: string[];
    loading: boolean;
}