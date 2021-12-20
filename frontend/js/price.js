const Pprice = 7.5;
const Aprice = 8.5;
const Cprice = 3.5;

let amount = 0;
// Not finnished yet with the pricing!
let buttons = document.querySelectorAll('#amount')
for (let button of buttons) {
  button.addEventListener('click', function (event) {
    let className = $(this).attr('class')

    if (amount )

      if (className == "rounded-circle pensioner-price-Minus") {
        amount -= Pprice;
        if (amount < 0) {
          amount = 0
        }
    }
    
    if (className == "rounded-circle pensioner-price-Plus") {
      amount += Pprice;
      
    }
    if (className == "rounded-circle adult-price-Minus") {
      amount -= Aprice;
      if (amount < 0) {
        amount = 0
      }
    }

    

    if (className == "rounded-circle adult-price-Plus") {
      amount += Aprice;
    }

    if (className == "rounded-circle child-price-Minus") {
      amount -= Cprice;
      if (amount < 0) {
        amount = 0
      }
      
    }
    if (className == "rounded-circle child-price-Plus") {
      amount += Cprice;
    }

    $('#amountReplace').html(amount)

    console.log(amount);
    console.log(className);
  })
}





