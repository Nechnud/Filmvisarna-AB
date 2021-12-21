const Pprice = 7.5;
const Aprice = 8.5;
const Cprice = 3.5;

let counter = 0;
let amount = 0;
let Ptotal = 0;
let ATotal = 0;
let Ctotal = 0;
// Not finnished yet with the pricing!
let buttons = document.querySelectorAll('.amount');
console.log(buttons)
for (let button of buttons) {
  button.addEventListener('click', function (event) {
    let className = $(this).attr('class')


    if (className == "amount rounded-circle pensioner-price-Minus") {
      amount -= Pprice;
      
      if (amount < 0) {
        amount = 0;
        Ptotal -= Ptotal
      
      }

      if (Ptotal === 0) {
        document.getElementsByClassName("amount rounded-circle pensioner-price-Minus").disabled = true;
      }
    
    
      if (className == "amount rounded-circle pensioner-price-Plus") {
      
        amount += Pprice;
        Ptotal++; 
      
      }
      if (className == "amount rounded-circle adult-price-Minus") {
        amount -= Aprice;
        if (amount < 0) {
          amount = 0
        }
      }

    

      if (className == "amount rounded-circle adult-price-Plus") {
        amount += Aprice;
      }

      if (className == "amount rounded-circle child-price-Minus") {
        amount -= Cprice;
        if (amount < 0) {
          amount = 0
        }
      
      }
      if (className == "amount rounded-circle child-price-Plus") {
        amount += Cprice;
      }

      $('#amountReplace').html(amount)
      $('#counterReplaceChild').html(counter)
      $('#counterReplaceAdult').html(counter)
      $('#counterReplacePensioner').html(counter)
      console.log(amount);
      console.log(className);
    }
  })

}



