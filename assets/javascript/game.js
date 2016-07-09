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
	var playerFighter = [];
	var opponentFighter = [];
	
	
	
	//Click section to select fighter
	$('.fighter').on('click', function() {
		
			//save which fighter is picked
			var fighter = ($(this).attr('data-tag'));
		
			// if player fighter not picked set pick to be player fighter
			if (player == false){
				
				playerFighter = fighter;
				
				//set playerFighter location
				$("." + fighter).animate({top:"+=500px"}, "normal");
				
				player = true;
			}
			// if player fighter is not picked and there is no opponent set to be opponent
			else if (opponent == false){
				
				opponentFighter = fighter;
				
				//set opponentFighter location
				$("." + fighter).animate({top:"+=700px"}, "normal");
				
				opponent = true;
			}

		});