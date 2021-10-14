const list = document.getElementById("crypto-results");
const liveTextCircle = document.querySelector(".live-green-text");


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
    <td class="bold-text">${cryptoRes.circulatingSupply.toLocaleString() + ' ' + cryptoRes.symbol.toUpperCase()}</td>
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

  // create cryptos
  const cryptoClass = (i) => {
    return new Cryto(data[i].market_cap_rank, data[i].symbol, data[i].name, data[i].image, data[i].current_price, data[i].market_cap, data[i].circulating_supply, data[i].total_volume, data[i].price_change_24h, data[i].market_cap_change_percentage_24h);
  }

  for (let i = 0; i < 50; i++) {
    if (firstTime) {
      //add crypto to list for the first time
      ui.addCryptoToList(cryptoClass(i), "cryptoRes" + [i]);
      ui.colorPercentage24h()
      ui.color24h()
    }
    else {
      //update list
      ui.updateCryptoList(cryptoClass(i), "cryptoRes" + [i], [i]);
      ui.colorPercentage24h()
      ui.color24h()
    }
  }
  firstTime = false;
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

// Loader
const loader = document.getElementById("loader");

window.addEventListener("load", () => {
  loader.classList.add("disapear");
})

//LIVE circle blink
setInterval(() => {
  liveTextCircle.classList.toggle("live-green-text-OFF");
}, 1400)