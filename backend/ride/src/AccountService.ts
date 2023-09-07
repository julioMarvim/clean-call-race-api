import crypto from "crypto";
import pgp from "pg-promise";
import dotenv from 'dotenv';

dotenv.config()

export default class AccountService {

	constructor () {
	}

	async sendEmail (email: string, subject: string, message: string) {
		console.log(email, subject, message);
	}

	validateCpf (str: string) {
		if (str !== null) {
			if (str !== undefined) {
				if (str.length >= 11 && str.length <= 14){
	
					str=str
						.replace('.','')
						.replace('.','')
						.replace('-','')
						.replace(" ","");  
		
					if (!str.split("").every(c => c === str[0])) {
						try{  
							let     d1, d2;  
							let     dg1, dg2, rest;  
							let     digito;  
								let     nDigResult;  
							d1 = d2 = 0;  
							dg1 = dg2 = rest = 0;  
								
							for (let nCount = 1; nCount < str.length -1; nCount++) {  
								// if (isNaN(parseInt(str.substring(nCount -1, nCount)))) {
								// 	return false;
								// } else {
		
									digito = parseInt(str.substring(nCount -1, nCount));  							
									d1 = d1 + ( 11 - nCount ) * digito;  
					
									d2 = d2 + ( 12 - nCount ) * digito;  
								// }
							};  
								
							rest = (d1 % 11);  
					
							dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;  
							d2 += 2 * dg1;  
							rest = (d2 % 11);  
							if (rest < 2)  
								dg2 = 0;  
							else  
								dg2 = 11 - rest;  
					
								let nDigVerific = str.substring(str.length-2, str.length);  
							nDigResult = "" + dg1 + "" + dg2;  
							return nDigVerific == nDigResult;
						}catch (e){  
							console.error("Erro !"+e);  
		
							return false;  
						}  
					} else return false
		
				}else return false;
			}
	
	
		} else return false;
	}

	async signup (input: any) {
		const connection = pgp()(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/race`);
		try {
			const accountId = crypto.randomUUID();
			const verificationCode = crypto.randomUUID();
			const date = new Date();
			const [existingAccount] = await connection.query("select * from race.account where email = $1", [input.email]);
			if (existingAccount) throw new Error("Account already exists");
			if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Invalid name");
			if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
			if (!this.validateCpf(input.cpf)) throw new Error("Invalid cpf");
			if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Invalid plate");
			await connection.query("insert into race.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, date, is_verified, verification_code) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [accountId, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver, date, false, verificationCode]);
			await this.sendEmail(input.email, "Verification", `Please verify your code at first login ${verificationCode}`);
			return {
				accountId
			}
		} finally {
			await connection.$pool.end();
		}
	}

	async getAccount (accountId: string) {
		const connection = pgp()(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/race`);
		const [account] = await connection.query("select * from race.account where account_id = $1", [accountId]);
		await connection.$pool.end();
		return account;
	}
}