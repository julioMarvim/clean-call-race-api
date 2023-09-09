import crypto from "crypto"
import AccountService from "./AccountService"

export default class RideService{
  private readonly accountService: AccountService

  constructor(accountService: AccountService) {
    this.accountService = accountService
  }
  
  request(input: any): any {
    const rideId = crypto.randomUUID()
    return {
      rideId
    }
  }
}