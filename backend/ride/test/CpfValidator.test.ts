import CpfValidator from "../src/CpfValidator"

test("Deve validar um cpf", function () {
  expect(CpfValidator.validate("03765208094")).toBeTruthy()
})

test("Deve validar um cpf com final 00", function () {
  expect(CpfValidator.validate("67118162000")).toBeTruthy()
})

test("Deve retornar false para um cpf com menos de 11 caracteres", function () {
  expect(CpfValidator.validate("6711816200")).toBeFalsy()
})

test("Deve retornar false para um cpf com mais de 11 caracteres", function () {
  expect(CpfValidator.validate("037652080941")).toBeFalsy()
})