export class ConvertData {
    public static convertCities(cities: Array<Ryanair.Airport>): Array<Ryanair.CitySelection> {
        const airports = cities.map((airport: Ryanair.Airport) => {
            return {
                key: airport.iataCode,
                name: `${airport.name} (${airport.country.name})`,
            };
        });
        return airports;
    }
    public static getRoutes(departureCity: string, routes: Ryanair.Routes) {
        return routes[departureCity];
    }
}
