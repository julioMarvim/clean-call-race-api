import crypto from "crypto"
import AccountService from "./AccountService"
import pgp from "pg-promise";

export default class RideService{
  private readonly accountService: AccountService

  constructor(accountService: AccountService) {
    this.accountService = accountService
  }
  
  async request(input: any) {
    const connection = pgp()(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/race`);
    try{
      const passenger = await this.accountService.getAccount(input.passengerId)
      if(!passenger.is_passenger) throw new Error("This user is not a passenger")
      const rideId = crypto.randomUUID()
      const date = new Date();
      await connection.query("insert into race.ride (ride_id, passenger_id, driver_id, status, fare, distance, from_lat, from_long, to_lat, to_long, date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", 
        [rideId, passenger.account_id, null, "requested", 0, 0, input.from.lat, input.from.long, input.to.lat, input.to.long, date])
      return {
        rideId
      }
    }finally {
      await connection.$pool.end()
    }
  } 
}