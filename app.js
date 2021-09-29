const list = document.getElementById("crypto-results");

// Crypto class
class Cryto {
  constructor(marketCapRank, symbol, name, image, curentPrice, marketCap, circulatingSupply, totalVolume, priceChange24h, marketCapChangePercentage24h) {
    this.marketCapRank = marketCapRank;
    this.symbol = symbol;
    this.name = name;
    this.image = image;
    this.curentPrice = curentPrice;
    this.marketCap = marketCap;
    this.circulatingSupply = circulatingSupply;
    this.totalVolume = totalVolume;
    this.priceChange24h = priceChange24h;
    this.marketCapChangePercentage24h = marketCapChangePercentage24h;
  }
}

// UI class
class UI {
  // Add Crypto To List
  addCryptoToList(cryptoRes, nameOfClass) {

    //create row and add class "row"
    let row = createElement("tr", nameOfClass)
    row.classList.add("row")

    //insert cols
    row.innerHTML = `
    <td>${cryptoRes.marketCapRank}</td>
    <td class="orange">${cryptoRes.symbol.toUpperCase()}</td>
    <td>${cryptoRes.name}</td>
    <td><img class="coin-logo" src="${cryptoRes.image}"></img></td>
    <td class = "price">${'$ ' + cryptoRes.curentPrice.toLocaleString()}</td>
    <td>${'$ ' + (cryptoRes.marketCap).toLocaleString()}</td>
    <td class=""bold-text"">${cryptoRes.circulatingSupply.toLocaleString() + ' ' + cryptoRes.symbol.toUpperCase()}</td>
    <td>${'$ ' + cryptoRes.totalVolume.toLocaleString()}</td>
    <td class="h24">${'$ ' + (cryptoRes.priceChange24h).toFixed(2)}</td>
    <td class="percentage24h">${(cryptoRes.marketCapChangePercentage24h).toFixed(2) + ' %'}</td>
    `
    // Append row to table
    list.appendChild(row);
  }

  updateCryptoList(cryptoRes, nameOfClass, num) {

    //OLD cols to compare
    let oldRow = document.querySelector(`.${nameOfClass}`);
    let oldH24 = document.querySelectorAll(".h24")[num].innerHTML;

    //insert NEW cols
    let newRow = oldRow.innerHTML = `
    <td>${cryptoRes.marketCapRank}</td>
    <td class="orange">${cryptoRes.symbol.toUpperCase()}</td>
    <td>${cryptoRes.name}</td>
    <td><img class="coin-logo" src="${cryptoRes.image}"></img></td>
    <td class = "price">${'$ ' + cryptoRes.curentPrice.toLocaleString()}</td>
    <td>${'$ ' + (cryptoRes.marketCap).toLocaleString()}</td>
    <td class="bold-text">${cryptoRes.circulatingSupply.toLocaleString() + ' ' + cryptoRes.symbol.toUpperCase()}</td>
    <td>${'$ ' + cryptoRes.totalVolume.toLocaleString()}</td>
    <td class="h24">${'$ ' + (cryptoRes.priceChange24h).toFixed(2)}</td>
    <td class="percentage24h">${(cryptoRes.marketCapChangePercentage24h).toFixed(2) + ' %'}</td>
    `
    //NEW cols to compare
    let newH24 = '$ ' + (cryptoRes.priceChange24h).toFixed(2);
    let newH24White = document.querySelectorAll(".h24")[num];
    let newH24PercentageWhite = document.querySelectorAll(".percentage24h")[num];

    //comparison
    if (oldH24 > newH24) {
      oldRow.classList.add("update-green-bg");
      newH24White.classList.add("white-color");
      newH24PercentageWhite.classList.add("white-color");
      setTimeout(() => {
        oldRow.classList.remove("update-green-bg");
        newH24White.classList.remove("white-color");
        newH24PercentageWhite.classList.remove("white-color");
      }, 2000)
    } else if (oldH24 < newH24) {
      oldRow.classList.add("update-red-bg");
      newH24White.classList.add("white-color");
      newH24PercentageWhite.classList.add("white-color");

      setTimeout(() => {
        oldRow.classList.remove("update-red-bg");
        newH24White.classList.remove("white-color");
        newH24PercentageWhite.classList.remove("white-color");
      }, 2000)
    }
    return newRow;
  }

  //Change color for positive and negative - ".percentage24h"
  colorPercentage24h() {
    let percentage24hNum = document.querySelectorAll(".percentage24h");
    for (let percentage of percentage24hNum) {
      if ((percentage.innerHTML)[1] === '0' && (percentage.innerHTML)[3] === '0' && (percentage.innerHTML)[4] === '0') {
        percentage.style.color = 'rgb(209, 136, 0)';
      } else if ((percentage.innerHTML)[0] === '-') {
        percentage.style.color = 'red';
      } else {
        percentage.style.color = 'green';
      }
    }
  }

  //Change color for positive and negative - ".24h"
  color24h() {
    let num24h = document.querySelectorAll(".h24");
    for (let num of num24h) {
      if (((num.innerHTML)[3] === '0' && (num.innerHTML)[5] === '0' && (num.innerHTML)[6] === '0') || ((num.innerHTML)[2] === '0' && (num.innerHTML)[4] === '0' && (num.innerHTML)[5] === '0')) {
        num.style.color = 'rgb(209, 136, 0)';
      } else if ((num.innerHTML)[2] === '-') {
        num.style.color = 'red';
      } else {
        num.style.color = 'green';
      }
    }
  }
};

let firstTime = true;

// Fetch data
async function fetchCrypto() {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")

  const results = await response.json();
  const data = await results;

  //instantiate UI
  const ui = new UI;

  const cryptoClass = (i) => {
    return new Cryto(data[i].market_cap_rank, data[i].symbol, data[i].name, data[i].image, data[i].current_price, data[i].market_cap, data[i].circulating_supply, data[i].total_volume, data[i].price_change_24h, data[i].market_cap_change_percentage_24h);
  }

  const cryptoRes1 = cryptoClass(0);
  const cryptoRes2 = cryptoClass(1);
  const cryptoRes3 = cryptoClass(2);
  const cryptoRes4 = cryptoClass(3);
  const cryptoRes5 = cryptoClass(4);
  const cryptoRes6 = cryptoClass(5);
  const cryptoRes7 = cryptoClass(6);
  const cryptoRes8 = cryptoClass(7);
  const cryptoRes9 = cryptoClass(8);
  const cryptoRes10 = cryptoClass(9);
  const cryptoRes11 = cryptoClass(10);
  const cryptoRes12 = cryptoClass(11);
  const cryptoRes13 = cryptoClass(12);
  const cryptoRes14 = cryptoClass(13);
  const cryptoRes15 = cryptoClass(14);
  const cryptoRes16 = cryptoClass(15);
  const cryptoRes17 = cryptoClass(16);
  const cryptoRes18 = cryptoClass(17);
  const cryptoRes19 = cryptoClass(18);
  const cryptoRes20 = cryptoClass(19);
  const cryptoRes21 = cryptoClass(20);
  const cryptoRes22 = cryptoClass(21);
  const cryptoRes23 = cryptoClass(22);
  const cryptoRes24 = cryptoClass(23);
  const cryptoRes25 = cryptoClass(24);
  const cryptoRes26 = cryptoClass(25);
  const cryptoRes27 = cryptoClass(26);
  const cryptoRes28 = cryptoClass(27);
  const cryptoRes29 = cryptoClass(28);
  const cryptoRes30 = cryptoClass(29);

  //add crypto to list
  if (firstTime) {

    // Add cryptos to list
    ui.addCryptoToList(cryptoRes1, "cryptoRes1");
    ui.addCryptoToList(cryptoRes2, "cryptoRes2");
    ui.addCryptoToList(cryptoRes3, "cryptoRes3");
    ui.addCryptoToList(cryptoRes4, "cryptoRes4");
    ui.addCryptoToList(cryptoRes5, "cryptoRes5");
    ui.addCryptoToList(cryptoRes6, "cryptoRes6");
    ui.addCryptoToList(cryptoRes7, "cryptoRes7");
    ui.addCryptoToList(cryptoRes8, "cryptoRes8");
    ui.addCryptoToList(cryptoRes9, "cryptoRes9");
    ui.addCryptoToList(cryptoRes10, "cryptoRes10");
    ui.addCryptoToList(cryptoRes11, "cryptoRes11");
    ui.addCryptoToList(cryptoRes12, "cryptoRes12");
    ui.addCryptoToList(cryptoRes13, "cryptoRes13");
    ui.addCryptoToList(cryptoRes14, "cryptoRes14");
    ui.addCryptoToList(cryptoRes15, "cryptoRes15");
    ui.addCryptoToList(cryptoRes16, "cryptoRes16");
    ui.addCryptoToList(cryptoRes17, "cryptoRes17");
    ui.addCryptoToList(cryptoRes18, "cryptoRes18");
    ui.addCryptoToList(cryptoRes19, "cryptoRes19");
    ui.addCryptoToList(cryptoRes20, "cryptoRes20");
    ui.addCryptoToList(cryptoRes21, "cryptoRes21");
    ui.addCryptoToList(cryptoRes22, "cryptoRes22");
    ui.addCryptoToList(cryptoRes23, "cryptoRes23");
    ui.addCryptoToList(cryptoRes24, "cryptoRes24");
    ui.addCryptoToList(cryptoRes25, "cryptoRes25");
    ui.addCryptoToList(cryptoRes26, "cryptoRes26");
    ui.addCryptoToList(cryptoRes27, "cryptoRes27");
    ui.addCryptoToList(cryptoRes28, "cryptoRes28");
    ui.addCryptoToList(cryptoRes29, "cryptoRes29");
    ui.addCryptoToList(cryptoRes30, "cryptoRes30");

    // Create rows only on load, after just update
    firstTime = false;
  }
  // Update cryptos
  ui.updateCryptoList(cryptoRes1, "cryptoRes1", 0);
  ui.updateCryptoList(cryptoRes2, "cryptoRes2", 1);
  ui.updateCryptoList(cryptoRes3, "cryptoRes3", 2);
  ui.updateCryptoList(cryptoRes4, "cryptoRes4", 3);
  ui.updateCryptoList(cryptoRes5, "cryptoRes5", 4);
  ui.updateCryptoList(cryptoRes6, "cryptoRes6", 5);
  ui.updateCryptoList(cryptoRes7, "cryptoRes7", 6);
  ui.updateCryptoList(cryptoRes8, "cryptoRes8", 7);
  ui.updateCryptoList(cryptoRes9, "cryptoRes9", 8);
  ui.updateCryptoList(cryptoRes10, "cryptoRes10", 9);
  ui.updateCryptoList(cryptoRes11, "cryptoRes11", 10);
  ui.updateCryptoList(cryptoRes12, "cryptoRes12", 11);
  ui.updateCryptoList(cryptoRes13, "cryptoRes13", 12);
  ui.updateCryptoList(cryptoRes14, "cryptoRes14", 13);
  ui.updateCryptoList(cryptoRes15, "cryptoRes15", 14);
  ui.updateCryptoList(cryptoRes16, "cryptoRes16", 15);
  ui.updateCryptoList(cryptoRes17, "cryptoRes17", 16);
  ui.updateCryptoList(cryptoRes18, "cryptoRes18", 17);
  ui.updateCryptoList(cryptoRes19, "cryptoRes19", 18);
  ui.updateCryptoList(cryptoRes20, "cryptoRes20", 19);
  ui.updateCryptoList(cryptoRes21, "cryptoRes21", 20);
  ui.updateCryptoList(cryptoRes22, "cryptoRes22", 21);
  ui.updateCryptoList(cryptoRes23, "cryptoRes23", 22);
  ui.updateCryptoList(cryptoRes24, "cryptoRes24", 23);
  ui.updateCryptoList(cryptoRes25, "cryptoRes25", 24);
  ui.updateCryptoList(cryptoRes26, "cryptoRes26", 25);
  ui.updateCryptoList(cryptoRes27, "cryptoRes27", 26);
  ui.updateCryptoList(cryptoRes28, "cryptoRes28", 27);
  ui.updateCryptoList(cryptoRes29, "cryptoRes29", 28);
  ui.updateCryptoList(cryptoRes30, "cryptoRes30", 29);

  ui.colorPercentage24h()
  ui.color24h()
};

// Fetch crypto
fetchCrypto().then(
  // Interval for fetch crypto
  setInterval(() => {
    fetchCrypto()
  }
    , 3000)
).catch(e => {
  console.log(alert(`Something is wrong. Please try again later.\nError: ${e.message}`))
})

// function for creating elements and adding classes
function createElement(elementType, elementClass) {
  let element = document.createElement(elementType)
  element.classList.add(elementClass);
  return (element);
}