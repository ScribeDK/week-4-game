	// fighter stats [attack, defence, starting health]
	var darkElf = [6,7,20];
	var orc = [6,3,60];
	var elf = [6,6,30];
	var human = [5,5,50];
	var skeleton = [4,7,40];
	var dwarf = [3,6,60];
	// is player fighter or opponent selected
	var player = false;
	var opponent = false;
	// active player and opponent fighter data
	var playerFighter = ("");
	var opponentFighter = ("");
	// player and opponent stat boxes (to be filled later)
	var opponentStats = ("");
	var playerStats = ("");
	//player stats (filled after selection)
	var playerAtt = ("");
	var playerDef = ("");
	var playerHP = ("");
	//opponent stats (filled after selection)
	var opponentAtt = ("");
	var opponentDef = ("");
	var opponentHP = ("");
	// check if game is won
	var winCount = 0;
	// set location to add new elements
	var mainBox = $(".mainBox");

	//Click section to select fighter
	$('.fighter').on('click', function() {
		
			//save which fighter is picked
			var fighter = ($(this).attr('data-tag'));
		
			// if player fighter not picked set pick to be player fighter
			if (player == false){
				
				playerFighter = fighter;
				
				//set playerFighter location
				$("." + fighter).animate({top:"550px", left:"575px"}, "normal");
				
				player = true;
			}
			// if player fighter is picked and there is no opponent set to be opponent
			else if (opponent == false && fighter != playerFighter){
				
				opponentFighter = fighter;
				
				//set opponentFighter location
				$("." + fighter).animate({top:"830px", left:"575"}, "normal");
				
				// create attack button
				var attackButton = ("<section id='attackButton'><button class='btn btn-warning btn-lg attack'>Attack</button></section>");
				
				// create player stat box
				playerAtt = eval(playerFighter + "[0]");
				playerDef = eval(playerFighter + "[1]");
				playerHP = eval(playerFighter + "[2]");
				playerStats = ("<section id='playerBox'><h1>Player</h1><h1>Attack: " + playerAtt + "</h1><h1>Defence: " + playerDef + "</h1><h1>Health: " + playerHP + "</h1></section>");
				
				// create opponent stat box
				opponentAtt = eval(opponentFighter + "[0]");
				opponentDef = eval(opponentFighter + "[1]");
				opponentHP = eval(opponentFighter + "[2]");
				opponentStats = ("<section id='opponentBox'><h1>Opponent</h1><h1>Attack: " + opponentAtt + "</h1><h1>Defence: " + opponentDef + "</h1><h1>Health: " + opponentHP + "</h1></section>");
				
				// append attackButton & stat boxes to page
				mainBox.append(attackButton);
				mainBox.append(playerStats);
				mainBox.append(opponentStats);
				
				
				opponent = true;
			}

		
		
			$('.attack').on('click', function() {
				
				//set loop for no damage rounds
				var roundNull = true;
				while(roundNull == true){
			
				// player roles attack and defence
				var attP = Math.ceil(Math.random() * playerAtt);
				var defP = Math.ceil(Math.random() * playerDef);
				// opponent roles attack and defence
				var attO = Math.ceil(Math.random() * opponentAtt);
				var defO = Math.ceil(Math.random() * opponentDef);
			
				//player attack outcome
				var roundP = attP - defO;

				//check if defence overcomes attack
				if (roundP < 0){
					roundP = 0;
				}			

				//opponent attack outcome
				var roundO = attO - defP;

				//check if defence overcomes attack
				if (roundO < 0){
					roundO = 0;
				}
				
				//clear loop is damage is done
				if (roundP != 0 || roundO != 0)
				{roundNull = false;}
				}
				
				//update opponent health
				opponentHP = opponentHP - roundP;
			
				//update player health
				playerHP = playerHP - roundO;
				


				//update stat boxes
				playerStats = ("<h1>Player</h1><h1>Attacked for: " + attP + "</h1><h1>Defended for: " + defP + "</h1><h3>lost " + roundO+ "</h3><h1>Health: " + playerHP + "</h1></section>");
				opponentStats = ("<h1>Opponent</h1></h1><h1>Defended for: " + defO + "<h1>Attacked for: " + attO + "</h1><h3>lost " + roundP+ "</h3><h1>Health: " + opponentHP + "</h1></section>");
			
				// update health and show roles
				var playerBox = $("#playerBox");
				var opponentBox =  $("#opponentBox");
				playerBox.html(playerStats);
				opponentBox.html(opponentStats);
				
				// check for loss
				if (playerHP <= 0){
					
					$("#attackButton").remove();

					alert("You have lost.")
					var again = confirm("Would you like to play again?");
					if (again == true){location.reload(true);}
				}
				// check for win
				else if (opponentHP <= 0){
					
					winCount = winCount + 1;
					
					// check if final win
					if (winCount == 5){
						alert("You have won the Melee Arena! All hail the Grand Champion!")
						var again = confirm("Would you like to play again?");
						if (again == true){location.reload(true);}
						$("#attackButton").remove();
					}
					
					else{alert("You won this round chose another opponent.")
					
					// clear elements grenerated for new opponent
					$("#attackButton").remove();
					$("#playerBox").remove();
					$("#opponentBox").remove();
					
					
					// remove dead opponents body
					$("." + opponentFighter).remove();
					
					// reset player to max health
					playerHP = eval(playerFighter + "[2]");
					opponent = false;
					}
				}
			
			});
		});