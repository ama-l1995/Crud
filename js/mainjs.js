var productname = document.getElementById("productname");
var productprice = document.getElementById("productprice");
var productcategory = document.getElementById("productcategory");
var productdescription = document.getElementById("productdescription");
var productSearch = document.getElementById("Search");
var AddButton = document.getElementById("btnAdd");
var UpdateButton = document.getElementById("btnUpdate");
var indexUpdate = 0;
var productList = [];

// Local Storage
if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  display();
}

function Add() {
  if (
    chekNameValidate() &&
    chekPriceValidate() &&
    chekCatValidate() &&
    chekDescValidate()
  ) {
    var product = {
      name: productname.value,
      price: productprice.value,
      category: productcategory.value,
      desc: productdescription.value,
    };
    productList.push(product);
    localStorage.setItem("products", JSON.stringify(productList));
    clear();
    display();
    console.log(productList);
  }
}

function clear() {
  productname.value = "";
  productprice.value = "";
  productcategory.value = "";
  productdescription.value = "";
}

function display() {
  var dis = "";
  for (let i = 0; i < productList.length; i++) {
    dis += `
        <tr>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td> ${productList[i].desc} </td>
            <td>
                <button class="btn btn-outline-dark p-1 m-2" onclick="setData(${i})">Update</button>
                <button class="btn btn-outline-danger p-1 m-2" onclick="Delete(${i})">Delete</button>
            </td>
        </tr>
        `;
  }
  document.getElementById("tableBody").innerHTML = dis;
}

function Delete(indexD) {
  productList.splice(indexD, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  display();
}

function SearchP() {
  var sInput = Search.value;
  var dis = "";
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(sInput.toLowerCase())) {
      dis += `
        <tr>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td> ${productList[i].desc} </td>
            <td>
                <button class="btn btn-outline-dark p-1 m-2">Update</button>
                <button class="btn btn-outline-danger p-1 m-2" onclick="Delete(${i})">Delete</button>
            </td>
        </tr>
        `;
    }
  }
  document.getElementById("tableBody").innerHTML = dis;
}

function setData(indexS) {
  indexUpdate = indexS;
  var currentData = productList[indexS];

  productname.value = currentData.name;
  productprice.value = currentData.price;
  productcategory.value = currentData.category;
  productdescription.value = currentData.desc;

  UpdateButton.classList.remove("d-none");
  AddButton.classList.add("d-none");
}

function Update() {
  var product = {
    name: productname.value,
    price: productprice.value,
    category: productcategory.value,
    desc: productdescription.value,
  };
  productList.splice(indexUpdate, 1, product);
  localStorage.setItem("products", JSON.stringify(productList));
  display();
  AddButton.classList.remove("d-none");
  UpdateButton.classList.add("d-none");
  clear();
}

function chekNameValidate() {
  var regexName = /^[A-Z][a-z]{1,10}$/;
  var invalidMess = document.getElementById("invalidMess");
  regexName.test(productname.value);
  if (regexName.test(productname.value)) {
    productname.classList.add("is-valid");
    productname.classList.remove("is-invalid");
    invalidMess.classList.add("d-none");
    return true;
  } else {
    productname.classList.add("is-invalid");
    productname.classList.remove("is-valid");
    invalidMess.classList.remove("d-none");
    return false;
  }
}

function chekPriceValidate() {
  var regexprice = /^[0-9]{1,6}$/;
  var invalidMessP = document.getElementById("invalidMessP");
  regexprice.test(productprice.value);
  if (regexprice.test(productprice.value)) {
    productprice.classList.add("is-valid");
    productprice.classList.remove("is-invalid");
    invalidMessP.classList.add("d-none");
    return true;
  } else {
    productprice.classList.add("is-invalid");
    productprice.classList.remove("is-valid");
    invalidMessP.classList.remove("d-none");
    return false;
  }
}

function chekCatValidate() {
  var regexcat = /^[A-z]{1,10}$/;
  var invalidMessC = document.getElementById("invalidMessC");
  regexcat.test(productcategory.value);
  if (regexcat.test(productcategory.value)) {
    productcategory.classList.add("is-valid");
    productcategory.classList.remove("is-invalid");
    invalidMessC.classList.add("d-none");
    return true;
  } else {
    productcategory.classList.add("is-invalid");
    productcategory.classList.remove("is-valid");
    invalidMessC.classList.remove("d-none");
    return false;
  }
}

function chekDescValidate() {
  var regexdesc = /^[A-z]{1,100}$/;
  var invalidMessC = document.getElementById("invalidMessD");
  regexdesc.test(productdescription.value);
  if (regexdesc.test(productdescription.value)) {
    productdescription.classList.add("is-valid");
    productdescription.classList.remove("is-invalid");
    invalidMessC.classList.add("d-none");
    return true;
  } else {
    productdescription.classList.add("is-invalid");
    productdescription.classList.remove("is-valid");
    invalidMessC.classList.remove("d-none");
    return false;
  }
}
