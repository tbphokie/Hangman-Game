
       // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
      var gameData = [
        {title:"Sherlock", pic:"sherlock.jpg", theme:"Sherlock - BBC - Title Music.mp3"},
        {title:"Agatha Christie's Poirot"},
        {title:"Monk"},
        {title:"The X-Files"},
        {title:"The Mentalist"},
        {title:"Castle"},
        {title:"Columbo"},
        {title:"Bones"},
        {title:"Murder She Wrote"},
        {title:"Elementary"}, 
        {title:"Veronica Mars"},
        {title:"NCIS"},
        {title:"Psych"},
        {title:"Agatha Christie's Marple"}, 
        {title:"CSI:Crime Scene Investigation"}, 
        {title:"The Saint"}, 
        {title:"Midsomer Murders"}, 
        {title:"Miss Fisher's Murder Mysteries"}, 
        {title:"Moonlighting"}, 
        {title:"Rizzoli & Isles"}, 
        {title:"Murdoch Mysteries"},  
        {title:"Lewis"}, 
        {title:"Perry Mason"}, 
        {title:"Father Dowling Mysteries"}, 
        {title:"Crossing Jordan"}, 
        {title:"The Rockford Files"}, 
        {title:"Matlock"}, 
        {title:"CSI:NY"}, 
        {title:"Endeavour"}, 
        {title:"Hart to Hart"}, 
        {title:"The Avengers"}, 
        {title:"NCIS:Los Angeles"}, 
        {title:"Wallander"}, 
        {title:"Mannix"}];
      var wins = 0 ;
      var losses = 0;
      var guesses = [];
      var curWord = "";
      var specialChars = ["-", ":", "'", " "];
      var remaining = 6;
      var found = false;
      var earned = 0;

      //Function getWord:
      //  randomly picks an entry from the gameData list array, adds special characters 
      //    to the guesses array so they don't get counted as wrong answers, 
      //    and sets the length of the guesses array to 0 at the beginning of each game
      //  value is stored in the global variable curWord
      function getWord()
      {
        var loop = gameData.length;
        var index = -1;

        index = Math.floor(Math.random() * loop);
        curWord = gameData[index].title;

        //At the beginning of each game, make sure guesses is clear of old guesses
        guesses.length = 0;
        guesses.concat(specialChars);

        //At the beginning of each game, reset the remaining value back to 6
        remaining = 6 + earned;

        //At the beginning of each game, set found to true since no guesses have been made
        found = true;
        
        displayWord();
      }

      //Function displayWord:
      //  called to display on the screen the current word play with the appropriate
      //    underscores and letters displayed
      function displayWord()
      {
        var text;
        var wordCnt = curWord.length;
        var blankCount = 0;
        var tempWord = curWord.toUpperCase();
        var tempGuesses = [];
        var word = "";
        var letter;

        text = "<h2>";
        console.log("length is " + wordCnt);
        console.log("tempWord is: " + tempWord);

        
        for(i=0;i<guesses.length;i++)
        {
          tempGuesses[i] = guesses[i].toUpperCase();
          //tempGuesses[i] = letter.toUpperCase();
        }
        console.log("tempGuesses is : " + tempGuesses);

        for(i=0; i<wordCnt; i++)
        { 
          //Check in non-letter needs to be displayed
          if(specialChars.indexOf(curWord[i]) != -1)
            text+=curWord[i];
          else if(tempGuesses.indexOf(tempWord[i]) != -1)
          {
            text+=curWord[i];

          }
          else
          {
            text+="_";
            blankCount++;

          }
        }


        //Word has been guessed
        if(blankCount == 0)
        {
          wins++;
          alert("You Won!");
          if(remaining == (6+earned))
          {
            earned++;
            alert("You have earned an extra life per game for not missing one letter!");
          }

          //Change starting picture and play sound if available

        }
        else if(!found)
        {
          remaining--;
          console.log("decremented remaining");
        }

        text += "</h2><br>";
        text += "<p>Tries Remaining: " + (remaining+earned) + " </p>";
        text += "<p>Wins: "+ wins + "</p>";
        text += "<p>Losses: " + losses + "</p>";

        document.querySelector("#title").innerHTML = text; 
        if(remaining == 0)
        {
          alert("you loss");
          losses++;
          startGame();
        }
      }

       function UpdateGuesses(guesses)
       {
          
            var loop = guesses.length;
            var text;
            text = "Used Letters:<p>"
            for(x=0;x<loop;x++)
            {
              text += guesses[x];
              text += " ";
            }
            text+="</p>";
          
             // Select the div with the id "guess", and insert the following HTML into it.
            document.querySelector("#used").innerHTML = text; 
      }

      function UpdateHangedMan()
      {
        if(remaining >= 6)
          document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanStart.png\" class=\"img-responsive\">";
        else if(remaining == 5)
           document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanOne.png\" class=\"img-responsive\">";
        else if(remaining == 4)
                  document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanTwo.png\" class=\"img-responsive\">";
        else if(remaining == 3)
                  document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanThree.png\" class=\"img-responsive\">";
        else if(remaining == 2)
                  document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanFour.png\" class=\"img-responsive\">";
        else if(remaining == 1)
                  document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanFive.png\" class=\"img-responsive\">";
      else
                  document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanFinished.png\" class=\"img-responsive\">";

      }

      // This is run whenever the user presses a key.
      document.onkeyup = function(event) {

        // Determines which key was pressed
        var userGuess = event.key.toLowerCase();
        var tempWord = curWord.toUpperCase();
        var tempGuess = userGuess.toUpperCase();

        //First check to see if guess has already been made, if so do nothing
        if(guesses.indexOf(userGuess) == -1)
        {
          //Disregard ctrl, shift, arrow, etc keys
          if(userGuess.length == 1)
          {
            //Make sure user's guesses are not being used on special characters
            if(specialChars.indexOf(userGuess) == -1)
            {
              guesses.push(userGuess);
              console.log("OnKeyUp: tempWord = ", tempWord);
              console.log("OnKeyUp: tempGuess = ", tempGuess);
              var n = tempWord.indexOf(tempGuess) ;
              console.log("OnKeyUp: index = ", n);
              if(tempWord.indexOf(tempGuess) != -1)
              {
                found = true;
                 var audio = new Audio('./assets/sounds/door_creak_closing.mp3');
                 audio.play();  
             }
              else
              {
                found = false;
                var audio = new Audio('./assets/sounds/PersonScreamingNo.mp3');
                audio.play();    
                }        
                UpdateGuesses(guesses);
                displayWord();
                UpdateHangedMan();
             }

            }
          
        }
};
  