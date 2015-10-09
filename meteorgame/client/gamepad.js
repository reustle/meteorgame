Template.gamepad.onCreated(function(){
	
	// New gamepad doc
	var gamepadId = Gamepad.insert({
		createdOn: new Date(),
		color: 'some-color',
		btnA: false,
		btnB: false,
		btnStart: false,
		btnSelect: false,
		dpad: null
	});
	
	Session.set('gamepadId', gamepadId);
	
	// Remove the gamepad when they exit
	window.onbeforeunload = function(){
		Gamepad.remove(Session.get('gamepadId'));
	}
	
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
		
		// Run the query
		Gamepad.update({
			_id: Session.get('gamepadId')
		},{
			$set: setFields
		});
		
	},
	
	'touchend a, mouseup a': function(e){
		e.preventDefault();
		
		var btn = $(e.target).attr('data-btn');
		var setFields = {};
		
		// If it is a dpad button
		if(_.indexOf(['up','down','left','right'], btn) > -1){
			
			// If we release a dpad button, and the
			// db value is the same value (ie UP), NULL it. Otherwise
			// leave it alone incase it was already set by the
			// next dpad press (left to up immediately)
			
			var currentDpad = Gamepad.findOne(Session.get('gamepadId')).dpad;
			if(currentDpad == btn){
				setFields['dpad'] = null;
			}
			
		}else{
			setFields[btn] = false;
			
		}
		
		// Run the query
		Gamepad.update({
			_id: Session.get('gamepadId')
		},{
			$set: setFields
		});
		
	}
	
});

Template.gamepad.helpers({
	gamepad : function(){
		return Gamepad.findOne(Session.get('gamepadId'));
	}
});

