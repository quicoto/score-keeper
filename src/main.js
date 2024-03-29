const _ = {
  warnings: 0,
  faults: 0,
};
const _$ = {};
const CLASSES = {
  areaLeft: 'area-side--left',
  areaRight: 'area-side--right',
  deductLeft: 'deduct--left',
  deductRight: 'deduct--right',
  scoreLeft: 'score--left',
  scoreRight: 'score--right',
  reset: 'reset',
  totalValue: 'total-value',
};
const VALUES = {
  score: 'score',
  initialScore: 100,
  deductions: {
    warning: 0.3,
    fault: 0.5,
  },
};

function _setElements() {
  _$.app = document.querySelector('#app');
  _$.areaLeft = _$.app.querySelector(`.${CLASSES.areaLeft}`);
  _$.areaRight = _$.app.querySelector(`.${CLASSES.areaRight}`);
  _$.deductLeft = _$.app.querySelector(`.${CLASSES.deductLeft}`);
  _$.deductRight = _$.app.querySelector(`.${CLASSES.deductRight}`);
  _$.scoreLeft = _$.app.querySelector(`.${CLASSES.scoreLeft}`);
  _$.scoreRight = _$.app.querySelector(`.${CLASSES.scoreRight}`);
  _$.reset = _$.app.querySelector(`.${CLASSES.reset}`);
  _$.totalValue = _$.app.querySelector(`.${CLASSES.totalValue}`);
}

function _getTotalScore() {
  const warnings = _.warnings * VALUES.deductions.warning;
  const faults = _.faults * VALUES.deductions.fault;

  return parseFloat(VALUES.initialScore - warnings - faults).toFixed(1);
}

function _updateScore() {
  _$.scoreLeft.innerText = _.warnings;
  _$.scoreRight.innerText = _.faults;
  _$.totalValue.innerText = _getTotalScore();
}

function _onClickPlus(event) {
  const { classList } = event.target;

  if (classList.contains(CLASSES.areaRight)) {
    _.faults += 1;
  }

  if (classList.contains(CLASSES.areaLeft)) {
    _.warnings += 1;
  }

  _updateScore();
}

function _onClickMinus(event) {
  const { classList } = event.target;

  if (classList.contains(CLASSES.deductRight)) {
    _.faults -= 1;

    if (_.faults < 0) {
      _.faults = 0;
    }
  }

  if (classList.contains(CLASSES.deductLeft)) {
    _.warnings -= 1;

    if (_.warnings < 0) {
      _.warnings = 0;
    }
  }

  _updateScore();
}

function _onClickReset() {
  _.faults = 0;
  _.warnings = 0;

  _updateScore();
}

function _addEventListeners() {
  _$.areaLeft.addEventListener('click', _onClickPlus);
  _$.areaRight.addEventListener('click', _onClickPlus);
  _$.deductLeft.addEventListener('click', _onClickMinus);
  _$.deductRight.addEventListener('click', _onClickMinus);
  _$.reset.addEventListener('click', _onClickReset);
}

function _init() {
  _setElements();
  _addEventListeners();
  _updateScore();
}

_init();
