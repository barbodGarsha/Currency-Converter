const currencies_options = document.querySelectorAll("[data-currencies-options]")
const currencies_swap_btn = document.querySelector("[data-currencies-swap]")
const amount_input = document.querySelector("[data-amount]")
const result_display = document.querySelector("[data-results]")
const converter_form = document.querySelector("[data-converter-form]")
const numpad = document.querySelector("[data-numpad]")
const operators = document.querySelector("[data-operators]")

operators.addEventListener('click', function(e) {
  var input;
  if(e.target.nodeName == 'DIV' && e.target.classList.contains('key')) {
    input = e.target.children[0].innerText
  }
  else if (e.target.nodeName == 'P') {
    input = e.target.innerText
  }
  else {
    return
  }

  if(input == 'Enter') {
    execute_conversion()
  }
  else if(input == 'Del.') {
    amount_input.value = amount_input.value.slice(0, -1)
  }
  else if(input == 'Clear') {
    amount_input.value = ''
  }
})

numpad.addEventListener('click', function(e) {
  var input;
  if(e.target.nodeName == 'DIV' && e.target.classList.contains('key')) {
    input = e.target.children[0].innerText
  }
  else if (e.target.nodeName == 'P') {
    input = e.target.innerText
  }
  else {
    return
  }
  //TODO: Error handling for the inputs
  amount_input.value += input
})

converter_form.addEventListener('submit', function(e) {
  e.preventDefault()
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
  var filter = /^[0-9]+\.?[0-9]*$/
  if(filter.test(amount_input.value)==false){
    alert("Please enter valid input!")
    return
  }

  if(currencies_options[0].value === currencies_options[1].value){
    alert("Please choose different currencies!")
    return
  }

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

