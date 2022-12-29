
//obtener numero aleatorios parcialmente randoms
const randomNumber = (min, max) => Math.floor(Math.random()*(max-min+1))+min;
const results = {};

for (let i=0; i<10000; i++){
    const number = randomNumber(1, 20); 
    if(!results[number]){
        results[number]=1;
    }else {
        results[number]++;
    }
};
console.log(results);
 const number = Object.values(results);
console.log(number);
 const init = 0;
 const sumnumReduce = number.reduce(
    
 );
console.log(sumnumReduce);