//Variable
const products = [
  {
    id: 1,
    name: "Domain Sale",
    price: 15,
  },
  {
    id: 2,
    name: "Graphic Design",
    price: 100,
  },
  {
    id: 3,
    name: "Web Design",
    price: 200,
  },
  {
    id: 4,
    name: "Web Development",
    price: 500,
  },
  {
    id: 5,
    name: "Application Development",
    price: 1000,
  },
];

//Selectors
const app = document.querySelector("#app");
const recordForm = app.querySelector("#recordForm");
const productSelect = app.querySelector("#productSelect");
const quantityInput = app.querySelector("#quantityInput");
const recordBtn = app.querySelector("#recordBtn");
const records = app.querySelector("#records");
const costTotal = app.querySelector("#costTotal");

//Functions
// const createFormOption = (product) => {
//   const option = document.createElement("option");
//   option.value = product.price;
//   option.innerText = product.name;
//   return option;
// };
const addNewRecord = (product, quantity) => {
  records.append(createRecordRow(product, quantity));
};

const updateExistedRecord = (product, quantity) => {
  const row = app.querySelector(`[product-id='${product.id}']`);
  const currentQuantity = row.querySelector(".quantity-row");
  const currentCost = row.querySelector(".cost-row");
  if (quantity < 0) {
    if (currentQuantity.innerText > 1) {
      currentQuantity.innerText =
        parseFloat(currentQuantity.innerText) + parseFloat(quantity);
      currentCost.innerText = currentQuantity.innerText * product.price;
    }
  } else {
    currentQuantity.innerText =
      parseFloat(currentQuantity.innerText) + parseFloat(quantity);
    currentCost.innerText = currentQuantity.innerText * product.price;
  }
  sumCostTotal();
};

const createRecordRow = (product, quantity) => {
  const tr = document.createElement("tr");
  tr.classList.add("record-row");
  tr.setAttribute("product-id", product.id);
  const cost = product.price * quantity;
  tr.innerHTML = `
  <td class="counter"></td>
  <td>${product.name}</td>
  <td class="text-end">${product.price}</td>
  <td class="text-end quantity-btn-control">
  <button class="btn btn-sm quantity-minus-btn"><i class="bi bi-dash"></i></button>
  <span class="quantity-row">${quantity}</span>
  <button class="btn btn-sm quantity-plus-btn"><i class="bi bi-plus"></i></button>
  </td>
  <td class="text-end">
  <span class="cost-row">${cost}</span>
  <span><button class="btn btn-primary del-btn"><i class="bi bi-trash3"></i></button></span>
  </td>
  `;

  const delRow = () => {
    if (confirm("Are you sure to delete?")) {
      tr.remove();
      sumCostTotal();
    }
  };
  const delBtn = tr.querySelector(".del-btn");
  delBtn.addEventListener("click", () => {
    delRow();
  });

  const quantityPlusBtn = tr.querySelector(".quantity-plus-btn");
  quantityPlusBtn.addEventListener("click", () => {
    updateExistedRecord(product, 1);
  });

  const quantityMinusBtn = tr.querySelector(".quantity-minus-btn");
  quantityMinusBtn.addEventListener("click", () => {
    updateExistedRecord(product, -1);
  });

  return tr;
};

const sumCostTotal = () => {
  let total = 0;
  const costRows = app.querySelectorAll(".cost-row");
  costRows.forEach((cost) => {
    total += parseFloat(cost.innerHTML);
    costTotal.innerHTML = total;
    return total;
  });
};

const handleRecordForm = (event) => {
  event.preventDefault();
  const data = new FormData(recordForm);
  const currentProduct = products.find(
    (product) => product.id == data.get("product_select")
  );

  const isExistedProduct = app.querySelector(
    `[product-id='${currentProduct.id}']`
  );
  if (isExistedProduct) {
    updateExistedRecord(currentProduct, data.get("quantity_input"));
  } else {
    addNewRecord(currentProduct, data.get("quantity_input"));
  }

  sumCostTotal();
  recordForm.reset();
};

//Process
products.forEach((product) =>
  productSelect.append(new Option(product.name, product.id))
);

recordForm.addEventListener("submit", handleRecordForm);
