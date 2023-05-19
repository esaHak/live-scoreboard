var team1Score = 0;
var team2Score = 0;
var team1Sets = 0;
var team2Sets = 0;
var currentSet = 1;
var scores = [];

//Functions to keep Score

function incrementScore(team) {
  if (team === 1) {
    team1Score++; 
    displayScore(team,team1Score);
    checkSetWon(team1Score, team2Score, team)
  }
  if (team === 2) {
    team2Score++; 
    displayScore(team,team2Score);
    checkSetWon(team2Score, team1Score, team)
  }
}

function decreaseScore(team) {
  if (team === 1 && team1Score > 0) {
    team1Score--; 
    displayScore(team,team1Score);
  }
  if (team === 2 && team2Score > 0) {
    team2Score--; 
    displayScore(team,team2Score);
  }
}

function resetScore() {
  team1Score = 0;
  team2Score = 0;
  document.getElementById('team1score').innerHTML = team1Score;
  document.getElementById('team2score').innerHTML = team2Score;
}

//Check if either team has won the set
function checkSetWon(currentTeamScore, opposingTeamScore, team) {
  if (currentTeamScore >= 11 && currentTeamScore - opposingTeamScore >= 2) {
    updateSets(currentTeamScore, opposingTeamScore, team)
    currentSet++;
    displaySets();
    displaySetScores(0);
    resetScore();
  }
}

//Update the winning sets and set scores
function updateSets(winnerScore, loserScore, winner) {
  //console.log('Tiimi '+ winner + ' voitti ' + currentSet + '. erän tuloksella ' + winnerScore + ' - ' + loserScore);
  if (winner === 1) {
    team1Sets++;
    scores.push([winnerScore, loserScore]);
  }
  if (winner === 2) {
    team2Sets++;
    scores.push([winnerScore, loserScore]);
  }
}

function resetAll() {
  team1Sets = 0;
  team2Sets = 0;
  scores = [];
  resetScore();
  displaySetScores(1);
  currentSet = 1;
  displaySets();
}

//Display functions for scores, sets, and previous set scores
function displayScore(team, teamScore) {
  document.getElementById('team' + team + 'score').innerHTML = teamScore;
}

function displaySets() {
  document.getElementById('currentset').innerHTML = currentSet;
  document.getElementById('team1-sets').innerHTML = team1Sets;
  document.getElementById('team2-sets').innerHTML = team2Sets;
}

function displaySetScores(reset) { 
  if (reset === 1 && currentSet > 1) {
    for (let i = currentSet; i > 1; i--) {
      console.log('reset row index ', i);
      document.getElementById("setscores").deleteRow(i);  
    }
    }
  if (reset === 0) {
      // Find a <table> element with id="setscores":
      var table = document.getElementById("setscores");

      // Create an empty <tr> element and add it to the last position of the table:
      var row = table.insertRow(-1);

      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);

      // Add some text to the new cells:
      cell1.innerHTML = currentSet;
      cell2.innerHTML = team1Score;
      cell3.innerHTML = team2Score;
  }
}