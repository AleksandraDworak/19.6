'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch() {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

    _this.running = false;
    _this.state = {

      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };

    _this.print(_this.state.minutes + _this.state.seconds + _this.state.miliseconds);

    _this.start = _this.start.bind(_this);
    _this.restart = _this.restart.bind(_this);
    _this.stop = _this.stop.bind(_this);

    return _this;
  }

  _createClass(Stopwatch, [{
    key: 'reset',
    value: function reset() {
      this.setState(this.state = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      });
    }
  }, {
    key: 'print',
    value: function print() {

      return this.format(this.state);
    }
  }, {
    key: 'format',
    value: function format(state) {

      return pad0(state.minutes) + ':' + pad0(state.seconds) + ':' + pad0(Math.floor(state.miliseconds));
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      console.log(this.state);
      if (!this.running) {
        this.running = true;
        this.watch = setInterval(function () {
          return _this2.step();
        }, 10);
      }
    }
  }, {
    key: 'step',
    value: function step() {
      if (!this.running) return;
      this.calculate();
      this.setState(this.state = {
        minutes: this.state.minutes,
        seconds: this.state.seconds,
        miliseconds: this.state.miliseconds
      });
      this.print();
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      this.state.miliseconds += 1;
      if (this.state.miliseconds >= 100) {
        this.state.seconds += 1;
        this.state.miliseconds = 0;
      }
      if (this.state.seconds >= 60) {
        this.state.minutes += 1;
        this.state.seconds = 0;
      }
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.reset();
      this.print();
    }
  }, {
    key: 'stop',
    value: function stop() {

      this.running = false;
      clearInterval(this.watch);
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        null,
        React.createElement(
          'nav',
          { className: 'nav' },
          React.createElement(
            'button',
            { onClick: this.start },
            'Start'
          ),
          React.createElement(
            'button',
            { onClick: this.stop },
            'Stop'
          ),
          React.createElement(
            'button',
            { onClick: this.restart },
            'Reset'
          )
        ),
        React.createElement(
          'div',
          null,
          this.print()
        ),
        React.createElement('ul', { className: 'results' })
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
