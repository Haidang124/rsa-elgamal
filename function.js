// UCLN 2 số
var bigInt = require("big-integer");
function rsa() {
  var div = document.getElementById("content");
  let x = bigInt(document.getElementById("x").value).toString();
  let q = bigInt(document.getElementById("q").value).toString();
  let p = bigInt(document.getElementById("p").value).toString();
  let e = bigInt(document.getElementById("e").value).toString();
  let n = multiply(bigInt(q).toString(), bigInt(p).toString());
  let m = multiply(bigInt(q).add(-1).toString(), bigInt(p).add(-1).toString());
  let gcdNumber = gcd(e, m);
  div.innerHTML = "";
  div.innerHTML =
    '<p class="mb-2">Tóm tắt RSA :' +
    '<p class="mb-2"><b>Bản rõ x = </b>' +
    x +
    " </p>" +
    '<p class="mb-2"><b>p = </b>' +
    p +
    " </p>" +
    '<p class="mb-2"><b>q = </b>' +
    q +
    " </p>" +
    '<p class="mb-2"><b>e = </b>' +
    e +
    " </p>";
  if (gcdNumber === 1) {
    let d = bigInt(e).modInv(m).toString();
    let y = bigInt(x).modPow(e, n).toString();

    div.innerHTML +=
      '<p class="mb-2"><b>n =</b> p * q = ' +
      p +
      " * " +
      q +
      " = " +
      n +
      "</p>" +
      '<p class="mb-2"><b>m =</b> phi(n) = (p - 1)(q - 1) = ' +
      bigInt(p).add(-1).toString() +
      " * " +
      bigInt(q).add(-1).toString() +
      " = " +
      m +
      "</p>" +
      '<p class="mb-2"><b>Khóa công khai (e,n) = (' +
      e +
      " , " +
      n +
      ") </b></p>" +
      "</p>" +
      '<p class="mb-2"><b>Khóa bí mật d = </b> ' +
      d +
      " </p>";
    div.innerHTML +=
      '<p class="mb-2"><b>gcd(e, m) =</b>  1</p>' +
      '<p class="mb-2 bg-red">Ta nhân thấy e được chọn thỏa mãn gcd(e, m) = 1.';

    div.innerHTML +=
      '<h3 class="mt-4 bg-blue">Bước 1: Thực hiện tính khóa bí mật d </h3>' +
      '<p class="mb-2">Áp dụng thuật toán Euclid mở rộng, ta có: ' +
      '<p class="mb-2"><b>d = e ^ -1 mod m </b>= ' +
      e +
      " ^ -1 mod " +
      m +
      " = " +
      d +
      " ";
    // Bước 2
    div.innerHTML +=
      '<h3 class="mt-4 bg-blue">Bước 2: Mã hóa văn bản rõ x </h3>' +
      '<p class="mb-2">Áp dụng thuật toán bình phương và nhân, tính lũy thừa theo modulo: ' +
      '<p class="mb-2"><b>y = x ^ e mod n = </b>' +
      x +
      " ^ " +
      e +
      " mod " +
      n +
      " = " +
      y +
      "";
    // Bước 3
    div.innerHTML +=
      '<h3 class="mt-4 bg-blue">Bước 3: Giả mã </h3>' +
      '<p class="mb-2"><b>x = y ^ d mod n = </b>' +
      y +
      " ^ " +
      d +
      " mod " +
      n +
      " = " +
      bigInt(y).modPow(d, n).toString() +
      " ";
  } else {
    div.innerHTML +=
      '<p class="mb-2"><b>gcd(e, m) =</b> ' +
      gcdNumber +
      "</p>" +
      '<p class="mb-2 bg-red">gcd(e, m) = ' +
      gcdNumber +
      " != 1 ==> e được chọn không thỏa mãn";
  }
  // Bước 1

  document.body.appendChild(div);
}
function clearHtml() {
  var div = document.getElementById("content");
  div.innerHTML = "";
  document.body.appendChild(div);
}
function rsaKy() {
  if (document.getElementsByClassName("rsa-ky")[0].style.display === "none") {
    document.getElementsByClassName("rsa-ky")[0].style.display = "block";
  } else {
    document.getElementsByClassName("rsa-ky")[0].style.display = "none";
  }
}
function gcd(a, b) {
  a = a || 0;
  b = b || 0;
  if (a < b) {
    var tmp = a;
    a = b;
    b = tmp;
  }

  while (b != 0) {
    var r = a % b;
    a = b;
    b = r;
  }
  return a;
}

// nhân 2 số lớn
function multiply(a, b) {
  let isASingleDigit = 0,
    isBSingleDigit = 0;
  if (a < 9) {
    a *= 10;
    isASingleDigit = 1;
  }
  if (b < 9) {
    b *= 10;
    isBSingleDigit = 1;
  }
  let lengthOfA = a.length,
    lengthOfB = b.length,
    aInArry = [],
    bInArry = [];

  while (a.length > 7) {
    aInArry.push(a.substring(a.length - 7, a.length));
    a = a.substring(0, a.length - 7);
  }
  aInArry.push(a);

  while (b.length > 7) {
    bInArry.push(b.substring(b.length - 7, b.length));
    b = b.substring(0, b.length - 7);
  }
  bInArry.push(b);

  aInArry = aInArry.reverse();
  bInArry = bInArry.reverse();

  let answerLines = [];

  for (var i = aInArry.length - 1, j = 0; i >= 0; i--, j++) {
    answerLines[j] = bInArry.map((n) =>
      n * aInArry[i] === NaN ? "0000000" : n * aInArry[i]
    );
    var k = 0;
    while (k < j) {
      answerLines[j].push(0);
      k += 1;
    }
  }

  var answerInArray = answerLines[answerLines.length - 1];

  for (var j = 1; j < answerInArray.length; j++) {
    for (var i = 0; i < answerLines.length - 1; i++) {
      if (answerLines[i].length >= j) {
        answerInArray[answerInArray.length - j] +=
          answerLines[i][answerLines[i].length - j];
      }
    }
  }

  let ansFinish = [];

  for (var i = 0; i < answerInArray.length; i++) {
    ansFinish.push("");
  }

  for (var i = 1; i <= answerInArray.length; i++)
    if (i !== answerInArray.length) {
      ansFinish[ansFinish.length - i] = answerInArray[answerInArray.length - i]
        .toString()
        .substring(
          answerInArray[answerInArray.length - i].toString().length - 7,
          answerInArray[answerInArray.length - i].toString().length
        );
      answerInArray[answerInArray.length - i - 1] += parseInt(
        answerInArray[answerInArray.length - i]
          .toString()
          .substring(
            0,
            answerInArray[answerInArray.length - i].toString().length - 7
          )
      );
    } else ansFinish[0] = answerInArray[0];

  if (isASingleDigit) {
    ansFinish[ansFinish.length - 1] /= 10;
  }
  if (isBSingleDigit) {
    ansFinish[ansFinish.length - 1] /= 10;
  }
  return ansFinish.join("");
}
