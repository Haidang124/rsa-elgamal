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
    " </p>" +
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
    "</p>";
  if (gcdNumber === 1) {
    let d = bigInt(e).modInv(m).toString();
    let y = bigInt(x).modPow(e, n).toString();

    div.innerHTML +=
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
      '<h3 class="mt-4 bg-blue">Bước 3: Giải mã </h3>' +
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
  document.body.appendChild(div);
}
function clearHtml() {
  var div = document.getElementById("content");
  div.innerHTML = "";
  document.body.appendChild(div);
}
function autoFill() {
  document.getElementById("x").value = "100";
  document.getElementById("p").value = "467";
  document.getElementById("a").value = "127";
  document.getElementById("k").value = "213";
  document.getElementById("alpha").value = "2";
}
function autoFillRSAKy() {
  // người gửi
  document.getElementById("x").value = "329388408480452098029244238914";
  document.getElementById("p").value = "1000000000100011";
  document.getElementById("q").value = "1003229774283941";
  document.getElementById("e").value = "1011001110001111";
  // document.getElementById("d").value = "404653665047481961792370813791";

  // nguoi nhận
  document.getElementById("p2").value = "1084051191974761";
  document.getElementById("q2").value = "1086868110868699";
  document.getElementById("e2").value = "1090109110921093";
  // document.getElementById("d2").value = "417134806240342743859626393517";
}
function autoFillRSA() {
  document.getElementById("x").value =
    "94356856797927405413112916763460265385115895023103378794867871355717678480411";
  document.getElementById("p").value =
    "113155440615496490616046354979581213329253689268589410710826260375598532465069";
  document.getElementById("q").value =
    "88221239568066042195935336893571804851359549237360125818309417741903720740119";
  document.getElementById("e").value = "1011001110001111";
}
function showKy(string) {
  var div = document.getElementById("content");
  div.innerHTML = "";
  if (document.getElementsByClassName(string)[0].style.display === "none") {
    document.getElementsByClassName(string)[0].style.display = "block";
  } else {
    document.getElementsByClassName(string)[0].style.display = "none";
  }
}
function elgamalKy() {
  // ngươi ký và gửi tin
  var div = document.getElementById("content");
  let x = bigInt(document.getElementById("x").value).toString();
  let p = bigInt(document.getElementById("p").value).toString();
  let a = bigInt(document.getElementById("a").value).toString();
  let k = bigInt(document.getElementById("k").value).toString();
  let alpha = bigInt(document.getElementById("alpha").value).toString();
  // console.log();
  let beta = bigInt(alpha).modPow(a, p).toString();
  let y1 = bigInt(alpha).modPow(k, p).toString();
  let y2 = (x * bigInt(beta).modPow(k, p)) % p;

  // nguuoi nhan
  let p2 = bigInt(document.getElementById("p2").value).toString();
  let a2 = bigInt(document.getElementById("a2").value).toString();
  let k2 = bigInt(document.getElementById("k2").value).toString();
  let alpha2 = bigInt(document.getElementById("alpha2").value).toString();
  let beta2 = bigInt(alpha2).modPow(a2, p2).toString();
  div.innerHTML = "";
  div.innerHTML =
    '<p class="mt-2 mb-2">Tóm tắt chữ ký số Elgamal :' +
    '<p class="mt-2 mb-2">Người gửi' +
    '<p class="mb-2"><b>Bản rõ x = </b>' +
    x +
    " </p>" +
    '<p class="mb-2"><b>p1 = </b>' +
    p +
    " </p>" +
    '<p class="mb-2"><b>a1 = </b>' +
    a +
    " </p>" +
    '<p class="mb-2"><b>k1 = </b>' +
    k +
    " </p>" +
    '<p class="mb-2"><b>P1 là số nguyên tố: = </b> <span class="bg-red">' +
    bigInt(p).isPrime() +
    '<p class="mt-2 mb-2">Người nhận' +
    '<p class="mb-2"><b>p2 = </b>' +
    p2 +
    " </p>" +
    '<p class="mb-2"><b>a2 = </b>' +
    a2 +
    " </p>" +
    '<p class="mb-2"><b>k2 = </b>' +
    k2 +
    " </p>" +
    '<p class="mb-2"><b>P2 là số nguyên tố: = </b> <span class="bg-red">' +
    bigInt(p2).isPrime() +
    "</span> </p>";

  let gcdKP = bigInt
    .gcd(k, bigInt(p).add(-1).toString(), bigInt(p).toString())
    .toString();
  // if (gcdKP != 1) {
  //   div.innerHTML +=
  //     '<span class="mt-4 bg-red">Không thỏa mãn tính khả nghịch: gcd(k, p - 1) =' +
  //     gcdKP +
  //     " </span>";
  //   return;
  // }
  if (bigInt(p).isPrime() && bigInt(p2).isPrime()) {
    // Bước 1
    div.innerHTML +=
      '<h3 class="mt-4 bg-blue">Bước 1: Tính khóa công khai beta của cả 2 người</h3>' +
      '<p class="mb-2"><b>Khóa công khai beta1  = alpha1 ^ a1 mod p1 =</b> ' +
      alpha +
      " ^ " +
      a +
      " mod " +
      p +
      " = " +
      beta +
      " " +
      '<p class="mb-2"><b>Khóa công khai beta2 = alpha2 ^ a2 mod p2 =</b> ' +
      alpha2 +
      " ^ " +
      a2 +
      " mod " +
      p2 +
      " = " +
      beta2 +
      " ";
    // Bước 2
    let yk1 = bigInt(alpha2).modPow(k, p2).toString();
    let temp = bigInt(beta2).modPow(k, p2).toString();

    let yk2 = bigInt(multiply(x.toString(), temp.toString()))
      .divmod(p2)
      .remainder.toString();
    let s1 = bigInt(alpha).modPow(k2, p).toString();
    let inverse = bigInt(k2.toString())
      .modInv(bigInt(p.toString()).add(-1).toString())
      .toString();
    console.log(
      bigInt("324537418537241")
        .add(-multiply("1000000007", "15410162500737992236"))
        .toString()
    );
    // let minus = bigInt(x - multiply(a1, s1)).toString() multiply()
    div.innerHTML +=
      '<h3 class="mt-4 bg-blue">Bước 2: Mã hóa x và chữ ký </h3>' +
      '<p class="mb-2"><b>+Bản mã: Ek(x,k1) = (y1,y2)=(alpha2^k1, x.beta2^k1 )mod p2 = </b> ( ' +
      yk1 +
      " , " +
      yk2 +
      " ) " +
      '<p class="mb-2"><b>+ Mã hóa chữ ký s1 = alpha1 ^ k2 mod p1 = </b> ' +
      alpha +
      " ^ " +
      k2 +
      " mod " +
      p +
      " = " +
      s1 +
      " " +
      '<p class="mb-2"><b>Tính s2 = (x-a1*s1)*k2^-1  mod (p1-1) = </b>' +
      '<p class="mb-2"><b>Khóa công khai (p,alpha,beta) = </b> (' +
      p +
      " , " +
      alpha +
      " , " +
      beta +
      ") </p>" +
      "</p>" +
      '<p class="mb-2"><b>Khóa bí mật a = </b> ' +
      a +
      " </p>" +
      '<p class="mb-2"><b>Bản mã được gửi đi: (y1, y2) = </b>(' +
      y1 +
      "," +
      y2 +
      ")";
    // Bước 3
    let mu = bigInt(p).add(-a).add(-1);
    let value = bigInt(y1).modPow(mu, p).toString();

    div.innerHTML +=
      '<h3 class="mt-4 bg-blue">Bước 3: Giải mã </h3>' +
      '<p class="mb-2"><b>Tính x theo công thức: x = y2(y1 ^ a) ^ -1 mod p</b> ' +
      '<p class="mb-2"><b>Tính số nghịch đảo:(y1 ^ a) ^ -1 mod p = </b>y1 ^ (p -a -1) mod p = ' +
      value +
      '<p class="mb-2"><b>Giải mã: x = ' +
      y2 +
      " * " +
      value +
      " mod " +
      p +
      " = " +
      bigInt(multiply(y2.toString(), value.toString()))
        .divmod(p)
        .remainder.toString() +
      "</b> ";
  }
  document.body.appendChild(div);
}
function elgamalKy1() {
  var div = document.getElementById("content");
  div.innerHTML = "";
  let x = bigInt(document.getElementById("x").value).toString();
  let p = bigInt(document.getElementById("p").value).toString();
  let a = bigInt(document.getElementById("a").value).toString();
  let k = bigInt(document.getElementById("k").value).toString();
  let alpha = bigInt(document.getElementById("alpha").value).toString();
  let beta = bigInt(alpha).modPow(a, p).toString();
  if (bigInt(p).isPrime()) {
    // Bước 1
    div.innerHTML +=
      '<h3 class="mt-4 bg-blue">Bước 1: Tính khóa công khai beta </h3>' +
      '<p class="mb-2"><b>Khóa công khai beta  = alpha ^ a mod p =</b> ' +
      alpha +
      " ^ " +
      a +
      " mod " +
      p +
      " = " +
      beta +
      " ";
    // Bước 2
    let s1 = bigInt(alpha).modPow(k, p).toString();
    let s0 = bigInt(k.toString())
      .modInv(bigInt(p.toString()).add(-1).toString())
      .toString();
    let temp = bigInt(x.toString()).add(-multiply(a.toString(), s1.toString()));

    let temp1 = bigInt(
      multiply(
        handleMod(bigInt(temp), bigInt(p.toString()).add(-1)),
        handleMod(bigInt(s0), bigInt(p.toString()).add(-1))
      )
    );
    let s2 = handleMod(temp1, bigInt(p.toString()).add(-1));

    // let minus = bigInt(x - multiply(a1, s1)).toString() multiply()
    div.innerHTML +=
      '<h3 class="mt-4 bg-blue">Bước 2: Ký trên văn bản x = ' +
      x +
      " </h3>" +
      '<p class="mb-2"><b>+Ta có: s0= k ^-1 mod (p-1 ) = ' +
      k +
      " ^ -1 mod " +
      bigInt(p).add(-1).toString() +
      "= </b> " +
      s0 +
      '<p class="mb-2"><b>+ Mã hóa chữ ký s1 = alpha ^ k mod p = </b> ' +
      alpha +
      " ^ " +
      k +
      " mod " +
      p +
      " = " +
      s1 +
      " " +
      '<p class="mb-2"><b>Tính s2 = (x-a*s1)*s0  mod (p-1) = </b>' +
      s2 +
      " " +
      '<p class="mb-2"><b>Khóa công khai (s1,s2) = </b> (' +
      s1 +
      " , " +
      s2 +
      ") </p>" +
      "</p>";
    // Bước 3
    let temp2 = bigInt(
      multiply(bigInt(beta).modPow(s1, p), bigInt(s1).modPow(s2, p))
    ).modPow(1, p);
    div.innerHTML +=
      '<h3 class="mt-4 bg-blue">Bước 3: Xác minh chữ ký </h3>' +
      '<p class="mb-2"><b>+Ta có:  beta ^ s1 *s1^s2 = ' +
      beta +
      " ^ " +
      s1 +
      "*" +
      s1 +
      "^" +
      s2 +
      "= " +
      temp2 +
      '<p class="mb-2"><b>+ Alpha ^ x = </b> ' +
      alpha +
      " ^ " +
      x +
      " = " +
      bigInt(alpha).modPow(x, p);
    if (bigInt(alpha).modPow(x, p).toString() == temp2.toString()) {
      div.innerHTML +=
        '<h3 class="mt-4 bg-blue">Bước 4: Kết Luận </h3>' +
        '<p class="mt-4">Do 2 giá trị bằng nhau nên => <span class="bg-red">chữ ký Đúng</span></p>';
    } else {
      div.innerHTML +=
        '<p class="mt-4">Do 2 giá trị khác nhau nên => <span class="bg-red">chữ ký Sai</span></p>';
    }
  }
  document.body.appendChild(div);
}

function elgamal() {
  var div = document.getElementById("content");
  let x = bigInt(document.getElementById("x").value).toString();
  let p = bigInt(document.getElementById("p").value).toString();
  let a = bigInt(document.getElementById("a").value).toString();
  let k = bigInt(document.getElementById("k").value).toString();
  let alpha = bigInt(document.getElementById("alpha").value).toString();
  let beta = bigInt(alpha).modPow(a, p).toString();
  let y1 = bigInt(alpha).modPow(k, p).toString();
  let y2 = (x * bigInt(beta).modPow(k, p)) % p;
  div.innerHTML = "";
  div.innerHTML =
    '<p class="mb-2">Tóm tắt Elgamal :' +
    '<p class="mb-2"><b>Bản rõ x = </b>' +
    x +
    " </p>" +
    '<p class="mb-2"><b>p = </b>' +
    p +
    " </p>" +
    '<p class="mb-2"><b>a = </b>' +
    a +
    " </p>" +
    '<p class="mb-2"><b>k = </b>' +
    k +
    " </p>" +
    '<p class="mb-2"><b>P là số nguyên tố: = </b> <span class="bg-red">' +
    bigInt(p).isPrime() +
    "</span> </p>";

  let gcdKP = bigInt
    .gcd(k, bigInt(p).add(-1).toString(), bigInt(p).toString())
    .toString();
  if (gcdKP != 1) {
    div.innerHTML +=
      '<span class="mt-4 bg-red">Không thỏa mãn tính khả nghịch: gcd(k, p - 1) =' +
      gcdKP +
      " </span>";
    return;
  }
  if (bigInt(p).isPrime()) {
    // Bước 1
    div.innerHTML +=
      '<h3 class="mt-4 bg-blue">Bước 1: Tính khóa công khai beta </h3>' +
      '<p class="mb-2"><b>Khóa công khai beta = alpha ^ a mod p =</b> ' +
      alpha +
      " ^ " +
      a +
      " mod " +
      p +
      " = " +
      beta +
      " ";
    // Bước 2
    div.innerHTML +=
      '<h3 class="mt-4 bg-blue">Bước 2: Mã hóa x = ' +
      x +
      ". Khóa đã chọn k = " +
      k +
      " </h3>" +
      '<p class="mb-2"><b>K đã chọn: k = </b>' +
      k +
      " " +
      '<p class="mb-2"><b>Tính y1 = alpha ^ k mod p = </b> ' +
      alpha +
      " ^ " +
      k +
      " mod " +
      p +
      " = " +
      y1 +
      " " +
      '<p class="mb-2"><b>Tính y2 = x * (beta ^ k) mod p = </b>' +
      x +
      "* (" +
      beta +
      " ^ " +
      k +
      ") mod " +
      p +
      " = " +
      y2 +
      " " +
      '<p class="mb-2"><b>Khóa công khai (p,alpha,beta) = </b> (' +
      p +
      " , " +
      alpha +
      " , " +
      beta +
      ") </p>" +
      "</p>" +
      '<p class="mb-2"><b>Khóa bí mật a = </b> ' +
      a +
      " </p>" +
      '<p class="mb-2"><b>Bản mã được gửi đi: (y1, y2) = </b>(' +
      y1 +
      "," +
      y2 +
      ")";
    // Bước 3
    let mu = bigInt(p).add(-a).add(-1);
    let value = bigInt(y1).modPow(mu, p).toString();
    div.innerHTML +=
      '<h3 class="mt-4 bg-blue">Bước 3: Giải mã </h3>' +
      '<p class="mb-2"><b>Tính x theo công thức: x = y2(y1 ^ a) ^ -1 mod p</b> ' +
      '<p class="mb-2"><b>Tính số nghịch đảo:(y1 ^ a) ^ -1 mod p = </b>y1 ^ (p -a -1) mod p = ' +
      value +
      '<p class="mb-2"><b>Giải mã: x = ' +
      y2 +
      " * " +
      value +
      " mod " +
      p +
      " = " +
      bigInt(multiply(y2.toString(), value.toString()))
        .divmod(p)
        .remainder.toString() +
      "</b> ";
  }
  document.body.appendChild(div);
}
function rsaKyFunction() {
  var div = document.getElementById("content");
  let x = bigInt(document.getElementById("x").value).toString();
  let q = bigInt(document.getElementById("q").value).toString();
  let p = bigInt(document.getElementById("p").value).toString();
  let e = bigInt(document.getElementById("e").value).toString();
  let n = bigInt(bigInt(p).toString())
    .multiply(bigInt(q).toString())
    .toString();

  let m = bigInt(bigInt(p).add(-1).toString())
    .multiply(bigInt(q).add(-1).toString())
    .toString();
  let d = bigInt(e).modInv(m).toString();
  // nguuoi nhan
  let q2 = bigInt(document.getElementById("q2").value).toString();
  let p2 = bigInt(document.getElementById("p2").value).toString();
  let e2 = bigInt(document.getElementById("e2").value).toString();
  let n2 = bigInt(bigInt(p2).toString())
    .multiply(bigInt(q2).toString())
    .toString();
  let m2 = bigInt(bigInt(p2).add(-1).toString())
    .multiply(bigInt(q2).add(-1).toString())
    .toString();
  let d2 = bigInt(e2).modInv(m2).toString();

  div.innerHTML = "";
  div.innerHTML +=
    '<p class="mt-2 mb-2">Tóm tắt chữ ký số RSA :' +
    '<p class="mt-2 mb-2">Người gửi' +
    '<p class="mb-2"><b>Bản rõ x = </b>' +
    x +
    " </p>" +
    '<p class="mb-2"><b>p1 = </b>' +
    p +
    " </p>" +
    '<p class="mb-2"><b>q1 = </b>' +
    q +
    " </p>" +
    '<p class="mb-2"><b>e1 = </b>' +
    e +
    " </p>" +
    '<p class="mb-2"><b>n1 =</b> p * q = ' +
    p +
    " * " +
    q +
    " = " +
    n +
    "</p>" +
    '<p class="mb-2"><b>m1 =</b> phi(n1) = (p1 - 1)(q1 - 1) = ' +
    bigInt(p).add(-1).toString() +
    " * " +
    bigInt(q).add(-1).toString() +
    " = " +
    m +
    "</p>";

  // người nhận
  div.innerHTML +=
    '<p class="mt-2 mb-2">Người nhận' +
    '<p class="mb-2"><b>p2 = </b>' +
    p2 +
    " </p>" +
    '<p class="mb-2"><b>q2 = </b>' +
    q2 +
    " </p>" +
    '<p class="mb-2"><b>e2 = </b>' +
    e2 +
    " </p>" +
    '<p class="mb-2"><b>n2 =</b> p2 * q2 = ' +
    p2 +
    " * " +
    q2 +
    " = " +
    n2 +
    "</p>" +
    '<p class="mb-2"><b>m2 =</b> phi(n2) = (p2 - 1)(q2 - 1) = ' +
    bigInt(p2).add(-1).toString() +
    " * " +
    bigInt(q2).add(-1).toString() +
    " = " +
    m2 +
    "</p>";
  // Bước 1
  let sigx = bigInt(x).modPow(e, n).toString();
  let ex = bigInt(x).modPow(e2, n2).toString();
  let Esigx = bigInt(sigx).modPow(e2, n2).toString();
  div.innerHTML +=
    '<h3 class="mt-4 bg-blue">Bước 1: Tìm khóa bí mật của 2 người </h3>' +
    '<p class="mb-2"><b>+ d1 = e1^-1 mod m2 =</b> ' +
    d +
    '<p class="mb-2"><b>+ d2 = e2^-1 mod m2 =</b> ' +
    d2;
  // bước 2
  div.innerHTML +=
    '<h3 class="mt-4 bg-blue">Bước 2: Mã hóa bản tin và ký </h3>' +
    '<p class="mb-2"><b>+ Chữ ký: sig(x) = x^e1 mod n1 =</b> ' +
    x +
    " ^ " +
    e +
    " mod " +
    n +
    " = " +
    sigx +
    '<p class="mb-2"><b>+ Mã hóa (h(x), sig(x))' +
    '<p class="mb-2"><b>+ E(x) = x^e2 mod n2 =</b>' +
    x +
    " ^ " +
    e2 +
    " mod " +
    n2 +
    " = " +
    ex +
    '<p class="mb-2"><b>+ E(sig(x)) = sig(x)^e2 mod n2 =</b>' +
    sigx +
    " ^ " +
    e2 +
    " mod " +
    n2 +
    " = " +
    Esigx +
    '<p class="mb-2"><b>+ Tập tin sau khi được ký và mã hóa (E(x), E(sig(x))) = </b> (' +
    ex +
    " , " +
    Esigx +
    " )";
  // Bước 3
  div.innerHTML +=
    '<h3 class="mt-4 bg-blue">Bước 3: Giải mã bản tin và xác nhận chữ ký </h3>' +
    '<p class="mb-2"><b>+ Giải mã bản tin: x = E(x)^d2 mod n2 =</b> ' +
    ex +
    " ^ " +
    d2 +
    " mod " +
    n2 +
    " = " +
    bigInt(ex).modPow(d2, n2).toString() +
    '<p class="mb-2"><b>+ Xác minh chữ ký: sig(x)^d1 mod n1 =</b> ' +
    sigx +
    " ^ " +
    d +
    " mod " +
    n +
    " = " +
    bigInt(sigx).modPow(d, n).toString();
  // Bước 4
  div.innerHTML += '<h3 class="mt-4 bg-blue">Bước 4: Kết Luận </h3>';
  if (
    bigInt(sigx).modPow(d, n).toString() == bigInt(ex).modPow(d2, n2).toString()
  ) {
    div.innerHTML +=
      '<p class="mt-4">Do 2 giá trị bằng nhau nên => <span class="bg-red">chữ ký Đúng</span></p>';
  } else {
    div.innerHTML +=
      '<p class="mt-4">Do 2 giá trị khác nhau nên => <span class="bg-red">chữ ký Sai</span></p>';
  }
  document.body.appendChild(div);
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
function handleMod(a, n) {
  return a - n * Math.floor(a / n);
}
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

function birthPoint() {
  if (
    (document.getElementsByClassName("calculate")[0].style.display = "block")
  ) {
    showKy("calculate");
  }
  let a = document.getElementById("a").value;
  let b = document.getElementById("b").value;
  let r = document.getElementById("r").value;
  var div = document.getElementById("content");
  div.innerHTML = "";
  if (bigInt(r).isPrime()) {
    let curvePoint = curve(a, b, r);
    let arrPoint = curve(a, b, r).getPoints();
    div.innerHTML +=
      '<p class="mb-2"> Điểm sinh trên đường elliptic là điểm : ';
    let isbirthPoint = false;

    for (let index = 1; index < arrPoint.length; index++) {
      let point = curvePoint.getPoint(arrPoint[index].x, arrPoint[index].y);
      if (point.generate().length === arrPoint.length) {
        isbirthPoint = true;
        div.innerHTML +=
          "<span>( " +
          arrPoint[index].x +
          " , " +
          arrPoint[index].y +
          " )</span></p>";
        return;
      }
    }
    if (!isbirthPoint) {
      div.innerHTML += "<span> ∞ </span>";
    }
  } else {
    div.innerHTML += '<p class="mb-2"> r = ' + r + " không phải số nguyên tố  ";
  }
}
function calculate() {
  let r = document.getElementById("r").value;
  var div = document.getElementById("content");
  div.innerHTML = "";
  if (bigInt(r).isPrime()) {
    showKy("calculate");
  } else {
    document.getElementsByClassName("calculate")[0].style.display = "none";
    div.innerHTML += '<p class="mb-2"> r = ' + r + " không phải số nguyên tố  ";
  }
}
function plus() {
  let xp = document.getElementById("xp").value;
  let yp = document.getElementById("yp").value;
  let xq = document.getElementById("xq").value;
  let yq = document.getElementById("yq").value;
  let a = document.getElementById("a").value;
  let b = document.getElementById("b").value;
  let r = document.getElementById("r").value;
  var div = document.getElementById("content");
  div.innerHTML = "";
  let curvePoint = curve(a, b, r);
  let P = curvePoint.getPoint(parseInt(xp), parseInt(yp));
  let Q = curvePoint.getPoint(parseInt(xq), parseInt(yq));
  if (typeof P === "undefined") {
    div.innerHTML +=
      '<p class="mt-2 bg-red"> điểm P không thuộc đường cong elliptic';
    return;
  }
  if (typeof Q === "undefined") {
    div.innerHTML +=
      '<p class="mt-2 bg-red"> điểm Q không thuộc đường cong elliptic';
    return;
  }
  let result = P.plus(Q);
  document.getElementById("xresult").value = result.x;
  document.getElementById("yresult").value = result.y;
}
function tool(type) {
  if (type === "0") {
    let a = document.getElementById("a").value;
    let b = document.getElementById("b").value;
    let m = document.getElementById("m").value;
    document.getElementById("result").value = bigInt(a).modPow(b, m).toString();
  } else {
    let a = document.getElementById("a1").value;
    let m = document.getElementById("m1").value;
    document.getElementById("result1").value = bigInt(a).modInv(m).toString();
  }
}
function multiplyPoint() {
  let xp = document.getElementById("xp").value;
  let yp = document.getElementById("yp").value;
  let n = document.getElementById("n").value;
  let a = document.getElementById("a").value;
  let b = document.getElementById("b").value;
  let r = document.getElementById("r").value;
  var div = document.getElementById("content");
  div.innerHTML = "";
  let curvePoint = curve(a, b, r);
  let P = curvePoint.getPoint(parseInt(xp), parseInt(yp));
  if (typeof P === "undefined") {
    div.innerHTML +=
      '<p class="mt-2 bg-red"> điểm P không thuộc đường cong elliptic';
    return;
  }
  let generate = P.generate();
  let result = generate[(n % generate.length) - 1];
  document.getElementById("xresult").value = n !== '0' ? result.x : '0';
  document.getElementById("yresult").value = n !== '0' ? result.y : '0';
}
function getPoints() {
  if (
    (document.getElementsByClassName("calculate")[0].style.display = "block")
  ) {
    showKy("calculate");
  }
  let a = document.getElementById("a").value;
  let b = document.getElementById("b").value;
  let r = document.getElementById("r").value;
  var div = document.getElementById("content");
  div.innerHTML = "";
  if (bigInt(r).isPrime()) {
    let arrPoint = curve(a, b, r).getPoints();
    div.innerHTML +=
      '<p class="mb-2"> Các điểm trên đường cong elliptic là: Có ' +
      arrPoint.length +
      " điểm";
    for (let index = 1; index < arrPoint.length; index++) {
      div.innerHTML +=
        '<span class="mb-2"><b>(</b>' +
        arrPoint[index].x +
        " , " +
        arrPoint[index].y +
        "<b>) ; </b>";
    }
    div.innerHTML += '<span class="mb-2"><b> ∞ </b>';
  } else {
    div.innerHTML += '<p class="mb-2"> r = ' + r + " không phải số nguyên tố  ";
  }
}
// elliptic
function curve(a, b, r) {
  "use strict";

  a = parseInt(a, 10);
  b = parseInt(b, 10);
  r = parseInt(r, 10);

  var _a = a,
    _b = b,
    _r = r;

  var i, j;

  var sqrt = [],
    inv = [],
    points = [],
    addTable;

  // helper functions
  var mod = function (x, r) {
    return ((x % r) + r) % r;
  };
  var isPrime = function (n) {
    var d;
    // no need to implement advanced algorithms
    // for toy instances
    if (mod(n, 2) === 0) {
      return false;
    }
    for (d = 3; d * d < n; d = d + 2) {
      if (mod(n, d) === 0) {
        return false;
      }
    }
    return true;
  };

  // a Point class
  var Point = function (x, y) {
    var stringRegExp = /\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)\s*/;
    this.x = x;
    this.y = y;
    var _stringRep;

    if (typeof x === "string") {
      if (stringRegExp.test(x)) {
        var _sres = stringRegExp.exec(x);
        this.x = parseInt(_sres[1], 10);
        this.y = parseInt(_sres[2], 10);
      }
    }

    if (typeof x === "object" && "x" in x && "y" in x) {
      this.x = x.x;
      this.y = x.y;
    }

    if (typeof this.x !== "number") {
      this.x = -1;
      this.y = -1;
    }
    if (typeof this.y !== "number") {
      this.x = -1;
      this.y = -1;
    }
  };

  Point.prototype.isInfty = function () {
    return this.x == -1 && this.y == -1;
  };

  Point.prototype.isNaN = function () {
    return isNaN(this.x) || isNaN(this.y);
  };

  Point.prototype.toString = function () {
    if (!this._stringRep) {
      this._stringRep =
        this.x == -1 && this.y == -1
          ? "&infin;"
          : "(" + this.x + "," + this.y + ")";
    }
    return this._stringRep;
  };

  Point.prototype.eq = function (p) {
    return this.x == p.x && this.y == p.y;
  };

  Point.prototype.plus = function (p) {
    if (this.isInfty()) return p;
    if (p.isInfty()) return this;

    var s;
    if (this.x === p.x) {
      if (this.y !== p.y || this.y === 0) {
        return new Point(-1, -1);
      }
      // self addition
      s = mod((3 * this.x * this.x + _a) * inv[mod(2 * this.y, _r)], _r);
    } else {
      s = mod((p.y - this.y) * inv[mod(p.x - this.x, _r)], _r);
    }

    var rx = mod(s * s - p.x - this.x, _r),
      ry = mod(s * this.x - s * rx - this.y, _r);

    return new Point(rx, ry);
  };

  Point.prototype.times = function (t) {
    if (t === 1) {
      return this;
    } else if (t > 1) {
      return this.plus(this.times(t - 1));
    } else if (t === 0) {
      return new Point();
    }
    // t < 0: not implemented
  };

  // what a wonderful application for ES6 generators ;-)
  // however, let's stick with old browsers
  Point.prototype.generate = function () {
    var next = this,
      res = [];
    do {
      res.push(next);
      next = next.plus(this);
    } while (!next.isNaN() && !next.eq(this));

    return !next.isNaN() ? res : undefined;
  };

  // initialize helper arrays: sqrt and inv
  for (i = 0; i < r; i++) {
    sqrt[i] = -1;
  }

  for (i = 0; i < r; i++) {
    if (i <= r / 2) {
      sqrt[(i * i) % r] = i;
    }
    for (j = i; j < r; j++) {
      if ((i * j) % r === 1) {
        inv[i] = j;
        inv[j] = i;
        break;
      }
    }
  }

  // compute list of points on this curve
  // note: r might not be prime
  // first add infinity
  points.push(new Point());
  for (i = 0; i < r; i++) {
    for (j = 0; j <= r / 2; j++) {
      if ((j * j) % r === mod(i * i * i + a * i + b, r)) {
        points.push(new Point(i, j));
        if (j % r !== (r - j) % r) {
          points.push(new Point(i, r - j));
        }
      }
    }
  }

  // build interface
  return {
    getA: function () {
      return _a;
    },
    getB: function () {
      return _b;
    },
    getR: function () {
      return _r;
    },

    getPoints: function () {
      return points.slice();
    },

    getPoint: function (arg1, arg2) {
      // delegate argument type checks to Point constructor
      var search = new Point(arg1, arg2);
      for (i = 0; i < points.length; i++) {
        if (search.eq(points[i])) {
          return search;
        }
      }
      return undefined;
    },

    getAdditionTable: function () {
      if (!addTable) {
        var i, j;

        addTable = [];
        for (i = 0; i < points.length; i++) {
          addTable[i] = [];
        }

        for (i = 0; i < points.length; i++) {
          for (j = i; j < points.length; j++) {
            addTable[i][j] = points[i].plus(points[j]);
            addTable[j][i] = addTable[i][j];
          }
        }
      }
      return addTable;
    },

    rIsPrime: function () {
      return isPrime(_r);
    },

    isNonSingular: function () {
      if (_r > 3) {
        return mod(4 * _a * _a * _a + 27 * _b * _b, _r) !== 0;
      }
    },
  };
}
