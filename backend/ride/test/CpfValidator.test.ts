import CpfValidator from "../src/CpfValidator"

test("Deve validar um cpf", function () {
  expect(CpfValidator.validate("03765208094")).toBeTruthy()
})