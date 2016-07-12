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
				var mainBox = $(".mainBox");
				mainBox.append(attackButton);
				mainBox.append(playerStats);
				mainBox.append(opponentStats);
				
				
				opponent = true;
			}

		
		
			$('.attack').on('click', function() {
			
				// player roles attack and defence
				var attP = Math.ceil(Math.random() * playerAtt);
				var defP = Math.ceil(Math.random() * playerDef);
				// opponent roles attack and defence
				var attO = Math.ceil(Math.random() * opponentAtt);
				var defO = Math.ceil(Math.random() * opponentDef);
			
				//player attack outcome
				var battleP = attP - defO;

				//check if defence overcomes attack
				if (battleP < 0){
					battleP = 0;
				}
			
				//update opponent health
				opponentHP = opponentHP - battleP;

				//opponent attack outcome
				var battleO = attO - defP;

				//check if defence overcomes attack
				if (battleO < 0){
					battleO = 0;
				}
			
				//update player health
				playerHP = playerHP - battleO;

				//update stat boxes
				playerStats = ("<h1>Player</h1><h1>Attacked for: " + attP + "</h1><h1>Defended for: " + defP + "</h1><h3>lost " + battleO+ "</h3><h1>Health: " + playerHP + "</h1></section>");
				opponentStats = ("<h1>Opponent</h1></h1><h1>Defended for: " + defO + "<h1>Attacked for: " + attO + "</h1><h3>lost " + battleP+ "</h3><h1>Health: " + opponentHP + "</h1></section>");
			
			
				// update health and show roles
				var playerBox = $("#playerBox");
				var opponentBox =  $("#opponentBox");
				playerBox.html(playerStats);
				opponentBox.html(opponentStats);
			
			});
		});