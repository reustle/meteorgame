Template.gamepad.onCreated(function(){
	//
});

Template.gamepad.events({
	
	'touchstart a, mousedown a': function(e){
		e.preventDefault();
		
		var btn = $(e.target).attr('data-btn');
		var setFields = {};
		
		if(_.indexOf(['up','down','left','right'], btn) > -1){
			// If it is a dpad button
			setFields['dpad'] = btn;
			
		}else{
			setFields[btn] = true;
			
		}
		
		// TODO Update document
		
		console.log(setFields);
		
	},
	
	'touchend a, mouseup a': function(e){
		e.preventDefault();
		
		var btn = $(e.target).attr('data-btn');
		var setFields = {};
		
		// If it is a dpad button
		if(_.indexOf(['up','down','left','right'], btn) > -1){
			
			// If we release a dpad button, and the
			// db value is the same value, NULL it. Otherwise
			// leave it alone incase it was already set by the
			// next dpad press (left to up immediately)
			
			// TODO when we have a db
			setFields['dpad'] = null;
			
		}else{
			setFields[btn] = false;
			
		}
		
		// TODO Update document
		
	}
	
});

