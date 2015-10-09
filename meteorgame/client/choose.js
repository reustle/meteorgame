Template.main.helpers({
  role_picked: function() {
    return !!Session.get("role");
  },
  is_gamepad: function() {
    return Session.get("role") == "gamepad";
  }
});

Template.main.events({
  "click .button": function(e) {
    Session.set("role", e.target.id.replace("-button", ""));
    console.log(Session.get("role"));
  },
  "click .vertical-align": function(e) {
    Session.set("role", e.target.parentNode.id.replace("-button", ""));
    console.log(Session.get("role"));
  }
});

