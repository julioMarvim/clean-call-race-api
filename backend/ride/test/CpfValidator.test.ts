import CpfValidator from "../src/CpfValidator"


const cpfValidator = new CpfValidator()

test.each([
  "03765208094",
  "01234567890",
  "565.486.780-60",
  "671.181.620-00"
])
("Deve validar um cpf", function (cpf: string) {
  expect(cpfValidator.validate(cpf)).toBeTruthy()
})

test.each([
  "6711816200",
  "037652080941",
  "00000000000",
  ""
])
("Não deve validar um cpf", function (cpf: string) {
  expect(cpfValidator.validate(cpf)).toBeFalsy()
})