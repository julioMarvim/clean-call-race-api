import AccountService from "../../src/service/AccountService"

test("Deve retornar um passageiro", async function () {
  const input = {
    name: "Julio Marvim",
    email: `juliomarvim${Math.random()}@mail.com.br`,
    cpf:"03765208094",
    isPassenger: true
  }
  const accountService = new AccountService()
  const output = await accountService.signup(input)
  const account = await accountService.getAccount(output.accountId)
  expect(account.account_id).toBeDefined()
  expect(account.name).toBe(input.name)
  expect(account.email).toBe(input.email)
  expect(account.cpf).toBe(input.cpf)
})

test("Deve retornar um motorista", async function () {
  const input = {
    name: "Julio Marvim",
    email: `juliomarvim${Math.random()}@mail.com.br`,
    cpf: "03765208094",
    isDriver: true,
    carPlate: "AAA9999"
  }
  const accountService = new AccountService()
  const output = await accountService.signup(input)
  expect(output.accountId).toBeDefined()
})

test("Não deve retornar um motorista quando a placa for invalida", async function () {
  const input = {
    name: "Julio Marvim",
    email: `juliomarvim${Math.random()}@mail.com.br`,
    cpf: "03765208094",
    isDriver: true,
    carPlate: "DAS-5432"
  }
  const accountService = new AccountService()
  await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid plate"))
})

test("Não deve retornar um passageiro quando o cpf for invalido", async function () {
  const input = {
    name: "Julio Marvim",
    email: `juliomarvim${Math.random()}@mail.com.br`,
    cpf: "03765208000",
    isPassenger: true
  }
  const accountService = new AccountService()
  await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid cpf"))
})

test("Não deve retornar um passageiro quando o email for invalido", async function () {
  const input = {
    name: "Julio Marvim",
    email: `juliomarvim${Math.random()}`,
    cpf: "03765208094",
    isPassenger: true
  }
  const accountService = new AccountService()
  await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid email"))
})

test("Não deve retornar um passageiro quando o nome for invalido", async function () {
  const input = {
    name: "Julio",
    email: `juliomarvim${Math.random()}@mail.com.br`,
    cpf: "03765208094",
    isPassenger: true
  }
  const accountService = new AccountService()
  await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid name"))
})

test("Não deve retornar um passageiro quando o email ja foi usado em outra conta", async function () {
  const input = {
    name: "Julio Marvim",
    email: `juliomarvim${Math.random()}@mail.com.br`,
    cpf: "03765208094",
    isPassenger: true
  }
  const accountService = new AccountService()
  await accountService.signup(input)
  await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Account already exists"))
})