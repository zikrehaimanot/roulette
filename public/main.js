let minBet = document.getElementById('min')
let maxBet = document.getElementById('max')

let redChoice = document.getElementById('red')
let blackChoice = document.getElementById('black')
let greenChoice = document.getElementById('green')

let balance = document.getElementById('balance')

let userChoice;
let currentBet = document.getElementById('playerBet')
let display = document.querySelector("#resultColor")
let red,
  black,
  green,
  green2;

let marbleSpot;
let dropdown = document.getElementById('dropdown')
let submitBet = document.getElementById('submitBet')
let displayResult = document.getElementById('resultNumber')

submitBet.addEventListener('click',() =>{
  console.log(typeof balance.innerHTML, 'balance')
  console.log(typeof currentBet.value, 'currentBet')
    if(parseInt(balance.innerHTML) >= parseInt(currentBet.value)){
      let playerChoice = dropdown.value
      spinTheWheel(playerChoice)
    }
    else{alert('not enough funds')}
})

function spinTheWheel(playerChoice){
  let result = Math.round(Math.random()*38)
  console.log(result)
  if (result === 0 || result === 38){
    marbleSpot = "Green"
    displayOnDom(marbleSpot)
    updateBalance(marbleSpot,playerChoice,result)
  } else if (result % 2 === 0){
    marbleSpot = "Red"
    displayOnDom(marbleSpot)
    updateBalance(marbleSpot,playerChoice,result)
  }else{
    marbleSpot = "Black"
    displayOnDom(marbleSpot)
    updateBalance(marbleSpot,playerChoice,result)
  }
}
function updateBalance(marbleSpot,playerChoice,result){
  let userBalance = parseFloat(balance.innerHTML)
  let bet = parseFloat(currentBet.value)
  let betResult;
  let didWin;
  console.log(bet)
  console.log(result,playerChoice)
  if(playerChoice === marbleSpot){
   // userBalance = parseInt(userBalance) + (bet * 2)
   betResult = bet * 2
   didWin = false
  }else if (playerChoice !== marbleSpot){
    // userBalance = userBalance - bet
    betResult = -bet
    didWin = "true"
  }else if(playerChoice == result){
   // userBalance = parseInt(userBalance) + (bet * 35)
   betResult = bet * 35
   didWin = false

  }else if(playerChoice !== result){
   // userBalance = userBalance - bet
   betResult = -bet
   didWin = "true"
  }
  userBalance = userBalance + betResult
  displayBalance(userBalance,result)
  postToDB(-betResult,didWin)
  resultNumber.innerHTML = result
}

function displayBalance(msg) {
    balance.innerHTML = msg;
}

function displayOnDom(msg) {
  document.getElementById("resultColor").innerHTML = msg;
}
function postToDB(betResult,didWin){
  fetch('cassinoStats', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'betResult': betResult,
      'didWin': didWin,
      // 'thumbUp':thumbUp
    })
  })
  .then(response => {
    if (response.ok) return response.json()
    console.log(response)
  })
  .then(data => {
    console.log(data)
    // window.location.reload(true)
  })
}
// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         console.log(thumbUp)
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//           console.log(response)
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         console.log(thumbUp)
//         fetch('messagesDown', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
//
// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
