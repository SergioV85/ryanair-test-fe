declare namespace Ryanair {
    interface GlobalData {
        airports: Array<Airport>;
        closures: {}
        countries: Array<Country>;
        discounts: {
            countries: {
                [key: string]: Array<string>;
            };
            routes: {
                [key: string]: Array<string>;
            };
            types: Array<Discount>
        };
        messages: {
            [key: string]: string
        };
        routes: Routes
    }

    interface Airport {
        base: boolean;
        country: Country;
        iataCode: string;
        latitude: number;
        longitude: number;
        name: string;
    }

    interface CitySelection {
        key: string;
        name: string;
    }

    interface Country {
        code: string;
        currency: string;
        englishSeoName: string;
        name: string;
        seoName: string;
        url: string;
    }

    interface Discount {
        code: string;
        globalCode: string;
        name: string;
        percentage: number;
    }

    interface Routes {
        [key: string]: Array<string>;
    }
}