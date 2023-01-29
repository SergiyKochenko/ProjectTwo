let step = true, //player turn
playerCountBalls = 10,
compCountBalls = 10,
openCollapsible = document.querySelector('.collapsible'),
openContents = document.querySelector('.contents'),
playBtn = document.querySelector('.play'),
playerBag = document.querySelector('.player-bag'),
compImg = document.querySelector('.comp-img'),
playerImg = document.querySelector('.player-img'),
playerCount = document.querySelector('.player_count'),
playerCountBtn = document.querySelector('.player_count-btn'),
evenBtn = document.querySelector('.even'),
oddBtn = document.querySelector('.odd'),
playText = document.querySelector('.play_text'),
results = document.querySelector('.game_results'),
guessCompBalls,
guessPlayerBalls,
compEvenOdd,
messages = {
  'wrong_bet': '<a class="fa" style="color: red; font-size: 1.5em; text-shadow: red 1px 0 10px;">Wrong bet</a>',
  'step_456': '<a class="fa">Guess Woody! <br>Place your bet and choose Odd/Even</a>',
  'win_456': '<a class="fa" style="font-size: 1.5em; text-shadow: #fff 1px 0 10px;"><span style="color: red; text-shadow: red 1px 0 10px;">Over game!</span> &nbsp;The winner is Woody!</a>',
  'res_456': '<a class="fa">Woody made his bet</a>',
  'step_001': '<a class="fa">Guessing Duck! <br>Place your bet</a>',
  'win_001': '<a class="fa" style="font-size: 1.5em; text-shadow: #fff 1px 0 10px;"><span style="color: red; text-shadow: red 1px 0 10px;">Over game!</span> &nbsp;The winner is Duck!</a>',
  'res_001': '<a class="fa">Duck made his bet</a>'
};

//top side bar menu
let coll = document.getElementsByClassName('collapsible');
    for(let i = 0; i < coll.length; i++) {
      coll[i].addEventListener('click', function () {
        this.classList.toggle('active');
        let contents = this.nextElementSibling;
        if (contents.style.maxHeight) {
          contents.style.maxHeight = null;
        } else {
          contents.style.maxHeight = contents.scrollHeight + 'px'
        }
      })
    };

let compTotal = document.querySelector('.comp_total'),
    playerTotal = document.querySelector('.player_total');

//start game from beginning.
playBtn.addEventListener('click', play);
function play() {
  playBtn.classList.add('hide');
  openCollapsible.classList.add('hide'); //function hide collapsible bar on click button "Play"
  openContents.classList.add('hide'); //function hidde rules content on click button "Play"
  playerCountBalls = 10;
  compCountBalls = 10;
  results.innerHTML = '';
  compImg.setAttribute('src', 'img/001-sad.png');
  playerImg.setAttribute('src', 'img/456-sad.png');
  playerCountBtn.removeAttribute('disabled');
  playerCount.removeAttribute('disabled');
  evenBtn.setAttribute('disabled', 'disabled');
  oddBtn.setAttribute('disabled', 'disabled');
  createBalls(playerCountBalls, compCountBalls);
  stepPlayers(step);
};

//recalculation of balls and changing the picture of the bag
function createBalls(playerCount, compCount) {
  playerCount >= 20 || playerCount <= 0 ?
  playerBag.setAttribute('src', 'img/empty.png') :
  playerBag.setAttribute('src', `img/${playerCount}.png`);
  compTotal.innerHTML = compCount;
  playerTotal.innerHTML = playerCount;
}

//computer's bet and choice
function compGuess() {
  //computer's bet rendomly from 1 to its owned number of balls
  guessCompBalls = Math.round(Math.random() * (compCountBalls - 1) + 1);
  //rendom choice of even or odd.
  compEvenOdd = Math.round(Math.random());
  console.log('computer bet -' + guessCompBalls);
  if (compEvenOdd) console.log("Computer's chose odd");
  else console.log("Computer's chose even");
}

//determination of the players' move
function stepPlayers(step) {
  console.log(step);
  compGuess(); //guesses the computer
  if (step) { //if the player's move
    playText.innerHTML = messages.step_456;
    playerCountBtn.addEventListener('click', function st_pl() {
      guessPlayerBalls = +playerCount.value; //get values from field
      //validation of the entered value
     if (guessPlayerBalls == 0 || guessPlayerBalls > playerCountBalls || isNaN(guessPlayerBalls)){
       playText.innerHTML = messages.wrong_bet;
       setTimeout(() => {
         playText.innerHTML = messages.step_456;
         playerCount.value = '';
       }, 2000);
     } 
     else { //if passed validation
       playerCountBtn.setAttribute('disabled', 'disabled');
       playerCount.setAttribute('disabled', 'disabled');
       evenBtn.removeAttribute('disabled');
       oddBtn.removeAttribute('disabled');
       playerCount.value = '';
       this.removeEventListener('click', st_pl);
     }
    });
  }
  else { //if the computer's move
     playText.innerHTML = messages.step_001;
     evenBtn.setAttribute('disabled', 'disabled');
     oddBtn.setAttribute('disabled', 'disabled');
     playerCountBtn.removeAttribute('disabled');
     playerCount.removeAttribute('disabled');
     playerCountBtn.addEventListener('click', function st_cp() {
     guessPlayerBalls = +playerCount.value; //geting values from field
      //validation of the entered value
     if (guessPlayerBalls == 0 || guessPlayerBalls > playerCountBalls || isNaN(guessPlayerBalls)){
       playText.innerHTML = messages.wrong_bet;
       setTimeout(() => {
         playText.innerHTML = messages.step_456;
         playerCount.value = '';
       }, 2000);
     } 
      else { //if passed validation
       writeBets(messages.res_001, guessCompBalls, compEvenOdd);
       checkWinner(guessCompBalls, guessPlayerBalls, compEvenOdd, step);
       playerCount.value = '';
       this.removeEventListener('click', st_cp);
     }
    });
  }
}

//player chooses
evenBtn.addEventListener('click', function () {
  checkWinner(guessCompBalls, guessPlayerBalls, 0, step);
  writeBets(messages.res_456, guessPlayerBalls, 0);
});
oddBtn.addEventListener('click', function () {
  checkWinner(guessCompBalls, guessPlayerBalls, 1, step);
  writeBets(messages.res_456, guessPlayerBalls, 1);
});

//function recording rates in the table
function writeBets(messBet, countBalls, choices) {
  let item = document.createElement('div');
  item.innerHTML = `${messBet} <strong>${countBalls}</strong> <a class="fa">and chose</a> ${choices ? '<a class="fa">odd</a>' : '<a class="fa">even</a>'}`;
  results.append(item);
}

//function recording the result of moves
function writeResultStep(mess, countBalls) {
  let item = document.createElement('div');
  item.innerHTML = `${mess} <strong>${countBalls}</strong> <a class="fa">pc.</a>`;
  results.append(item);
}

//function of disabling the player's buttons in case of the end of the game
function disabledButtons() {
  playerCountBtn.setAttribute('disabled', 'disabled');
  playerCount.setAttribute('disabled', 'disabled');
  evenBtn.setAttribute('disabled', 'disabled');
  oddBtn.setAttribute('disabled', 'disabled');
}

//function winner checker
function checkWinner(valueComp, valuePlayer, check, step) {
//if the player moves and he guessed the computer's bet, or guessed the computer's move and the computer did not guess my bet
  if ((valueComp % 2 == check && step) || (valuePlayer % 2 != check && !step)) {
    playerCountBalls += valuePlayer; //I add my bet to my balls
    compCountBalls -= valuePlayer; //I take my bet from the computer
    createBalls(playerCountBalls, compCountBalls);
    playerImg.setAttribute('src', 'img/456-happy.png');
    compImg.setAttribute('src', 'img/001-sad.png');
    
    //game end condition
    if(playerCountBalls >= 20) {
      playText.innerHTML = messages.win_456;
      playBtn.classList.remove('hide');
      disabledButtons();
      return;
    }
    if(compCountBalls >= 20) {
      playText.innerHTML = messages.win_001;
      playBtn.classList.remove('hide');
      disabledButtons();
      return;
    }
    
    //message to the table about the results
    setTimeout(() => {
      writeResultStep('<a class="fa">Woody win</a>', valuePlayer);
    }, 500);
  }
  else {
    playerCountBalls -= valueComp; //I give away the bet of the computer to computer
    compCountBalls += valueComp; //I add to the computer its bet
    createBalls(playerCountBalls, compCountBalls);
    playerImg.setAttribute('src', 'img/456-sad.png');
    compImg.setAttribute('src', 'img/001-happy.png');
    
    //game end condition
    if(playerCountBalls >= 20) {
      playText.innerHTML = messages.win_456;
      playBtn.classList.remove('hide');
      disabledButtons();
      return;
    }
    if(compCountBalls >= 20) {
      playText.innerHTML = messages.win_001;
      playBtn.classList.remove('hide');
      disabledButtons();
      return;
    }
    
    //message to the table about the results
    setTimeout(() => {
      writeResultStep('<a class="fa">Duck win</a>', valuePlayer);
    }, 500);
  }
  
  step = !step; //change of players
  stepPlayers(step); //start a new move
}
