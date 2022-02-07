const currencies_options = document.querySelectorAll("[data-currencies-options]")
const currencies_swap_btn = document.querySelector("[data-currencies-swap]")
const amount_input = document.querySelector("[data-amount]")
const result_display = document.querySelector("[data-results]")
const converter_form = document.querySelector("[data-converter-form]")


converter_form.addEventListener('submit', function(e) {
  e.preventDefault()
  var ex = /^[0-9]+\.?[0-9]*$/
  if(ex.test(amount_input.value)==false){
    alert("Please enter valid input!")
    return
  }

  if(currencies_options[0].value === currencies_options[1].value){
    alert("Please choose different currencies!")
    return
  }
  //TODO: ERROR HANDLING
  execute_conversion()
})

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
  
  let count = 0
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

function execute_conversion() {
  const c1 = currencies_options[0].value
  const c2 = currencies_options[1].value
  const amount = amount_input.value

  convert_currencies(c1, c2, amount)
}

get_currencies()

async function convert_currencies(c1, c2, amount) {
  let result
  const response = await fetch(`${frankfurter_api_url}/latest?amount= ${amount}&from=${c1}&to=${c2}`)
  const data = await response.json()
  
  result_display.innerText = amount + " " + c1 + " " + data.rates[c2] + " " + c2
}

