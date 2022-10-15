/*This exercise is about figuring out efficient ways to work with  polyhedral dice (typically used in RPGs, see d4, d6, d8, d10, d12 and d20) when rolling for results on tables.

NOTE: Only standard RPG dice (see above) are used here. I ignored hard-to-acquire non-standard RPG dice such as d30.


QUESTION: If you have a table with n (user input) elements to roll for, what is the ideal combination of dice you have to roll so that you can roll for all possible options on the table exactly once?
OR IN OTHER WORDS: If you have a table of 10 armor types or 20 weapon types to roll for, that's easy to handle. But what about tables where you have irregular numbers, such as 14 or 17 or 19?

PREFERENCES: 1) use d4 as little as possible 2) use high coefficient results as much as possible 3) least amount of dice wins


STUFF TO COMPLETE:
-Integer check
-Combine messages into one line
-Filter results based on preferences (try to ignore d4, high coefficient wins, least amount of dice wins)
*/


//Get user input
var tot = prompt("How many elements does your list have?");
console.log("Your list has " + tot + " items.");

// Greatest common denominator function we'll need in Case 4



/*
Checking user input integer based on increasingly difficult cases ---

1) Solvable with half a die, unique cases with if-checks
2) Solvable with exactly one kind of die (1d6, 2d6, etc.) 
   INCLUDES MERGED CASE of "Solvable with exactly one die"
3) Solvable with product arithmeticals of dice (d44, d666, d486, etc.
   INCLUDES MERGED CASE of "Solvable with product arithmeticals of exactly one kind of die"
4) Solvable with a combination of dice with different coefficients.



*/



//CASE 1 - Solvable with half dice (tot == 1,2,3,5)
if (tot == 1) console.log("1) One way to go, ne?");
if (tot == 2) console.log("1) Flip a coin or use d6 - 1-3 is your first choice, 4-6 is your second choice on the list");
if (tot == 3) console.log("1) Roll a d6 - 1,2 is the first, 3,4 is the second, 5,6 is the third option on the list");
if (tot == 5) console.log("1) Roll a d10 - 1,2 is first, 3,4 is second, 5,6 is third option on the list, etc. etc.")

//CASE 2 - Solvable with multiple die of the same kind (blends 1a, solvable with one die)
var diceType = [20, 12, 10, 8, 6, 4];
for (j = 0; j < diceType.length; j++) {
  for (i = 0; i < 10; i++) {
    if (tot == diceType[j] + ((i - 1) * (diceType[j] - 1)) && tot > 1) {
      console.log("2) Roll a " + i + "d" + diceType[j]);
    }
  }
}

//CASE 3a - Solvable with prod.arithmeticals of three different dice
for (fD = 0; fD < diceType.length; fD++) {
  for (sD = 0; sD < diceType.length; sD++) {
      if (tot == diceType[fD] * diceType[sD]) {
        console.log("3b) Roll a d" + diceType[fD] + diceType[sD]);
    }
  }
}

//CASE 3b - Solvable with prod.arithmeticals of three different dice
for (fD = 0; fD < diceType.length; fD++) {
  for (sD = 0; sD < diceType.length; sD++) {
    for (tD = 0; tD < diceType.length; tD++) {
      if (tot == diceType[fD] * diceType[sD] * diceType[tD]) {
        console.log("3b) Roll a d" + diceType[fD] + diceType[sD] + diceType[tD]);
      }
    }
  }
}


//CASE 4 - Solvable with a combination of dice with different coefficients
var dicePrime = [19, 11, 9, 7, 5, 3];
var diceOneCoeff = [0, 0, 0, 0, 0, 0];
var diceTwoCoeff = [0, 0, 0, 0, 0, 0];
var totRemainder = tot;

function GCD(a, b) {
  var remainder = a % b;
  var gcd = (a - remainder) / b;
  return gcd;
}

for (i = 0; i < diceType.length; i++) {
  for (j = 0; j < diceType.length; j++) {
	
    diceOneCoeff[i] = GCD(tot, diceType[i]);		
    var chunk1 = diceOneCoeff[i] * diceType[i]; 
    totRemainder = tot - chunk1 + diceOneCoeff[i]-1;

    diceTwoCoeff[j] = GCD(totRemainder, dicePrime[j]);
    var chunk2 = diceTwoCoeff[j] * dicePrime[j];

    if (tot - (chunk1+chunk2) == 0 && diceOneCoeff[i] !== 0 && diceTwoCoeff[j] !== 0) {
      console.log("4) Roll a " + diceOneCoeff[i] + "d" + diceType[i] + "+" + diceTwoCoeff[j] + "d" + diceType[j]);
    }


  }
}





console.log("Calculations finished.")
