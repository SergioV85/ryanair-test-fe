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

    interface CityObject {
        code: string;
        name: string;
    }

    interface CitySelection {
        desription: string;
        image: string;
        originalObject: {
            code: string;
            name: string;            
        }
        title: string;
    }

    interface DateSelection {
        max: string;
        min: string;
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

    interface Flight {
        currency: string;
        dateFrom: string;
        dateTo: string;
        price: number;
    }

    interface Routes {
        [key: string]: Array<string>;
    }
}
