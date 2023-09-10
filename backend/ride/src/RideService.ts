import crypto from "crypto"
import AccountService from "./AccountService"

export default class RideService{
  private readonly accountService: AccountService

  constructor(accountService: AccountService) {
    this.accountService = accountService
  }
  
  async request(input: any) {
    const {is_passenger} = await this.accountService.getAccount(input.passengerId)
    if(!is_passenger) throw new Error("This user is not a passenger")
    const rideId = crypto.randomUUID()
    return {
      rideId
    }
  } 
}