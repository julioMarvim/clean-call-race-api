export default class CpfValidator{
  
  static validate (cpf: string) {
    if(!cpf) return false
    cpf=cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return false
    if (cpf.split("").every(c => c === cpf[0])) return false
    let d1 = 0
    let d2 = 0
    let rest = 0  
    let digito 
    let nDigResult;  
    for (let nCount = 1; nCount < cpf.length -1; nCount++) {  
      digito = parseInt(cpf.substring(nCount -1, nCount));  							
      d1 = d1 + ( 11 - nCount ) * digito;  

      d2 = d2 + ( 12 - nCount ) * digito;
    };   
    rest = (d1 % 11);  
    const dg1 = (rest < 2) ? 0 : 11 - rest;  
    d2 += 2 * dg1;  
    rest = (d2 % 11);  
    const dg2 = (rest < 2) ? 0 : 11 - rest;
      let nDigVerific = cpf.substring(cpf.length-2, cpf.length);  
    nDigResult = "" + dg1 + "" + dg2;  
    return nDigVerific == nDigResult; 
	}
}