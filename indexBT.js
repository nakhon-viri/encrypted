const { BinarySearchTree } = require("./BinaryTree");
var BST = new BinarySearchTree();
const areCoprimes = (num1, num2) => {
  for (let i = 2; i < num1; i++) {
    const condition1 = num1 % i === 0;
    const condition2 = num2 % i === 0;
    if (condition1 && condition2) {
      return false;
    }
  }
  return true;
};
const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return false;
  return num > 1;
};
var gcd = function (a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
};
const createE = (Zn) => {
  let arrPrimeNumber = [];
  for (let i = 2; i <= Zn; i++) {
    let res = areCoprimes(i, Zn);
    if (res) {
      let isCheck = isPrime(i);
      if (isCheck) {
        // console.log("i,res", i, res);
        arrPrimeNumber.push(i);
      }
    }
  }
  let randomPrimeNumber =
    arrPrimeNumber[Math.floor(Math.random() * arrPrimeNumber.length)];
  return randomPrimeNumber;
};
// const createE = (Zn) => {
//   let arrPrimeNumber = [];
//   for (let i = 2; i <= Zn; i++) {
//     let res = gcd(i, Zn);
//     if (res == 1) return i;
//   }
// };
const createD = (e, T) => {
  let i = 1;
  let loop = true;
  let d;
  while (loop) {
    let res = (i * e) % T;
    if (res == 1) {
      d = i;
      loop = false;
    }
    i++;
  }
  return d;
};
const generateKey = (p, q) => {
  let N = p * q;
  let T = (p - 1) * (q - 1);
  let e = createE(T);
  let d = createD(e, T);
  return {
    N,
    T,
    e,
    d,
  };
};
// decrypt encrypt
const encrypt = (num, e, n) => {
  let nSum = BigInt(1);
  for (let i = 0; i < e; i++) {
    nSum = nSum * BigInt(num);
  }
  return nSum % BigInt(n);
  // return nSum % BigInt(n);
};
const decrypt = (num, d, n) => {
  let nSum = BigInt(1);
  for (let i = 0; i < d; i++) {
    nSum = nSum * BigInt(num);
  }
  // return nSum % BigInt(n);
  return nSum % BigInt(n);
};
const getPrimes = (min, max) => {
  const result = Array(max + 1)
    .fill(0)
    .map((_, i) => i);
  for (let i = 2; i <= Math.sqrt(max + 1); i++) {
    for (let j = i ** 2; j < max + 1; j += i) delete result[j];
  }
  return Object.values(result.slice(Math.max(min, 2)));
};

const getRandNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandPrime = (min, max) => {
  const primes = getPrimes(min, max);
  return primes[getRandNum(0, primes.length - 1)];
};

const genPQ = () => {
  let p;
  let q;
  do {
    p = getRandPrime(10, 100);
    q = getRandPrime(10, 100);
  } while (p === q);
  return { p, q };
};

const loop = () => {
  for (let i = 0; i < 10; i++) {
    let { p, q } = genPQ();
    let { T, N, e, d } = generateKey(p, q);
    let value = 57;
    // console.log("before", value);
    let resultEncrypt = encrypt(value, e, N);
    // console.log("encrypt", resultEncrypt);
    let resultDecrypt = decrypt(resultEncrypt, d, N);
    // console.log("decrypt", resultDecrypt);
    // console.log("after", decrypt(resultEncrypt, d, N));
    // console.log("-----------------------------------");
    BST.insert(value, resultEncrypt, Number(resultDecrypt), e, d, N);
  }
  var root = BST.getRootNode();
  BST.inorder(root);
};
loop();
