
        // Creates an array that lists the show titles, pictures, and theme
        var gameData = [
        {title:"Sherlock", pic:"sherlock.jpg", theme:"Sherlock - BBC - Title Music.mp3"},
        {title:"Agatha Christie's Poirot",pic:"Poirot.jpg", theme:"poirot.mp3"},
        {title:"Monk",pic:"Monk.jpg", theme:"Monk - Original.mp3"},
        {title:"The X-Files",pic:"thexfiles.jpg", theme:"The X-Files - Full.mp3"},
        {title:"The Mentalist",pic:"Mentalist.jpg", theme:"The Mentalist.mp3"},
        {title:"Castle", pic:"castle.jpg", theme:"Castle.mp3"},
        {title:"Columbo", pic:"columbo.jpg", theme:"Columbo - Sunday Night Mystery Movie - 2.mp3"},
        {title:"Bones", pic:"bones.jpg", theme:"Bones.mp3"},
        {title:"Murder She Wrote",pic:"MurderSheWrote.png", theme:"Murder She Wrote.mp3"},
        {title:"Elementary", pic:"elementary.jpg", theme:"Elementary.mp3"}, 
        {title:"Veronica Mars",pic:"VeronicaMars.png", theme:"Veronica Mars.mp3"},
        {title:"NCIS",pic:"ncis.jpg", theme:"ncis.mp3"},
        {title:"Psych",pic:"Psych.jpg", theme:"Psych.mp3"},
        {title:"Agatha Christie's Marple",pic:"Marple.jpg", theme:"Agatha Christies Miss Marple.mp3"}, 
        {title:"CSI:Crime Scene Investigation", pic:"csi.jpg", theme:"CSI Crime Scene Investigation.mp3"}, 
        {title:"The Saint",pic:"saint.jpg", theme:"The Saint - 1967.mp3"}, 
        {title:"Midsomer Murders",pic:"midsomerMurders.png", theme:"Midsomer Murders.mp3"}, 
        {title:"Miss Fisher's Murder Mysteries",pic:"missfishers.jpg", theme:"Miss Fishers Murder Mysteries.mp3"}, 
        {title:"Moonlighting",pic:"Moonlighting.jpg", theme:"Moonlighting - 1985.mp3"}, 
        {title:"Rizzoli & Isles",pic:"Rizzoli.jpg", theme:"Rizzoli and Isles.mp3"}, 
        {title:"Murdoch Mysteries",pic:"MurdochMysteries.jpg", theme:"Murdoch Mysteries.mp3"},  
        {title:"Lewis", pic:"Lewis.jpg", theme:"Inspector Lewis.mp3"}, 
        {title:"Perry Mason",pic:"PerryMason.png", theme:"Perry Mason.mp3"}, 
        {title:"Father Dowling Mysteries", pic:"FatherDowlingMysteries.jpg", theme:"Father Dowling Mysteries - Remastered.mp3"}, 
        {title:"Crossing Jordan", pic:"CrossingJordan.png", theme:"Crossing Jordan.mp3"}, 
        {title:"The Rockford Files",pic:"TheRockfordFiles.jpg", theme:"Rockford Files.mp3"}, 
        {title:"Matlock",pic:"Matlock.jpg", theme:"Matlock.mp3"}, 
        {title:"CSI:NY", pic:"csiny.jpg", theme:"CSI NY.mp3"}, 
        {title:"Endeavour", pic:"Endeavour.jpg", theme:"Endeavour_Morse_Theme.mp3"}, 
        {title:"Hart to Hart", pic:"HartToHart.jpg", theme:"Hart to Hart - Original.mp3"}, 
        {title:"The Avengers",pic:"TheAvengers.png", theme:"The Avengers - 1960s.mp3"}, 
        {title:"NCIS:Los Angeles",pic:"NcisLA.jpg", theme:"NCIS Los Angeles.mp3"}, 
        {title:"Wallander",pic:"Wallander.jpg", theme:"Wallander.mp3"}, 
        {title:"Mannix",pic:"Mannix.jpg", theme:"Mannix.mp3"},
        {title:"Inspector Morse", pic:"InspectorMorse.jpg", theme:"Inspector Morse.mp3"}];
        var wins = 0 ;
        var losses = 0;
        var guesses = [];
        var curWord = "";
        var specialChars = ["-", ":", "'", " ", "&"];
        var remaining = 6;
        var bFound = false;
        var earned = 0;
        var bStarted = false;
        var index = -1;
        var wrongGuess = 0;
        var audioTheme = new Audio();

      //Function getWord:
      //  randomly picks an entry from the gameData list array, adds special characters 
      //    to the guesses array so they don't get counted as wrong answers, 
      //    and sets the length of the guesses array to 0 at the beginning of each game
      //  value of show title is stored in the global variable curWord
      function getWord()
      {
        var loop = gameData.length;
    
        //Use Math.random to randomly choose an indexer into the gameData array; store title in curWord 
        index = Math.floor(Math.random() * loop);
        curWord = gameData[index].title;

        //At the beginning of each game, make sure guesses is clear of old guesses
        guesses.length = 0;
        guesses.concat(specialChars);
        wrongGuess = 0;

        //At the beginning of each game, reset the remaining value back to 6
        remaining = 6;

        //At the beginning of each game, set found to true since no guesses have been made
        bFound = true;
        
        //displayWord();
        //UpdateGuesses(guesses);
     }

/*    function Won()
     {
                var imageSrc = document.getElementById("mysteryPic").getAttribute("src");
           console.log(imageSrc);
           document.getElementById("mysteryPic").src = "assets/images/" + gameData[index].pic;
          imageSrc = document.getElementById("mysteryPic").getAttribute("src");
          console.log(imageSrc);
         

     }
 */ 
      //Function displayBlanks:
      //  called to display initial blanks on the screen without any other chechks
      function displayBlanks()
      {
        var text="";
        var wordCnt = curWord.length;

        text = "<h3>";
       for(i=0;i<wordCnt;i++)
        {
          //Check if non-letter needs to be displayed
          if(specialChars.indexOf(curWord[i]) != -1)
            text+=curWord[i];
          else
            text+="_";
        }
        text += "</h3><br>";

        text += "<h3>Tries Remaining: " + (remaining+earned) + " </h3>";
        text += "<h3>Wins: "+ wins + "</h3>";
        text += "<h3>Losses: " + losses + "</h3>";
        document.querySelector("#title").innerHTML = text; 

        UpdateGuesses(guesses);
        UpdateHangedMan();
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
       
        text = "<h3>";
        
        
        for(i=0;i<guesses.length;i++)
        {
          tempGuesses[i] = guesses[i].toUpperCase();
        }
        
        for(i=0; i<wordCnt; i++)
        { 
          //Check if non-letter needs to be displayed
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

        //Guessed letter was not found in the show title
        if(!bFound)
        {
          wrongGuess++;
        }

        //Word has been guessed
        if(blankCount == 0)
        {
          var imgText = "";

          imgText = "<img src=\"assets/images/" + gameData[index].pic + "\" class=\"img-responsive center-block\" id=\"mysteryPic\">";
          wins++;
          document.querySelector("#tvDiv").innerHTML = imgText;
          audioTheme.src = 'assets/sounds/'+gameData[index].theme;
          audioTheme.play();

          /*Tried to add a popup to display You Won or You lost at the end of the game, but couldn't get it to display properly
              var popup = document.getElementById("myPopup");
              popup.classList.toggle("show");
              */

        }
        else if(!bFound)
        {
          remaining--;
          
        }

        text += "</h3><br>";
        if(blankCount == 0 && wrongGuess == 0)
        {
          earned++;
          text += "<h3>You have earned an extra life</h3>";
          text += "<h3>per game for not missing one letter!</h3>";
          console.log("Guesses: "+guesses);
          console.log("Word: " + curWord);
        }
        text += "<h3>Tries Remaining: " + (remaining+earned) + " </h3>";
        text += "<h3>Wins: "+ wins + "</h3>";
        text += "<h3>Losses: " + losses + "</h3>";
        document.querySelector("#title").innerHTML = text; 
        
        if(remaining == 0)
        {
          losses++;
          var imgText = "";

          imgText = "<img src=\"assets/images/tvTransparent.png\" class=\"img-responsive center-block\" id=\"mysteryPic\">";
          wins++;
          document.querySelector("#tvDiv").innerHTML = imgText;
          audioTheme.src = 'assets/sounds/suicide.mp3'
          audioTheme.play();          text = "<h2>" + curWord + " </h2>";
          text += "<h3>Tries Remaining: " + (remaining+earned) + " </h3>";
          text += "<h3>Wins: "+ wins + "</h3>";
          text += "<h3>Losses: " + losses + "</h3>";
          document.querySelector("#title").innerHTML = text;
                          /*var popup = document.getElementById("myPopup");
              popup.classList.toggle("show");
              popup.text = "YOU LOST"; */
        }

        //Start next game automatically
        if(blankCount == 0 || remaining == 0)
        {          
          bStarted = false;  
        }    
      }


      //Function UpdateGuesses
      //  called to update the guessses on the display
      //  current guess array is passed into the function
      function UpdateGuesses(guesses)
      {

        var loop = guesses.length;
        var text;
        text = "<h3>Used Letters:</h3>"
        text += "<h3>"
        for(x=0;x<loop;x++)
        {
          text += guesses[x];
          text += " ";
        }
        text+="</h3>";

       // Select the div with the id "guess", and insert the following HTML into it.
       document.querySelector("#used").innerHTML = text; 
      }

      //Function UpdateHangedMan
      //  called to update the hangman on the display
      //  
     function UpdateHangedMan()
     {
        if(remaining+earned >= 6)
          document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanStart.png\" class=\"img-responsive center-block\">";
        else if(remaining+earned == 5)
          document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanOne.png\" class=\"img-responsive center-block\">";
        else if(remaining+earned == 4)
          document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanTwo.png\" class=\"img-responsive center-block\">";
        else if(remaining+earned == 3)
          document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanThree.png\" class=\"img-responsive center-block\">";
        else if(remaining+earned == 2)
          document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanFour.png\" class=\"img-responsive center-block\">";
        else if(remaining+earned == 1)
          document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanFive.png\" class=\"img-responsive center-block\">";
        else
          document.querySelector("#gallows").innerHTML = "<img src=\"assets/images/hangmanFinished.png\" class=\"img-responsive center-block\">";

    }

    // This is run whenever the user presses a key.
    document.onkeyup = function(event) {

        if(bStarted)
        {


          
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

                var n = tempWord.indexOf(tempGuess) ;
                if(tempWord.indexOf(tempGuess) != -1)
                {
                  bFound = true;
                  var audio = new Audio('./assets/sounds/door_creak_closing.mp3');
                  audio.play();  
                }
                else
                {
                  bFound = false;
                  var audio = new Audio('./assets/sounds/PersonScreamingNo.mp3');
                  audio.play();    
                }        
                UpdateGuesses(guesses);
                displayWord();
                UpdateHangedMan();
              }

            }
            
          }
        }
        else
        {
          /*Tried to add a popup to display You Won or You lost at the end of the game, but couldn't get it to display properly
          var popup = document.getElementById("myPopup");
          //popup.classList.toggle("show");
          popup.popup.*/
          

          document.querySelector("#tvDiv").innerHTML = "<img src=\"assets/images/tvMysteryTransparent.png\" class=\"img-responsive center-block\" id=\"mysteryPic\">";
          //First stop previous shows theme from playing, then reset tv image
          audioTheme.pause();
          bStarted = true;
          getWord();
          displayBlanks();
        }
      };
