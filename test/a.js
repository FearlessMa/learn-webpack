// (num1 << rightMoveNum) | num2;
// function BinaryOperation(num1, rightMoveNum, num2) {
//   const max = Math.pow(2, 31) - 1;
//   if (num2 < max) {
//     return (num1 << rightMoveNum) | num2;
//   }
//   // 转化为2进制字符串
//   let binaryStr1 = (num1 << rightMoveNum).toString(2);
//   let binaryStr2 = num2.toString(2);
//   // 获取最长length
//   const len = binaryStr1.length > binaryStr2.length ? binaryStr1.length : binaryStr2.length;
//   const binaryArr = [];
//   binaryStr1 = binaryStr1.padStart(len, '0');
//   binaryStr2 = binaryStr2.padStart(len, '0');
//   for (let i = len - 1; i >= 0; i--) {
//     const b1 = binaryStr1[i];
//     const b2 = binaryStr2[i];
//     if (b1 == 1 || b2 == 1) {
//       binaryArr.unshift(1);
//     } else {
//       binaryArr.unshift(0);
//     }
//   }
//   const newValue = binaryArr.join('');
//   return parseInt(newValue, 2);
// }

/**
 * 位运算右移动 - 0<<24
 *
 * @param {*} num 运算值
 * @param {*} rightMoveNum 移动位数
 * @returns num 二进制计算后结果
 */
function bitMoveOperation(num, rightMoveNum) {
  const binaryStr = num.toString(2);
  const len = binaryStr.length;
  // js 二进制为32位
  if (len + rightMoveNum < 31) {
    return num << rightMoveNum;
  }
  const str = binaryStr.padEnd(len + rightMoveNum, 0);
  return parseInt(str, 2);
}

/**
 * 按位或运算  12|10
 *
 * @param {*} num1 number
 * @param {*} num2 number
 * @returns num
 */
function BitwiseOrOperation(num1, num2) {
  const max = Math.pow(2, 31) - 1;
  if (num2 < max && num1 < max) {
    return num1 | num2;
  }
  // 转化为2进制字符串
  let binaryStr1 = num1.toString(2);
  let binaryStr2 = num2.toString(2);
  // 获取最长length
  const len = binaryStr1.length > binaryStr2.length ? binaryStr1.length : binaryStr2.length;
  const binaryArr = [];
  binaryStr1 = binaryStr1.padStart(len, '0');
  binaryStr2 = binaryStr2.padStart(len, '0');
  for (let i = len - 1; i >= 0; i--) {
    const b1 = binaryStr1[i];
    const b2 = binaryStr2[i];
    if (b1 == 1 || b2 == 1) {
      binaryArr.unshift(1);
    } else {
      binaryArr.unshift(0);
    }
  }
  const newValue = binaryArr.join('');
  return parseInt(newValue, 2);
}

function BinaryOperation(num1, rightMoveNum, num2) {
  const res = bitMoveOperation(num1, rightMoveNum);
  return BitwiseOrOperation(res, num2);
}


const num1 = bitMoveOperation(1, 24);
const res = BitwiseOrOperation(num1, 100);
console.log('res: ', res);
console.log('BinaryOperation: ', BinaryOperation(1, 24, 100));
