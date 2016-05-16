var rules = module.exports = {};

var rulesDefinition = {
	rock: {beats: ['scissors']},
	paper: {beats: ['rock']},
	scissors: {beats: ['paper']}
};

rules.runRules = function(optA, optB) {
	if (rulesDefinition[optA].beats.indexOf(optB) > -1) {
		return 1;
	} else if (rulesDefinition[optB].beats.indexOf(optA) > -1) {
		return -1;
	}
	return 0;
};