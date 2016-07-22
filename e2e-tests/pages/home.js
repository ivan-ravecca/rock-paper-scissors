'use strict';

module.exports = function home() {
    return {
        url: '/#/entry',
        getFieldByName: function (name) {
            var mapping = {
                'userA': 'input[ng-model="players.playerA.name"]',
                'userB': 'input[ng-model="players.playerB.name"]'
            };

            return mapping[name];
        },
        getButtonByName: function (buttonName) {
            var mapping = {
                'start': 'button[ng-click="startGame()"]'
            };

            return mapping[buttonName];
        }
    };
}();