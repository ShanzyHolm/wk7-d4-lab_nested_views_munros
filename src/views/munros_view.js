const PubSub = require('../helpers/pub_sub.js');

const MunroView = function(container, munro) {
  this.munrosContainer = container;
  this.munro = munro;
};

MunroView.prototype.render = function () {
  const munroContainer = document.createElement('div');
  munroContainer.classList.add('munro');

  const name = this.createMunroHeading();
  munroContainer.appendChild(name);

  const munroData = this.createMunroData();
  munroContainer.appendChild(munroData);

  this.munrosContainer.appendChild(munroContainer);
};

MunroView.prototype.createMunroHeading = function () {
  const name = document.createElement('h3');
  name.classList.add('munro-name');
  // if(!this.munro.name){
  //   name.textContent = "Random";
  // } else {
    name.textContent = this.munro.name;
  // }
  return name;
};

MunroView.prototype.createMunroData = function () {
  const munroData = document.createElement('ul');
  munroData.classList.add('munros');
  this.populateList(munroData);
  return munroData;
};

MunroView.prototype.populateList = function(data, list) {
  data.forEach((data) => {
    const listItemHeight = document.createElement('li');
    const listItemMeaning = document.createElement('li');
    listItemMeaning.textContent = data.meaning,
    listItemHeight.textContent = data.height;
    list.appendChild(listItemMeaning);
    list.appendChild(listItemHeight);

  });
};


// MunroView.prototype.bindEvents = function () {
//   PubSub.subscribe("")
// };



module.exports = MunroView;
