(function() {
  const _$ = {};

  CLASSES = {
    areaLeft: 'area-side--left',
    areaRight: 'area-side--right',
    deductLeft: 'deduct--left',
    deductRight: 'deduct--right',
    scoreLeft: 'score--left',
    scoreRight: 'score--right',
    reset: 'reset',
  };

  VALUES = {
    score: `score`
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
  }

  function _updateScore(scoreLeft, scoreRight) {
    _$.scoreLeft.innerText = typeof scoreLeft !== "undefined" ? scoreLeft : _$.areaLeft.dataset[VALUES.score];
    _$.scoreRight.innerText = typeof scoreRight !== "undefined" ? scoreRight : _$.areaRight.dataset[VALUES.score];
  }

  function _onClickPlus(event) {
    const score = parseInt(event.target.dataset[VALUES.score]) + 1;

    event.target.dataset[VALUES.score] = score;
    _updateScore();
  }

  function _onClickMinus(event) {
    let score;
    const isLeft = event.target.classList.contains(CLASSES.deductLeft);

    if (isLeft) {
      score = parseInt(_$.areaLeft.dataset[VALUES.score]);
    } else {
      score = parseInt(_$.areaRight.dataset[VALUES.score]);
    }

    score = score - 1;

    if (score >= 0) {
      if (isLeft) {
        _$.areaLeft.dataset[VALUES.score] = score;
      } else {
        _$.areaRight.dataset[VALUES.score] = score;
      }
      _updateScore();
    }
  }

  function _onClickReset() {
    _updateScore(0, 0);
  }

  function _addEventListeners() {
    _$.areaLeft.addEventListener(`click`, _onClickPlus);
    _$.areaRight.addEventListener(`click`, _onClickPlus);
    _$.deductLeft.addEventListener(`click`, _onClickMinus);
    _$.deductRight.addEventListener(`click`, _onClickMinus);
    _$.reset.addEventListener(`click`, _onClickReset);
  }

  function _init() {
    _setElements();
    _addEventListeners();
    _updateScore();
  }

  _init();
}());