const frankfurter_api_url = 'https://api.frankfurter.app'

async function get_api(url) {
  const response = await fetch(url);
  const data = await response.json();
  
  console.log(data);
}


async function get_currencies() {
  const response = await fetch(frankfurter_api_url + '/currencies');
  const data = await response.json();
  
  for (var key in data) {
    console.log('name=' + key + ' value=' + data[key])
  }
}

get_currencies()

async function convert_currencies(c1, c2, amount) {
  let result;
  const response = await fetch(`${frankfurter_api_url}/latest?amount= ${amount}&from=${c1}&to=${c2}`)
  const data = await response.json()
  
  console.log(`${amount} ${c1} = ${data.rates[c2]} ${c2}`);
}

convert_currencies('USD', 'EUR', 20)
