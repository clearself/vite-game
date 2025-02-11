
import { v4 as uuidv4 } from 'uuid'
function getRandomElement(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
function getRandomInt(min, max) {
  var randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);
  return Math.floor((randomArray[0] / (Math.pow(2, 32) - 1)) * (max - min + 1)) + min;
}
/**
 * 手机尾号测评核心逻辑
 * @param {string} tailNumber 手机尾号后4位（字符串格式，如"4218"）
 * @returns {object} 包含分数和评语的对象
 */
export const  evaluatePhoneTail = (tailNumber) => {
  // 1. 输入校验
  if (!/^\d{4}$/.test(tailNumber)) {
    throw new Error("请输入4位数字");
  }

  // 2. 拆解数字为数组，如 "4218" → [4, 2, 1, 8]
  const digits = tailNumber.split('').map(Number);

  // 3. 评分算法
  let score = 0;

  // 规则1：特殊组合直接定分
  const specialCases = {
    '0000': 80,
    '1111': 90,
    '2222': 90,
    '3333': 95,
    '5555': 90,
    '6666': 100,
    '7777': 90,
    '8888': 100,
    '9999': 100,
    '1314': 99,
    '1234': 84,
    '2345': 85,
    '3456': 86,
    '4567': 87,
    '5678': 88,
    '6789': 89,
    '9876': 81,
    '8765': 82,
    '7654': 83,
    '6543': 84,
    '5432': 85,
    '4321': 86,
  };
  if (specialCases[tailNumber] !== undefined) {
    score = specialCases[tailNumber];
  } else {
    // 规则2：加权计算
    const weights = [2, 1, 3, 4]; // 每位权重
    score = digits.reduce((sum, digit, index) => {
      return sum + digit * weights[index];
    }, 0);
    // 规则3：吉祥数字加成
    const luckyBonus = {
      8: 15,   // 尾号8大吉
      6: 10,   // 6顺
      9: 5     // 9长久
    };
    score += luckyBonus[digits[3]] || 0; // 最后一位最重要
    // 规则4：忌讳数字扣分
    if (digits.includes(4)) score -= 10;  // 含4扣分
  }
  // 分数范围约束（0-100）
  console.log(score,'score')
  if(score<70){
    if (score >= 60 && score < 70) {
      score = getRandomInt(0, 5) + 80;
    } else if (score >= 40 && score < 60) {
      score = getRandomInt(0, 5) + 75;
    } else if (score >= 0 && score < 40) {
      score = getRandomInt(0, 5) + 70;
    }
  }
  const _score = getRandomInt(0, 9) + 70;
  score = Math.min(Math.max(score, _score), 100);

  // 4. 生成趣味评语
  const comments = {
   100: {
     descs:["非常珍贵"],
     level:'极品'
   },
   99: {
     descs:["非常珍贵"],
     level:'极品'
   },
   98: {
     descs:["非常珍贵"],
     level:'极品'
   },
   97: {
     descs:["非常珍贵"],
     level:'极品'
   },
   96: {
     descs:["非常珍贵"],
     level:'极品'
   },
   95: {
     descs:["非常珍贵"],
     level:'极品'
   },
   94: {
     descs:["保持使用"],
     level:'优秀'
   },
   93: {
     descs:["保持使用"],
     level:'优秀'
   },
   92: {
     descs:["保持使用"],
     level:'优秀'
   },
   91: {
     descs:["保持使用"],
     level:'优秀'
   },
   90: {
     descs:["保持使用"],
     level:'优秀'
   },
   89: {
     descs:["可以使用"],
     level:'中上'
   },
   88: {
     descs:["可以使用"],
     level:'中上'
   },
   87: {
     descs:["可以使用"],
     level:'中上'
   },
   86: {
     descs:["可以使用"],
     level:'中上'
   },
   85: {
     descs:["可以使用"],
     level:'中上'
   },
   84: {
     descs:["可以使用"],
     level:'良好'
   },
   83: {
     descs:["可以使用"],
     level:'良好'
   },
   82: {
     descs:["可以使用"],
     level:'良好'
   },
   81: {
     descs:["可以使用"],
     level:'良好'
   },
   80: {
     descs:["可以使用"],
     level:'良好'
   },
   79: {
     descs:["勉强使用"],
     level:'及格'
   },
   78: {
     descs:["勉强使用"],
     level:'及格'
   },
   77: {
     descs:["勉强使用"],
     level:'及格'
   },
   76: {
     descs:["勉强使用"],
     level:'及格'
   },
   75: {
     descs:["勉强使用"],
     level:'及格'
   },
   74: {
     descs:["建议更换"],
     level:'一般'
   },
   73: {
     descs:["建议更换"],
     level:'一般'
   },
   72: {
     descs:["建议更换"],
     level:'一般'
   },
   71: {
     descs:["建议更换"],
     level:'一般'
   },
   70: {
     descs:["建议更换"],
     level:'一般'
   }
  };
  const result:any = {
    id:uuidv4(),
    phone: tailNumber,
    score,
    level:comments[score].level,
    desc:getRandomElement(comments[score].descs)
  }
  return result
}
