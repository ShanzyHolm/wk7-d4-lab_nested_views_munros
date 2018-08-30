const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Munros = function() {
  // this.url = url;
  this.munros = [];
}

Munros.prototype.getData = function() {

  const requestHelper = new RequestHelper('https://munroapi.herokuapp.com/api/munros');
  requestHelper.get((data) => {
    // console.log("get data");
    console.log("data", data);
    this.handleDataReady(data);
    PubSub.publish('Munros:munros-data-ready', this.munros);
  });
};
//
Munros.prototype.handleDataReady = function (munros) {
  const munrosNames = this.getMunrosNames(munros);
  this.modelMunros(munros, munrosNames);
};
//
Munros.prototype.getMunrosNames = function (munro) {
  return munro
    .map(munro => munro.name)
    .filter((name, index) => name.indexOf(name) === index);
      // console.log("Ben Nevis");
};

Munros.prototype.modelMunros = function (munro, munroNames) {
  this.munros = munroNames.map((munroName) => {
    return {
      munro_name: munroName,
      munro: this.munroByMunros(munro, munroName)
    };
  });
};

Munros.prototype.munroByMunros = function (munro, munro_data) {
  return munro.filter(munro=> munro.name === munro_data);
};

module.exports = Munros;
