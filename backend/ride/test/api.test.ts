import axios from "axios"

 test("Deve criar uma conta de passageiro", async function() {
  const input = {
    name: "Julio Marvim",
    email: `juliomarvim${Math.random()}@mail.com.br`,
    cpf:"03765208094",
    isPassenger: true
  }
  const responseSignup = await axios.post('http://localhost:3000/signup', input)
  const outputSignup = responseSignup.data
  const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`)
  const outputGetAccount = responseGetAccount.data
  expect(outputGetAccount.account_id).toBeDefined()
  expect(outputGetAccount.name).toBe(input.name)
  expect(outputGetAccount.email).toBe(input.email)
  expect(outputGetAccount.cpf).toBe(input.cpf)
 })