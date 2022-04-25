// const encrypt = (text, e, N) => {
//   console.log("e,N", e, N);
//   text = text.toString();
//   const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
//   const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);

//   return text
//     .split("")
//     .map(textToChars)
//     .map((item) => {
//       let nSum = BigInt(1);
//       for (let i = 0; i < e; i++) {
//         nSum = nSum * BigInt(item);
//       }
//       nSum = nSum % BigInt(N);
//       return nSum;
//     })
//     .map(byteHex)
//     .join("");
// };
// const decrypt = (valueEncrypt, d, N) => {
//   let value = valueEncrypt;
//   return value
//     .match(/.{1,2}/g)
//     .map((hex) => BigInt(parseInt(hex, 16)))
//     .map((item) => {
//       let nSum = BigInt(1);
//       for (let i = 0; i < d; i++) {
//         nSum = nSum * BigInt(item);
//       }
//       nSum = nSum % BigInt(N);
//       return nSum;
//     })
//     .map((charCode) => String.fromCharCode(Number(charCode)))
//     .join("");
// };

// let resultEncrypt = encrypt(99, 29, 221);
// console.log("encrypt", resultEncrypt);
// console.log("decrypt", decrypt(resultEncrypt, 53, 221));
// console.log("-----------------------------------");

// ------------------------------------------------------------------------------------------
