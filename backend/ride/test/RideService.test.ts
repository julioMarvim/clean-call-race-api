import AccountService from "../src/AccountService"
import RideService from "../src/RideService"

test("Deve solicitar uma corrida", async function() {
  const passengerRequest = {
    name: "Julio Marvim",
    email: `juliomarvim${Math.random()}@mail.com.br`,
    cpf:"03765208094",
    isPassenger: true
  }
  const accountService = new AccountService()
  const passenger = await accountService.signup(passengerRequest)

  const input = {
    passengerId: passenger.accountId,
    from: { lat: -19.9312, long: -43.9371 },
    to: { lat: -19.9239, long:  -43.9379 },
  }
  const rideService = new RideService(accountService)
  const output = await rideService.request(input)
  expect(output.rideId).toBeDefined()
})

test("Quando o solicitante não for um passageiro deve retornar um erro", async function() {

  const driverRequest = {
    name: "Julio Marvim",
    email: `juliomarvim${Math.random()}@mail.com.br`,
    cpf: "03765208094",
    isDriver: true,
    carPlate: "AAA9999"
  }
  const accountService = new AccountService()
  const driver = await accountService.signup(driverRequest)
  const input = {
    passengerId: driver.accountId,
    from: { lat: -19.9312, long: -43.9371 },
    to: { lat: -19.9239, long:  -43.9379 },
  }
  const rideService = new RideService(accountService)
  await expect(() => rideService.request(input)).rejects.toThrow(new Error("This user is not a passenger"))
})