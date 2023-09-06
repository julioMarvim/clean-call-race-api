import AccountService from "../src/AccountService"

test("Deve retornar um passageiro", async function () {
  //given
  const input = {
    name: "Julio Marvim",
    email: `juliomarvim${Math.random()}@mail.com.br`,
    cpf:"03765208094",
    isPassenger: true
  }
  //when
  const accountService = new AccountService()
  const output = await accountService.signup(input)
  //then
  expect(output.accountId).toBeDefined()
})