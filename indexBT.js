const { BinarySearchTree } = require("./BinaryTree");

//ประกาศ ​class  BinarySearchTree เพื่อเก็บข้อมูลแบบ Binary Search Tree
var BST = new BinarySearchTree();

// const createE = (Zn) => {
//   let arrPrimeNumber = [];
//   for (let i = 2; i <= Zn; i++) {
//     let res = gcd(i, Zn);
//     if (res == 1) return i;
//   }
// };

// function ตรวจสอบว่าเลข 2 ตัว comprimes กันมั้ย
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

//ตรวจสอบว่าเลขที่เข้ามาเป็น จำนวนเฉพาะหรือไม่
const isPrime = (num) => {
  // Math.sqrt(num) รากที่สองของ num
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return false;
  return num > 1;
};
//่หาตัวหารรวมมาก
var gcd = function (a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
};
//function สร้างค่า e
const createE = (T) => {
  let arrPrimeNumber = [];
  //loop ตาม T = (p-1)*(q-1)
  for (let i = 2; i <= T; i++) {
    // function ตรวจสอบว่า i  comprimes กับ T มั้ย ถ้าเป็นจริง return true
    let res = areCoprimes(i, T);
    if (res) {
      //ตรวจสอบว่า i เป็น จำนวนเฉพาะหรือไม่ ถ้าเป็นจริง return true
      let isCheck = isPrime(i);
      if (isCheck) {
        // console.log("i,res", i, res);
        arrPrimeNumber.push(i);
      }
    }
  }
  // สุ่มค่า e จาก arrPrimeNumber
  let randomPrimeNumber =
    arrPrimeNumber[Math.floor(Math.random() * arrPrimeNumber.length)];
  return randomPrimeNumber;
};

//function สร้างค่า d จาก สูตร RSA หาค่า d คือ (d*e)%T = 1
// หาค่า d เพื่อให้ สมาการ (d*e)%T = 1 เป็นจริง
const createD = (e, T) => {
  let i = 1;
  let loop = true;
  let d;
  //loop ตั้งแต่ ค่าที่ i= 1 จนกว่า (i * e) % T = 1
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
//function สร้าง Key N T e d
const generateKey = (p, q) => {
  let N = p * q;
  let T = (p - 1) * (q - 1);
  //เรียก ฟังชั่น createE() เพื่อหา e
  let e = createE(T);
  //เรียก ฟังชั่น createD() เพื่อสร้าง d
  let d = createD(e, T);
  return {
    N,
    T,
    e,
    d,
  };
};
// ฟังชั่นเข้ารหัส RSA จากสูตร c = (m^e)%(p*q)
// c = ค่าที่ถูกเข้ารหัสแล้ว , m = ข้้อมูลที่จะเข้ารหัส
const encrypt = (num, e, n) => {
  let nSum = BigInt(1);
  //loop เพื่อหาค่า m^e
  for (let i = 0; i < e; i++) {
    nSum = nSum * BigInt(num);
  }
  //return (m^e)%(p*q)
  return nSum % BigInt(n);
};

// ฟังชั่นเข้ารหัส RSA จากสูตร m = (c^d)%(p*q)
// c = ค่าที่ถูกเข้ารหัสแล้ว , m = ข้้อมูลที่ถอดเข้ารหัสแล้ว
const decrypt = (num, d, n) => {
  let nSum = BigInt(1);
  //loop เพื่อหาค่า m^d
  for (let i = 0; i < d; i++) {
    nSum = nSum * BigInt(num);
  }
  //return (m^d)%(p*q)
  return nSum % BigInt(n);
};

//function สุ่มจำนวนเฉพาะ getPrimes getRandNum getRandPrime
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

//function สุ่มจำนวนเฉพาะ ให้ p , q โดยขอบเขตจำนวนเฉพาะคือ 10 ถึง 100
const genPQ = () => {
  let p;
  let q;
  do {
    p = getRandPrime(10, 100);
    q = getRandPrime(10, 100);
  } while (p === q);
  return { p, q };
};

//ทำซ่ำข้อมูลเข้า 10 ชุด
const loop = () => {
  for (let i = 0; i < 10; i++) {
    //เรียกใช้ genPQ() เพื่อสร้าง p,q
    let { p, q } = genPQ();
    //เรียกใช้ generateKey() เพื่อสร้าง T ,N ,e ,d
    let { T, N, e, d } = generateKey(p, q);
    //ข้อมุลที่จะเข้ารหัส
    let value = 57;
    //เข้ารหัสด้วยฟังชั่น encrypt(ข้อมูลทีี่จะเข้ารหัส, ค่า e , ค่า N)
    let resultEncrypt = encrypt(value, e, N);
    //เข้ารหัสด้วยฟังชั่น decrypt(ข้อมูลทีี่ถูกเข้ารหัส, ค่า d, ค่า N)
    let resultDecrypt = decrypt(resultEncrypt, d, N);
    //เพิ่มข้อมูลเข้า BinaryTree
    BST.insert(value, resultEncrypt, Number(resultDecrypt), e, d, N);
  }
  //แสดงข้อมูล ทั้ง 10 ชุด
  var root = BST.getRootNode();
  BST.inorder(root);
};
loop();
