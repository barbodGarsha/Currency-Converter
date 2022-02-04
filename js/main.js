const currencies_options = document.getElementsByClassName("currencies-options")
const currencies_swap_btn = document.getElementsByClassName("currencies-swap")[0]

currencies_swap_btn.addEventListener('click', function(e){
  const c1_index = currencies_options[0].selectedIndex
  const c2_index = currencies_options[1].selectedIndex

  currencies_options[0].selectedIndex = c2_index
  currencies_options[1].selectedIndex = c1_index
})

//API----------------------------------------------------------
const frankfurter_api_url = 'https://api.frankfurter.app'

async function get_currencies() {
  const response = await fetch(frankfurter_api_url + '/currencies')
  const data = await response.json()
  
  let count = 0;
  for (var key in data) {
    const option = document.createElement('option')
    option.value = key
    option.innerText = data[key] + " (" + key + ")" 
    for (const element of currencies_options) {
      element.appendChild(option.cloneNode(true)) 
    }
    count++
  }
}


get_currencies()

async function convert_currencies(c1, c2, amount) {
  let result
  const response = await fetch(`${frankfurter_api_url}/latest?amount= ${amount}&from=${c1}&to=${c2}`)
  const data = await response.json()
  
  console.log(`${amount} ${c1} = ${data.rates[c2]} ${c2}`)
}

