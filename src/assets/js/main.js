const arrowFn = (a,b)=>a+b
const arrA = [12,56,34,89]
const arrB = [7,90,88,45]
const arrC = [...arrA,...arrB]
const res = arrowFn(12, 56)
const newArr = arrC.map((el,i)=>{
    el = el+res+i
})
let fetchRes = ''
console.log(`
arrowFn: ${arrowFn},
arrA: ${arrA},
arrB: ${arrB},
arrC: ${arrC},
res: ${res},
newArr: ${newArr},
fetchRes: ${fetchRes}
`)
console.log(`
arrowFn: ${arrowFn},
arrA: ${arrA},
arrB: ${arrB},
arrC: ${arrC},
res: ${res},
newArr: ${newArr},
fetchRes: ${fetchRes}
`)