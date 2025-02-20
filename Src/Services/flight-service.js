const {FlightRepository,AirplaneRepository} = require('../repository/index');
const { compareTime } = require('../Utils/helper');

class FlightService {
    constructor() {
        this.airplaneRepository = new AirplaneRepository();
        this.flightrepository = new FlightRepository();
     }

    async createFlight(data) {
        try{
            if(!compareTime(data.arrivalTime,data.departureTime)){
                throw{error:'arrival time cannot be less than departure time.'}
            }
           const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
           const flight = await this.flightrepository.createFlight({
            ...data, totalSeats:airplane.capacity
           });
           return flight;
        }catch(error){
            console.log("Something wrong at repository layer");
            throw {error};
        }
    }

    async getAllFlightData(data){
        try {
            const flights = await this.flightrepository.getAllFlights(data);
            return flights;
        } catch (error) {
            console.log("Something wrong at repository layer");
            throw {error};
        }
    }

    async getFlight(flightId){
        try {
            const flight = await this.flightrepository.getFlight(flightId);
            return flight;
        } catch (error) {
            console.log("Something wrong at repository layer");
            throw {error};
        }
    }

    async updateFlight(flightId,data){
        try {
            const response = await this.flightrepository.updateFlight(flightId,data);
            return response;
        } catch (error) {
            console.log("Something wrong at repository layer");
            throw {error};
        }
    }
}

/** 
 * flightNumber
 * airplaneId
 * departureAirportId
 * arrivalAirportId
 * arrivaltime
 * departureTime
 * price
 * totalSeats-> airplane
*/

module.exports = FlightService;