import express from "express"
import AccountService from "./AccountService"

const app = express()
app.use(express.json())

const accountService = new AccountService()

app.post("/signup", async function (rec, res){
  const input = rec.body
  const output = await accountService.signup(input)
  res.json(output)
})

app.get("/accounts/:accountId", async function (rec, res){
  const output = await accountService.getAccount(rec.params.accountId)
  res.json(output)
})

app.listen(3000)