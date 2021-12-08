const Pprice = 4;
const Aprice = 5;
const Cprice = 3;

let amount = 0;
// Not finnished yet with the pricing!
let buttons = document.querySelectorAll('#amount')
for (let button of buttons) {
  button.addEventListener('click', function (event) {
    let className = $(this).attr('class')

    if (amount )

      if (className == "pensioner-") {
        amount -= Pprice;
        if (amount >= 0) {
          document.getElementsByClassName('pensioner-').disable = true;
        }
    }
    
    if (className == "pensioner+") {
      amount += Pprice;
      
    }
    if (className == "adult-") {
      amount -= Aprice;
      if (amount >= 0) {
        document.getElementsByClassName('adult-').disable = true;
      }
    }

    

    if (className == "adult+") {
      amount += Aprice;
    }

    if (className == "child-") {
      amount -= Cprice;
      if (amount >= 0) {
        document.getElementsByClassName('child-').disable = true;
      }
    }
    if (className == "child+") {
      amount += Cprice;
    }

    
    console.log(amount);
    console.log(className);
  })
}





