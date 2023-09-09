import AccountService from "../src/AccountService"
import RideService from "../src/RideService"

test("Deve solicitar uma corrida", async function() {
  const input = {
    passengerId: "4225e6a6-6d49-4343-a275-9589138cee4b",
    from: { lat: "nao sei", long: "nao sei" },
    to: { lat: "nao sei", long:  "nao sei" },
  }
  const accountService = new AccountService()
  const rideService = new RideService(accountService)
  const output = await rideService.request(input)
  expect(output.rideId).toBeDefined()
})