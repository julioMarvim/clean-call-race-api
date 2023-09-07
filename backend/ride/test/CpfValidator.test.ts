import CpfValidator from "../src/CpfValidator"

test("Deve validar um cpf", function () {
  expect(CpfValidator.validate("03765208094")).toBeTruthy()
})

test("Deve validar um cpf com final 00", function () {
  expect(CpfValidator.validate("67118162000")).toBeTruthy()
})