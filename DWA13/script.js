'use-strict';

const provinces = [
  'Western Cape',
  'Gauteng',
  'Northern Cape',
  'Eastern Cape',
  'KwaZulu-Natal',
  'Free State',
];
const names = [
  'Ashwin',
  'Sibongile',
  'Jan-Hendrik',
  'Sifso',
  'Shailen',
  'Frikkie',
];

// Use forEach to console log each name to the console. You are allowed to call console.log seven times:
const namesLog = names.forEach((name) => console.log(name));

// Use forEach to console log each name with a matching province (for example Ashwin (Western Cape). Note that you are only allowed to call console.log seven times:
const nameProvincePair = names.forEach((name, index) => {
  if (index < provinces.length) {
    const provinceMatch = provinces[index];
    console.log(`${name} (${provinceMatch})`);
  }
});

// Using map loop over all province names and turn the string to all uppercase. Log the new array to the console:
const nameUppercase = names.map((name) => name.toUpperCase());
console.log(nameUppercase);

// Create a new array with map that has the amount of characters in each name. The result should be: [6, 9, 11, 5, 7, 7]:
const nameLength = names.map((name) => name.length);
console.log(nameLength);

// Using toSorted to sort all provinces alphabetically:
const sortedProvinces = provinces.toSorted();
console.log(sortedProvinces);

// Use filter to remove all provinces that have the word Cape in them. After filtering the array, return the amount of provinces left. The final value should be 3:
const filteredProvinces = provinces.filter((province) =>
  province.includes('Cape'),
);
console.log(filteredProvinces, filteredProvinces.length);

// Create a boolean array by using map and some to determine whether a name contains an S character. The result should be [true, true, false, true, true, false]

const containsSArray = names.map(
  (name) => name.includes('s') || name.includes('S'),
);
console.log(containsSArray);

// Using only reduce, turn the above into an object that indicates the province of an individual :

// - result is an empty object initially,
// - Then its properties are set,
// - First property is the current element of the array
// - and that properties value is the element in the province array that corresponds to the current iteration
const provinceNameObj = names.reduce((result, name, index) => {
  result[name] = provinces[index];
  return result;
}, {});
console.log(provinceNameObj);

/*********************************************************************************************************** */

const products = [
  { product: 'banana', price: '2' },
  { product: 'mango', price: 6 },
  { product: 'potato', price: ' ' },
  { product: 'avocado', price: '8' },
  { product: 'coffee', price: 10 },
  { product: 'tea', price: '' },
];

// Use forEach to console.log each product name to the console.
const productLog = products.forEach((productObj) =>
  console.log(productObj.product),
);

// Use filter to filter out products that have a name longer than 5 characters
const filteredProductLog = products.filter(
  (productObj) => productObj.product.length > 5,
);
console.log(filteredProductLog);

// Using both filter and map. Convert all prices that are strings to numbers, and remove all products from the array that do not have prices. After this has been done then use reduce to calculate the combined price of all remaining products.

const toNumber = products.map((productObj) => {
  return {
    product: productObj.product,
    price: parseInt(productObj.price),
  };
});
console.log(toNumber);

const productsWithPrices = toNumber.filter(
  (productObj) => !isNaN(productObj.price),
);
console.log(productsWithPrices);

const combinedPrice = productsWithPrices.reduce(
  (totalPrice, productObj) => totalPrice + productObj.price,
  0,
);
console.log(combinedPrice);

// Use reduce to concatenate all product names to create the following string: banana, mango, potato, avocado, coffee and tea.

const concatProducts = products.reduce((string, productObj, index, array) => {
  if (index === 0) {
    return productObj.product;
  }
  if (index === array.length - 1) {
    return `${string}, and ${productObj.product}`;
  }
  return `${string}, ${productObj.product}`;
}, '');
console.log(concatProducts);

// Use reduce to calculate both the highest and lowest-priced items. The names should be returned as the following string: Highest: coffee. Lowest: banana.

const highest = productsWithPrices.reduce((max, productObj) => {
  if (max > productObj.price) {
    return max;
  } else {
    return productObj.price;
  }
}, productsWithPrices[0]);

const lowest = productsWithPrices.reduce((min, productObj) => {
  if (min < productObj.price) {
    return min;
  } else {
    return productObj.price;
  }
}, productsWithPrices[0]);

console.log(`Highest: ${highest} , Lowest: ${lowest}`);

// Using only Object.entries and reduce recreate the object with the exact same values. However, the following object keys should be changed in the new array:
// -product should be changed to name
// -price should be changed to cost
