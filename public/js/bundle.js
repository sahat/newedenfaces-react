(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _utilsWebAPIUtils = require('../utils/WebAPIUtils');

var _utilsWebAPIUtils2 = _interopRequireDefault(_utilsWebAPIUtils);

var AddCharacterActions = (function () {
  function AddCharacterActions() {
    _classCallCheck(this, AddCharacterActions);

    this.generateActions('addCharacterSuccess', 'addCharacterFail', 'updateName', 'updateGender', 'invalidName', 'invalidGender');
  }

  _createClass(AddCharacterActions, [{
    key: 'addCharacter',
    value: function addCharacter(name, gender) {
      _utilsWebAPIUtils2['default'].addCharacter(name, gender).done((function (data) {
        this.actions.addCharacterSuccess(data.message);
      }).bind(this)).fail((function (jqXHR) {
        this.actions.addCharacterFail(jqXHR.responseJSON.message);
      }).bind(this));
    }
  }]);

  return AddCharacterActions;
})();

exports['default'] = _alt2['default'].createActions(AddCharacterActions);
module.exports = exports['default'];

},{"../alt":7,"../utils/WebAPIUtils":24}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var CharacterActions = (function () {
  function CharacterActions() {
    _classCallCheck(this, CharacterActions);

    this.generateActions('updateEmail', 'reportSuccess', 'reportFail', 'subscribeSuccess', 'subscribeFail', 'getCharacterSuccess', 'getCharacterFail');
  }

  _createClass(CharacterActions, [{
    key: 'getCharacter',
    value: function getCharacter(payload) {
      var _this = this;

      var characterId = payload.router.getCurrentParams().id;
      var path = payload.router.getCurrentPath();

      $.ajax({ url: '/api/characters/' + characterId }).done(function (data) {
        _this.actions.getCharacterSuccess({ data: data, path: path });
      }).fail(function (jqXhr) {
        _this.actions.getCharacterFail(jqXhr);
      });
    }
  }, {
    key: 'report',
    value: function report(characterId) {
      var _this2 = this;

      $.ajax({
        type: 'POST',
        url: '/api/report',
        data: { characterId: characterId }
      }).done(function () {
        _this2.actions.reportSuccess();
      }).fail(function (jqXhr) {
        _this2.actions.reportFail(jqXhr);
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(payload) {
      var _this3 = this;

      $.ajax({
        type: 'POST',
        url: '/api/subscribe',
        data: { email: payload.email, characterId: payload.characterId }
      }).done(function () {
        _this3.actions.subscribeSuccess();
      }).fail(function (jqXhr) {
        _this3.actions.subscribeFail(jqXhr);
      });
    }
  }]);

  return CharacterActions;
})();

exports['default'] = _alt2['default'].createActions(CharacterActions);
module.exports = exports['default'];

},{"../alt":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var CharacterListActions = (function () {
  function CharacterListActions() {
    _classCallCheck(this, CharacterListActions);

    this.generateActions('getCharactersSuccess', 'getCharactersFail');
  }

  _createClass(CharacterListActions, [{
    key: 'getCharacters',
    value: function getCharacters(payload) {
      var _this = this;

      var options = {
        race: payload.params.race,
        bloodline: payload.params.bloodline
      };

      if (payload.path.includes('female')) {
        options.gender = 'female';
      }

      if (payload.path.includes('male')) {
        options.gender = 'male';
      }

      var ajaxOptions = payload.path.includes('shame') ? { url: '/api/characters/shame' } : { url: '/api/characters/top', data: options };

      $.ajax(ajaxOptions).done(function (data) {
        _this.actions.getCharactersSuccess({ data: data, path: payload.path });
      }).fail(function (jqXhr) {
        _this.actions.getCharactersFail(jqXhr);
      });
    }
  }]);

  return CharacterListActions;
})();

exports['default'] = _alt2['default'].createActions(CharacterListActions);
module.exports = exports['default'];

},{"../alt":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var HomeActions = (function () {
  function HomeActions() {
    _classCallCheck(this, HomeActions);

    this.generateActions('getTwoCharactersSuccess', 'getTwoCharactersFail', 'voteFail');
  }

  _createClass(HomeActions, [{
    key: 'getTwoCharacters',
    value: function getTwoCharacters() {
      var _this = this;

      $.ajax({ url: '/api/characters' }).done(function (data) {
        _this.actions.getTwoCharactersSuccess(data);
      }).fail(function (jqXhr) {
        _this.actions.getTwoCharactersFail(jqXhr);
      });
    }
  }, {
    key: 'vote',
    value: function vote(winner, loser) {
      var _this2 = this;

      $.ajax({
        type: 'PUT',
        url: '/api/characters',
        data: { winner: winner.characterId, loser: loser.characterId }
      }).done(function () {
        _this2.actions.getTwoCharacters();
      }).fail(function (jqXhr) {
        _this2.actions.voteFail(jqXhr);
      });
    }
  }]);

  return HomeActions;
})();

exports['default'] = _alt2['default'].createActions(HomeActions);
module.exports = exports['default'];

},{"../alt":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var NavbarActions = (function () {
  function NavbarActions() {
    _classCallCheck(this, NavbarActions);

    this.generateActions('updateOnlineUsers', 'updateAjaxAnimation', 'updateSearchQuery', 'getCharacterCountSuccess', 'getCharacterCountFail');
  }

  _createClass(NavbarActions, [{
    key: 'findCharacter',
    value: function findCharacter(payload) {
      $.ajax({
        url: '/api/characters/search',
        data: { name: payload.searchQuery }
      }).done(function (data) {
        payload.router.transitionTo('/characters/' + data.characterId);
      }).fail(function () {
        payload.searchFormNode.classList.add('shake');
        setTimeout(function () {
          payload.searchFormNode.classList.remove('shake');
        }, 1000);
      });
    }
  }, {
    key: 'getCharacterCount',
    value: function getCharacterCount() {
      var _this = this;

      $.ajax({ url: '/api/characters/count' }).done(function (data) {
        _this.actions.getCharacterCountSuccess(data);
      }).fail(function (jqXhr) {
        _this.actions.getCharacterCountFail(jqXhr);
      });
    }
  }]);

  return NavbarActions;
})();

exports['default'] = _alt2['default'].createActions(NavbarActions);
module.exports = exports['default'];

},{"../alt":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var StatsActions = (function () {
  function StatsActions() {
    _classCallCheck(this, StatsActions);

    this.generateActions('getStatsSuccess', 'getStatsFail');
  }

  _createClass(StatsActions, [{
    key: 'getStats',
    value: function getStats() {
      var _this = this;

      $.ajax({ url: '/api/stats' }).done(function (data) {
        _this.actions.getStatsSuccess(data);
      }).fail(function (jqXhr) {
        _this.actions.getStatsFail(jqXhr);
      });
    }
  }]);

  return StatsActions;
})();

exports['default'] = _alt2['default'].createActions(StatsActions);
module.exports = exports['default'];

},{"../alt":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

exports['default'] = new _alt2['default']();
module.exports = exports['default'];

},{"alt":26}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var NotFound = (function (_React$Component) {
  function NotFound() {
    _classCallCheck(this, NotFound);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(NotFound, _React$Component);

  _createClass(NotFound, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'h1',
          null,
          'Page Not Found'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'Sorry, but the page you were trying to view does not exist.'
        )
      );
    }
  }]);

  return NotFound;
})(_react2['default'].Component);

exports['default'] = NotFound;
module.exports = exports['default'];

},{"react":"react"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storesAddCharacterStore = require('../stores/AddCharacterStore');

var _storesAddCharacterStore2 = _interopRequireDefault(_storesAddCharacterStore);

var _actionsAddCharacterActions = require('../actions/AddCharacterActions');

var _actionsAddCharacterActions2 = _interopRequireDefault(_actionsAddCharacterActions);

var AddCharacter = (function (_React$Component) {
  function AddCharacter(props) {
    _classCallCheck(this, AddCharacter);

    _get(Object.getPrototypeOf(AddCharacter.prototype), 'constructor', this).call(this, props);
    this.state = _storesAddCharacterStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  _inherits(AddCharacter, _React$Component);

  _createClass(AddCharacter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesAddCharacterStore2['default'].listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesAddCharacterStore2['default'].unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      this.setState(_storesAddCharacterStore2['default'].getState());
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      var name = this.state.name.trim();
      var gender = this.state.gender;

      if (!name) {
        _actionsAddCharacterActions2['default'].invalidName();
        this.refs.nameTextField.getDOMNode().focus();
      }

      if (!gender) {
        _actionsAddCharacterActions2['default'].invalidGender();
      }

      if (name && gender) {
        _actionsAddCharacterActions2['default'].addCharacter(name, gender);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'div',
          { className: 'row flipInX animated' },
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-8' },
            _react2['default'].createElement(
              'div',
              { className: 'panel panel-default' },
              _react2['default'].createElement(
                'div',
                { className: 'panel-heading' },
                'Add Character'
              ),
              _react2['default'].createElement(
                'div',
                { className: 'panel-body' },
                _react2['default'].createElement(
                  'form',
                  { onSubmit: this.handleSubmit.bind(this) },
                  _react2['default'].createElement(
                    'div',
                    { className: 'form-group ' + this.state.nameValidationState },
                    _react2['default'].createElement(
                      'label',
                      { className: 'control-label' },
                      'Character Name'
                    ),
                    _react2['default'].createElement('input', { type: 'text', className: 'form-control', ref: 'nameTextField', value: this.state.name,
                      onChange: _actionsAddCharacterActions2['default'].updateName, autoFocus: true }),
                    _react2['default'].createElement(
                      'span',
                      { className: 'help-block' },
                      this.state.helpBlock
                    )
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: 'form-group ' + this.state.genderValidationState },
                    _react2['default'].createElement(
                      'div',
                      { className: 'radio radio-inline' },
                      _react2['default'].createElement('input', { type: 'radio', name: 'gender', id: 'female', value: 'Female', checked: this.state.gender === 'Female',
                        onChange: _actionsAddCharacterActions2['default'].updateGender }),
                      _react2['default'].createElement(
                        'label',
                        { htmlFor: 'female' },
                        'Female'
                      )
                    ),
                    _react2['default'].createElement(
                      'div',
                      { className: 'radio radio-inline' },
                      _react2['default'].createElement('input', { type: 'radio', name: 'gender', id: 'male', value: 'Male', checked: this.state.gender === 'male',
                        onChange: _actionsAddCharacterActions2['default'].updateGender }),
                      _react2['default'].createElement(
                        'label',
                        { htmlFor: 'male' },
                        'Male'
                      )
                    )
                  ),
                  _react2['default'].createElement(
                    'button',
                    { type: 'submit', className: 'btn btn-primary' },
                    'Submit'
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return AddCharacter;
})(_react2['default'].Component);

exports['default'] = AddCharacter;
module.exports = exports['default'];

},{"../actions/AddCharacterActions":1,"../stores/AddCharacterStore":18,"react":"react"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _storesCharacterStore = require('../stores/CharacterStore');

var _storesCharacterStore2 = _interopRequireDefault(_storesCharacterStore);

var App = (function (_React$Component) {
  function App() {
    _classCallCheck(this, App);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(App, _React$Component);

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'html',
        null,
        _react2['default'].createElement(
          'head',
          null,
          _react2['default'].createElement('meta', { charSet: 'utf-8' }),
          _react2['default'].createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
          _react2['default'].createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
          _react2['default'].createElement(
            'title',
            null,
            'New Eden Faces'
          ),
          _react2['default'].createElement('link', { rel: 'shortcut icon', href: '/favicon.png' }),
          _react2['default'].createElement('link', { rel: 'stylesheet', href: 'http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,900' }),
          _react2['default'].createElement('link', { rel: 'stylesheet', href: '/css/main.css' })
        ),
        _react2['default'].createElement(
          'body',
          null,
          _react2['default'].createElement(_Navbar2['default'], null),
          _react2['default'].createElement(_reactRouter.RouteHandler, null),
          _react2['default'].createElement(_Footer2['default'], null),
          _react2['default'].createElement('script', { src: '/socket.io/socket.io.js' }),
          _react2['default'].createElement('script', { src: '/js/vendor.js' }),
          _react2['default'].createElement('script', { src: '/js/bundle-vendor.js' }),
          _react2['default'].createElement('script', { src: '/js/bundle.js' })
        )
      );
    }
  }]);

  return App;
})(_react2['default'].Component);

exports['default'] = App;
module.exports = exports['default'];

},{"../stores/CharacterStore":20,"./Footer":13,"./Navbar":15,"react":"react","react-router":"react-router"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storesCharacterStore = require('../stores/CharacterStore');

var _storesCharacterStore2 = _interopRequireDefault(_storesCharacterStore);

var _actionsCharacterActions = require('../actions/CharacterActions');

var _actionsCharacterActions2 = _interopRequireDefault(_actionsCharacterActions);

var Character = (function (_React$Component) {
  function Character(props) {
    _classCallCheck(this, Character);

    _get(Object.getPrototypeOf(Character.prototype), 'constructor', this).call(this, props);
    this.state = _storesCharacterStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  _inherits(Character, _React$Component);

  _createClass(Character, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesCharacterStore2['default'].listen(this.onChange);
      _actionsCharacterActions2['default'].getCharacter({ router: this.context.router });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesCharacterStore2['default'].unlisten(this.onChange);
      $(document.body).removeClass();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.prevPath !== this.context.router.getCurrentPath()) {
        _actionsCharacterActions2['default'].getCharacter({ router: this.context.router });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      this.setState(_storesCharacterStore2['default'].getState());
    }
  }, {
    key: 'handleSubscribeSubmit',
    value: function handleSubscribeSubmit(event) {
      event.preventDefault();

      var email = this.state.email.trim();
      if (email) {
        _actionsCharacterActions2['default'].subscribe({ email: email, characterId: this.state.characterId });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var subscribeField = this.state.isSubscribed ? _react2['default'].createElement(
        'div',
        { className: 'text-center animated fadeIn' },
        'Thank you for subscribing!'
      ) : _react2['default'].createElement(
        'div',
        { className: 'row' },
        _react2['default'].createElement(
          'div',
          { className: 'col-sm-6 col-sm-offset-3' },
          _react2['default'].createElement(
            'form',
            { onSubmit: this.handleSubscribeSubmit.bind(this) },
            _react2['default'].createElement(
              'div',
              { className: 'input-group' },
              _react2['default'].createElement('input', { type: 'text', className: 'form-control', placeholder: 'Email', onChange: _actionsCharacterActions2['default'].updateEmail }),
              _react2['default'].createElement(
                'span',
                { className: 'input-group-btn' },
                _react2['default'].createElement(
                  'button',
                  { className: 'btn btn-default', onClick: this.handleSubscribeSubmit.bind(this) },
                  'Subscribe'
                )
              )
            )
          )
        )
      );

      return _react2['default'].createElement(
        'div',
        { ref: 'container', className: 'container animated fadeIn' },
        _react2['default'].createElement(
          'div',
          { className: 'profile-img' },
          _react2['default'].createElement(
            'a',
            { ref: 'avatar', className: 'magnific-popup',
              href: 'https://image.eveonline.com/Character/' + this.state.characterId + '_1024.jpg' },
            _react2['default'].createElement('img', { src: 'https://image.eveonline.com/Character/' + this.state.characterId + '_256.jpg' })
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'profile-info clearfix' },
          _react2['default'].createElement(
            'h2',
            null,
            _react2['default'].createElement(
              'strong',
              null,
              this.state.name
            )
          ),
          _react2['default'].createElement(
            'h4',
            { className: 'lead' },
            'Race: ',
            _react2['default'].createElement(
              'strong',
              null,
              this.state.race
            )
          ),
          _react2['default'].createElement(
            'h4',
            { className: 'lead' },
            'Bloodline: ',
            _react2['default'].createElement(
              'strong',
              null,
              this.state.bloodline
            )
          ),
          _react2['default'].createElement(
            'h4',
            { className: 'lead' },
            'Gender: ',
            _react2['default'].createElement(
              'strong',
              null,
              this.state.gender
            )
          ),
          _react2['default'].createElement(
            'button',
            { className: 'btn btn-transparent', onClick: _actionsCharacterActions2['default'].report.bind(this, this.state.characterId),
              disabled: this.state.isReported },
            this.state.isReported ? 'Reported' : 'Report Character'
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'profile-stats clearfix' },
          _react2['default'].createElement(
            'ul',
            null,
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'span',
                { className: 'stats-number' },
                this.state.winLossRatio
              ),
              'Winning Percentage'
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'span',
                { className: 'stats-number' },
                this.state.wins
              ),
              ' Wins'
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'span',
                { className: 'stats-number' },
                this.state.losses
              ),
              ' Losses'
            )
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'row' },
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-12 text-center' },
            _react2['default'].createElement(
              'h4',
              { className: 'lead' },
              ' Subscribe for weekly statistics on ',
              _react2['default'].createElement(
                'strong',
                null,
                this.state.name
              )
            )
          )
        ),
        subscribeField
      );
    }
  }]);

  return Character;
})(_react2['default'].Component);

Character.contextTypes = {
  router: _react2['default'].PropTypes.func.isRequired
};

exports['default'] = Character;
module.exports = exports['default'];

},{"../actions/CharacterActions":2,"../stores/CharacterStore":20,"react":"react"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _underscore = require('underscore');

var _storesCharacterListStore = require('../stores/CharacterListStore');

var _storesCharacterListStore2 = _interopRequireDefault(_storesCharacterListStore);

var _actionsCharacterListActions = require('../actions/CharacterListActions');

var _actionsCharacterListActions2 = _interopRequireDefault(_actionsCharacterListActions);

var CharacterList = (function (_React$Component) {
  function CharacterList(props) {
    _classCallCheck(this, CharacterList);

    _get(Object.getPrototypeOf(CharacterList.prototype), 'constructor', this).call(this, props);
    this.state = _storesCharacterListStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  _inherits(CharacterList, _React$Component);

  _createClass(CharacterList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesCharacterListStore2['default'].listen(this.onChange);
      _actionsCharacterListActions2['default'].getCharacters({
        params: this.context.router.getCurrentParams(),
        path: this.context.router.getCurrentPath()
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesCharacterListStore2['default'].unlisten(this.onChange);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.prevPath !== this.context.router.getCurrentPath()) {
        _actionsCharacterListActions2['default'].getCharacters({
          params: this.context.router.getCurrentParams(),
          path: this.context.router.getCurrentPath()
        });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      this.setState(_storesCharacterListStore2['default'].getState());
    }
  }, {
    key: 'render',
    value: function render() {
      var characterList = this.state.characters.map(function (character, index) {
        return _react2['default'].createElement(
          'div',
          { key: character.characterId, className: 'list-group-item animated fadeIn' },
          _react2['default'].createElement(
            'div',
            { className: 'media' },
            _react2['default'].createElement(
              'span',
              { className: 'position pull-left' },
              index + 1
            ),
            _react2['default'].createElement(
              'div',
              { className: 'pull-left thumb-lg' },
              _react2['default'].createElement(
                _reactRouter.Link,
                { to: '/characters/' + character.characterId },
                _react2['default'].createElement('img', { className: 'media-object', src: 'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg' })
              )
            ),
            _react2['default'].createElement(
              'div',
              { className: 'media-body' },
              _react2['default'].createElement(
                'h4',
                { className: 'media-heading' },
                _react2['default'].createElement(
                  _reactRouter.Link,
                  { to: '/characters/' + character.characterId },
                  character.name
                )
              ),
              _react2['default'].createElement(
                'small',
                null,
                'Race: ',
                _react2['default'].createElement(
                  'strong',
                  null,
                  character.race
                )
              ),
              _react2['default'].createElement('br', null),
              _react2['default'].createElement(
                'small',
                null,
                'Bloodline: ',
                _react2['default'].createElement(
                  'strong',
                  null,
                  character.bloodline
                )
              ),
              _react2['default'].createElement('br', null),
              _react2['default'].createElement(
                'small',
                null,
                'Wins: ',
                _react2['default'].createElement(
                  'strong',
                  null,
                  character.wins
                ),
                ' Losses: ',
                _react2['default'].createElement(
                  'strong',
                  null,
                  character.losses
                )
              )
            )
          )
        );
      });

      return _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'div',
          { className: 'list-group' },
          characterList
        )
      );
    }
  }]);

  return CharacterList;
})(_react2['default'].Component);

CharacterList.contextTypes = {
  router: _react2['default'].PropTypes.func.isRequired
};

exports['default'] = CharacterList;
module.exports = exports['default'];

},{"../actions/CharacterListActions":3,"../stores/CharacterListStore":19,"react":"react","react-router":"react-router","underscore":"underscore"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var Footer = (function (_React$Component) {
  function Footer(props) {
    _classCallCheck(this, Footer);

    _get(Object.getPrototypeOf(Footer.prototype), 'constructor', this).call(this, props);
    this.state = {
      characters: []
    };
  }

  _inherits(Footer, _React$Component);

  _createClass(Footer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $.get('/api/characters/top', (function (data) {
        this.setState({ characters: data.slice(0, 5) });
      }).bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      var leaderboardCharacters = this.state.characters.map(function (character) {
        return _react2['default'].createElement(
          'li',
          { key: character.characterId },
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: '/characters/' + character.characterId },
            _react2['default'].createElement('img', { className: 'thumb-md', src: 'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg' })
          )
        );
      });

      return _react2['default'].createElement(
        'footer',
        null,
        _react2['default'].createElement(
          'div',
          { className: 'container' },
          _react2['default'].createElement(
            'div',
            { className: 'row' },
            _react2['default'].createElement(
              'div',
              { className: 'col-sm-5' },
              _react2['default'].createElement(
                'h3',
                { className: 'lead' },
                _react2['default'].createElement(
                  'strong',
                  null,
                  'Information'
                ),
                ' and ',
                _react2['default'].createElement(
                  'strong',
                  null,
                  'Copyright'
                )
              ),
              _react2['default'].createElement(
                'p',
                null,
                'Powered by ',
                _react2['default'].createElement(
                  'strong',
                  null,
                  'Node.js'
                ),
                ', ',
                _react2['default'].createElement(
                  'strong',
                  null,
                  'MongoDB'
                ),
                ' and ',
                _react2['default'].createElement(
                  'strong',
                  null,
                  'React'
                ),
                ' with Flux architecture and server-side rendering.'
              ),
              _react2['default'].createElement(
                'p',
                null,
                'You may view the ',
                _react2['default'].createElement(
                  'a',
                  { href: 'https://github.com/sahat/newedenfaces-react' },
                  'Source Code'
                ),
                ' behind this project on GitHub.'
              ),
              _react2['default'].createElement(
                'p',
                null,
                '© 2015 Sahat Yalkabov.'
              )
            ),
            _react2['default'].createElement(
              'div',
              { className: 'col-sm-7 hidden-xs' },
              _react2['default'].createElement(
                'h3',
                { className: 'lead' },
                _react2['default'].createElement(
                  'strong',
                  null,
                  'Leaderboard'
                ),
                ' Top 5 Characters'
              ),
              _react2['default'].createElement(
                'ul',
                { className: 'list-inline' },
                leaderboardCharacters
              )
            )
          )
        )
      );
    }
  }]);

  return Footer;
})(_react2['default'].Component);

exports['default'] = Footer;
module.exports = exports['default'];

},{"react":"react","react-router":"react-router"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _storesHomeStore = require('../stores/HomeStore');

var _storesHomeStore2 = _interopRequireDefault(_storesHomeStore);

var _actionsHomeActions = require('../actions/HomeActions');

var _actionsHomeActions2 = _interopRequireDefault(_actionsHomeActions);

var Home = (function (_React$Component) {
  function Home(props) {
    _classCallCheck(this, Home);

    _get(Object.getPrototypeOf(Home.prototype), 'constructor', this).call(this, props);
    this.state = _storesHomeStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  _inherits(Home, _React$Component);

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesHomeStore2['default'].listen(this.onChange);
      _actionsHomeActions2['default'].getTwoCharacters();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesHomeStore2['default'].unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      this.setState(_storesHomeStore2['default'].getState());
    }
  }, {
    key: 'handleClick',
    value: function handleClick(character) {
      var winner = character;
      var loser = this.state.characters[1 - this.state.characters.indexOf(winner)];
      _actionsHomeActions2['default'].vote(winner, loser);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var characterNodes = this.state.characters.map(function (character, index) {
        return _react2['default'].createElement(
          'div',
          { key: character.characterId, className: index === 0 ? 'col-xs-6 col-sm-6 col-md-5 col-md-offset-1' : 'col-xs-6 col-sm-6 col-md-5' },
          _react2['default'].createElement(
            'div',
            { className: 'thumbnail fadeInUp animated' },
            _react2['default'].createElement('img', { onClick: _this.handleClick.bind(_this, character), src: 'http://image.eveonline.com/Character/' + character.characterId + '_512.jpg' }),
            _react2['default'].createElement(
              'div',
              { className: 'caption text-center' },
              _react2['default'].createElement(
                'ul',
                { className: 'list-inline' },
                _react2['default'].createElement(
                  'li',
                  null,
                  _react2['default'].createElement(
                    'strong',
                    null,
                    'Race:'
                  ),
                  ' ',
                  character.race
                ),
                _react2['default'].createElement(
                  'li',
                  null,
                  _react2['default'].createElement(
                    'strong',
                    null,
                    'Bloodline:'
                  ),
                  ' ',
                  character.bloodline
                )
              ),
              _react2['default'].createElement(
                'h4',
                null,
                _react2['default'].createElement(
                  _reactRouter.Link,
                  { to: '/characters/' + character.characterId },
                  _react2['default'].createElement(
                    'strong',
                    null,
                    character.name
                  )
                )
              )
            )
          )
        );
      });

      return _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'h3',
          { className: 'text-center' },
          'Click on the portrait. Select your favorite.'
        ),
        _react2['default'].createElement(
          'div',
          { className: 'row' },
          characterNodes
        )
      );
    }
  }]);

  return Home;
})(_react2['default'].Component);

exports['default'] = Home;
module.exports = exports['default'];

},{"../actions/HomeActions":4,"../stores/HomeStore":21,"react":"react","react-router":"react-router"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _storesNavbarStore = require('../stores/NavbarStore');

var _storesNavbarStore2 = _interopRequireDefault(_storesNavbarStore);

var _actionsNavbarActions = require('../actions/NavbarActions');

var _actionsNavbarActions2 = _interopRequireDefault(_actionsNavbarActions);

var Navbar = (function (_React$Component) {
  function Navbar(props) {
    _classCallCheck(this, Navbar);

    _get(Object.getPrototypeOf(Navbar.prototype), 'constructor', this).call(this, props);
    this.state = _storesNavbarStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  _inherits(Navbar, _React$Component);

  _createClass(Navbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesNavbarStore2['default'].listen(this.onChange);
      _actionsNavbarActions2['default'].getCharacterCount();

      var socket = io.connect();

      socket.on('onlineUsers', function (data) {
        _actionsNavbarActions2['default'].updateOnlineUsers(data);
      });

      $(document).ajaxStart(function () {
        _actionsNavbarActions2['default'].updateAjaxAnimation('fadeIn');
      });

      $(document).ajaxComplete(function () {
        setTimeout(function () {
          _actionsNavbarActions2['default'].updateAjaxAnimation('fadeOut');
        }, 750);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesNavbarStore2['default'].unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      this.setState(_storesNavbarStore2['default'].getState());
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      var searchQuery = this.state.searchQuery.trim();

      if (searchQuery) {
        _actionsNavbarActions2['default'].findCharacter({
          searchQuery: searchQuery,
          searchFormNode: this.refs.searchForm.getDOMNode(),
          router: this.context.router
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'nav',
        { className: 'navbar navbar-default navbar-static-top' },
        _react2['default'].createElement(
          'div',
          { className: 'navbar-header' },
          _react2['default'].createElement(
            'button',
            { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar' },
            _react2['default'].createElement(
              'span',
              { className: 'sr-only' },
              'Toggle navigation'
            ),
            _react2['default'].createElement('span', { className: 'icon-bar' }),
            _react2['default'].createElement('span', { className: 'icon-bar' }),
            _react2['default'].createElement('span', { className: 'icon-bar' })
          ),
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: '/', className: 'navbar-brand' },
            _react2['default'].createElement(
              'span',
              { ref: 'triangles', className: 'triangles animated ' + this.state.ajaxAnimation },
              _react2['default'].createElement('div', { className: 'tri invert' }),
              _react2['default'].createElement('div', { className: 'tri invert' }),
              _react2['default'].createElement('div', { className: 'tri' }),
              _react2['default'].createElement('div', { className: 'tri invert' }),
              _react2['default'].createElement('div', { className: 'tri invert' }),
              _react2['default'].createElement('div', { className: 'tri' }),
              _react2['default'].createElement('div', { className: 'tri invert' }),
              _react2['default'].createElement('div', { className: 'tri' }),
              _react2['default'].createElement('div', { className: 'tri invert' })
            ),
            'NEF',
            _react2['default'].createElement(
              'span',
              { className: 'badge badge-up badge-danger' },
              this.state.onlineUsers
            )
          )
        ),
        _react2['default'].createElement(
          'div',
          { id: 'navbar', className: 'navbar-collapse collapse' },
          _react2['default'].createElement(
            'form',
            { ref: 'searchForm', className: 'navbar-form navbar-left animated', onSubmit: this.handleSubmit.bind(this) },
            _react2['default'].createElement(
              'div',
              { className: 'input-group' },
              _react2['default'].createElement('input', { type: 'text', className: 'form-control', placeholder: this.state.totalCharacters + ' characters', value: this.state.searchQuery, onChange: _actionsNavbarActions2['default'].updateSearchQuery }),
              _react2['default'].createElement(
                'span',
                { className: 'input-group-btn' },
                _react2['default'].createElement(
                  'button',
                  { className: 'btn btn-default', onClick: this.handleSubmit.bind(this) },
                  _react2['default'].createElement('span', { className: 'glyphicon glyphicon-search' })
                )
              )
            )
          ),
          _react2['default'].createElement(
            'ul',
            { className: 'nav navbar-nav' },
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                _reactRouter.Link,
                { to: '/' },
                'Home'
              )
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                _reactRouter.Link,
                { to: '/stats' },
                'Stats'
              )
            ),
            _react2['default'].createElement(
              'li',
              { className: 'dropdown' },
              _react2['default'].createElement(
                'a',
                { href: '#', className: 'dropdown-toggle', 'data-toggle': 'dropdown' },
                'Top 100 ',
                _react2['default'].createElement('span', { className: 'caret' })
              ),
              _react2['default'].createElement(
                'ul',
                { className: 'dropdown-menu' },
                _react2['default'].createElement(
                  'li',
                  null,
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/top' },
                    'Top Overall'
                  )
                ),
                _react2['default'].createElement(
                  'li',
                  { className: 'dropdown-submenu' },
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/top/caldari' },
                    'Caldari'
                  ),
                  _react2['default'].createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/top/caldari/achura' },
                        'Achura'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/top/caldari/civire' },
                        'Civire'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/top/caldari/deteis' },
                        'Deteis'
                      )
                    )
                  )
                ),
                _react2['default'].createElement(
                  'li',
                  { className: 'dropdown-submenu' },
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/top/gallente' },
                    'Gallente'
                  ),
                  _react2['default'].createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/top/gallente/gallente' },
                        'Gallente'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/top/gallente/intaki' },
                        'Intaki'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/top/gallente/jin-mei' },
                        'Jin-Mei'
                      )
                    )
                  )
                ),
                _react2['default'].createElement(
                  'li',
                  { className: 'dropdown-submenu' },
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/top/minmatar' },
                    'Minmatar'
                  ),
                  _react2['default'].createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/top/minmatar/brutor' },
                        'Brutor'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/top/minmatar/sebiestor' },
                        'Sebiestor'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/top/minmatar/vherokior' },
                        'Vherokior'
                      )
                    )
                  )
                ),
                _react2['default'].createElement(
                  'li',
                  { className: 'dropdown-submenu' },
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/top/amarr' },
                    'Amarr'
                  ),
                  _react2['default'].createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/top/amarr/amarr' },
                        'Amarr'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/top/amarr/ni-kunni' },
                        'Ni-Kunni'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/top/amarr/khanid' },
                        'Khanid'
                      )
                    )
                  )
                ),
                _react2['default'].createElement('li', { className: 'divider' }),
                _react2['default'].createElement(
                  'li',
                  null,
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/shame' },
                    'Hall of Shame'
                  )
                )
              )
            ),
            _react2['default'].createElement(
              'li',
              { className: 'dropdown' },
              _react2['default'].createElement(
                'a',
                { href: '#', className: 'dropdown-toggle', 'data-toggle': 'dropdown' },
                'Female ',
                _react2['default'].createElement('span', { className: 'caret' })
              ),
              _react2['default'].createElement(
                'ul',
                { className: 'dropdown-menu' },
                _react2['default'].createElement(
                  'li',
                  null,
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/female' },
                    'All'
                  )
                ),
                _react2['default'].createElement(
                  'li',
                  { className: 'dropdown-submenu' },
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/female/caldari' },
                    'Caldari'
                  ),
                  _react2['default'].createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/female/caldari/achura' },
                        'Achura'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/female/caldari/civire/' },
                        'Civire'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/female/caldari/deteis' },
                        'Deteis'
                      )
                    )
                  )
                ),
                _react2['default'].createElement(
                  'li',
                  { className: 'dropdown-submenu' },
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/female/gallente' },
                    'Gallente'
                  ),
                  _react2['default'].createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/female/gallente/gallente' },
                        'Gallente'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/female/gallente/intaki' },
                        'Intaki'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/female/gallente/jin-mei' },
                        'Jin-Mei'
                      )
                    )
                  )
                ),
                _react2['default'].createElement(
                  'li',
                  { className: 'dropdown-submenu' },
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/female/minmatar' },
                    'Minmatar'
                  ),
                  _react2['default'].createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/female/minmatar/brutor' },
                        'Brutor'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/female/minmatar/sebiestor' },
                        'Sebiestor'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/female/minmatar/vherokior' },
                        'Vherokior'
                      )
                    )
                  )
                ),
                _react2['default'].createElement(
                  'li',
                  { className: 'dropdown-submenu' },
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/female/amarr' },
                    'Amarr'
                  ),
                  _react2['default'].createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/female/amarr/amarr' },
                        'Amarr'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/female/amarr/ni-kunni' },
                        'Ni-Kunni'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/female/amarr/khanid' },
                        'Khanid'
                      )
                    )
                  )
                )
              )
            ),
            _react2['default'].createElement(
              'li',
              { className: 'dropdown' },
              _react2['default'].createElement(
                'a',
                { href: '#', className: 'dropdown-toggle', 'data-toggle': 'dropdown' },
                'Male ',
                _react2['default'].createElement('span', { className: 'caret' })
              ),
              _react2['default'].createElement(
                'ul',
                { className: 'dropdown-menu' },
                _react2['default'].createElement(
                  'li',
                  null,
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/male' },
                    'All'
                  )
                ),
                _react2['default'].createElement(
                  'li',
                  { className: 'dropdown-submenu' },
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/male/caldari' },
                    'Caldari'
                  ),
                  _react2['default'].createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/male/caldari/achura' },
                        'Achura'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/male/caldari/civire' },
                        'Civire'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/male/caldari/deteis' },
                        'Deteis'
                      )
                    )
                  )
                ),
                _react2['default'].createElement(
                  'li',
                  { className: 'dropdown-submenu' },
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/male/gallente' },
                    'Gallente'
                  ),
                  _react2['default'].createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/male/gallente/gallente' },
                        'Gallente'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/male/gallente/intaki' },
                        'Intaki'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/male/gallente/jin-mei' },
                        'Jin-Mei'
                      )
                    )
                  )
                ),
                _react2['default'].createElement(
                  'li',
                  { className: 'dropdown-submenu' },
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/male/minmatar' },
                    'Minmatar'
                  ),
                  _react2['default'].createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/male/minmatar/brutor' },
                        'Brutor'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/male/minmatar/sebiestor' },
                        'Sebiestor'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/male/minmatar/vherokior' },
                        'Vherokior'
                      )
                    )
                  )
                ),
                _react2['default'].createElement(
                  'li',
                  { className: 'dropdown-submenu' },
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: '/male/amarr' },
                    'Amarr'
                  ),
                  _react2['default'].createElement(
                    'ul',
                    { className: 'dropdown-menu' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/male/amarr/amarr' },
                        'Amarr'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/male/amarr/ni-kunni' },
                        'Ni-Kunni'
                      )
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        _reactRouter.Link,
                        { to: '/male/amarr/khanid' },
                        'Khanid'
                      )
                    )
                  )
                )
              )
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                _reactRouter.Link,
                { to: '/add' },
                'Add'
              )
            )
          )
        )
      );
    }
  }]);

  return Navbar;
})(_react2['default'].Component);

Navbar.contextTypes = {
  router: _react2['default'].PropTypes.func.isRequired
};

exports['default'] = Navbar;
module.exports = exports['default'];

},{"../actions/NavbarActions":5,"../stores/NavbarStore":22,"react":"react","react-router":"react-router"}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storesStatsStore = require('../stores/StatsStore');

var _storesStatsStore2 = _interopRequireDefault(_storesStatsStore);

var _actionsStatsActions = require('../actions/StatsActions');

var _actionsStatsActions2 = _interopRequireDefault(_actionsStatsActions);

var Stats = (function (_React$Component) {
  function Stats(props) {
    _classCallCheck(this, Stats);

    _get(Object.getPrototypeOf(Stats.prototype), 'constructor', this).call(this, props);
    this.state = _storesStatsStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  _inherits(Stats, _React$Component);

  _createClass(Stats, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesStatsStore2['default'].listen(this.onChange);
      _actionsStatsActions2['default'].getStats();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesStatsStore2['default'].unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      this.setState(_storesStatsStore2['default'].getState());
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'div',
          { className: 'panel panel-default' },
          _react2['default'].createElement(
            'table',
            { className: 'table table-striped' },
            _react2['default'].createElement(
              'thead',
              null,
              _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'th',
                  { colSpan: '2' },
                  'Stats'
                )
              )
            ),
            _react2['default'].createElement(
              'tbody',
              null,
              _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'td',
                  null,
                  'Leading race in Top 100'
                ),
                _react2['default'].createElement(
                  'td',
                  null,
                  this.state.leadingRace.race,
                  ' with ',
                  this.state.leadingRace.count,
                  ' characters'
                )
              ),
              _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'td',
                  null,
                  'Leading bloodline in Top 100'
                ),
                _react2['default'].createElement(
                  'td',
                  null,
                  this.state.leadingBloodline.bloodline,
                  ' with ',
                  this.state.leadingBloodline.count,
                  ' characters'
                )
              ),
              _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'td',
                  null,
                  'Amarr Characters'
                ),
                _react2['default'].createElement(
                  'td',
                  null,
                  this.state.amarrCount
                )
              ),
              _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'td',
                  null,
                  'Caldari Characters'
                ),
                _react2['default'].createElement(
                  'td',
                  null,
                  this.state.caldariCount
                )
              ),
              _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'td',
                  null,
                  'Gallente Characters'
                ),
                _react2['default'].createElement(
                  'td',
                  null,
                  this.state.gallenteCount
                )
              ),
              _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'td',
                  null,
                  'Minmatar Characters'
                ),
                _react2['default'].createElement(
                  'td',
                  null,
                  this.state.minmatarCount
                )
              ),
              _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'td',
                  null,
                  'Total votes cast'
                ),
                _react2['default'].createElement(
                  'td',
                  null,
                  this.state.totalVotes
                )
              ),
              _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'td',
                  null,
                  'Female characters'
                ),
                _react2['default'].createElement(
                  'td',
                  null,
                  this.state.femaleCount
                )
              ),
              _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'td',
                  null,
                  'Male characters'
                ),
                _react2['default'].createElement(
                  'td',
                  null,
                  this.state.maleCount
                )
              ),
              _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'td',
                  null,
                  'Total number of characters'
                ),
                _react2['default'].createElement(
                  'td',
                  null,
                  this.state.totalCount
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Stats;
})(_react2['default'].Component);

exports['default'] = Stats;
module.exports = exports['default'];

},{"../actions/StatsActions":6,"../stores/StatsStore":23,"react":"react"}],17:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _componentsHome = require('./components/Home');

var _componentsHome2 = _interopRequireDefault(_componentsHome);

var _componentsStats = require('./components/Stats');

var _componentsStats2 = _interopRequireDefault(_componentsStats);

var _componentsCharacter = require('./components/Character');

var _componentsCharacter2 = _interopRequireDefault(_componentsCharacter);

var _componentsCharacterList = require('./components/CharacterList');

var _componentsCharacterList2 = _interopRequireDefault(_componentsCharacterList);

var _componentsAddCharacter = require('./components/AddCharacter');

var _componentsAddCharacter2 = _interopRequireDefault(_componentsAddCharacter);

var _components404 = require('./components/404');

var _components4042 = _interopRequireDefault(_components404);

module.exports = _react2['default'].createElement(
  _reactRouter.Route,
  { handler: _componentsApp2['default'] },
  _react2['default'].createElement(_reactRouter.NotFoundRoute, { handler: _components4042['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/', handler: _componentsHome2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/stats', handler: _componentsStats2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/characters/:id', handler: _componentsCharacter2['default'] }),
  _react2['default'].createElement(
    _reactRouter.Route,
    { path: '/top', handler: _componentsCharacterList2['default'] },
    _react2['default'].createElement(
      _reactRouter.Route,
      { path: ':race', handler: _componentsCharacterList2['default'] },
      _react2['default'].createElement(_reactRouter.Route, { path: ':bloodline', handler: _componentsCharacterList2['default'] })
    )
  ),
  _react2['default'].createElement(
    _reactRouter.Route,
    { path: '/female', handler: _componentsCharacterList2['default'] },
    _react2['default'].createElement(
      _reactRouter.Route,
      { path: ':race', handler: _componentsCharacterList2['default'] },
      _react2['default'].createElement(_reactRouter.Route, { path: ':bloodline', handler: _componentsCharacterList2['default'] })
    )
  ),
  _react2['default'].createElement(
    _reactRouter.Route,
    { path: '/male', handler: _componentsCharacterList2['default'] },
    _react2['default'].createElement(
      _reactRouter.Route,
      { path: ':race', handler: _componentsCharacterList2['default'] },
      _react2['default'].createElement(_reactRouter.Route, { path: ':bloodline', handler: _componentsCharacterList2['default'] })
    )
  ),
  _react2['default'].createElement(_reactRouter.Route, { path: '/shame', handler: _componentsCharacterList2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/add', handler: _componentsAddCharacter2['default'] })
);

},{"./components/404":8,"./components/AddCharacter":9,"./components/App":10,"./components/Character":11,"./components/CharacterList":12,"./components/Home":14,"./components/Stats":16,"react":"react","react-router":"react-router"}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsAddCharacterActions = require('../actions/AddCharacterActions');

var _actionsAddCharacterActions2 = _interopRequireDefault(_actionsAddCharacterActions);

var AddCharacterStore = (function () {
  function AddCharacterStore() {
    _classCallCheck(this, AddCharacterStore);

    this.bindActions(_actionsAddCharacterActions2['default']);
    this.name = '';
    this.gender = '';
    this.helpBlock = '';
    this.nameValidationState = '';
    this.genderValidationState = '';
  }

  _createClass(AddCharacterStore, [{
    key: 'onAddCharacterSuccess',
    value: function onAddCharacterSuccess(successMessage) {
      this.nameValidationState = 'has-success';
      this.helpBlock = successMessage;
    }
  }, {
    key: 'onAddCharacterFail',
    value: function onAddCharacterFail(errorMessage) {
      this.nameValidationState = 'has-error';
      this.helpBlock = errorMessage;
    }
  }, {
    key: 'onUpdateName',
    value: function onUpdateName(event) {
      this.name = event.target.value;
      this.nameValidationState = '';
      this.helpBlock = '';
    }
  }, {
    key: 'onUpdateGender',
    value: function onUpdateGender(event) {
      this.gender = event.target.value;
      this.genderValidationState = '';
    }
  }, {
    key: 'onInvalidName',
    value: function onInvalidName() {
      this.nameValidationState = 'has-error';
      this.helpBlock = 'Please enter a character name.';
    }
  }, {
    key: 'onInvalidGender',
    value: function onInvalidGender() {
      this.genderValidationState = 'has-error';
    }
  }]);

  return AddCharacterStore;
})();

exports['default'] = _alt2['default'].createStore(AddCharacterStore);
module.exports = exports['default'];

},{"../actions/AddCharacterActions":1,"../alt":7}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _underscore = require('underscore');

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsCharacterListActions = require('../actions/CharacterListActions');

var _actionsCharacterListActions2 = _interopRequireDefault(_actionsCharacterListActions);

var CharacterListStore = (function () {
  function CharacterListStore() {
    _classCallCheck(this, CharacterListStore);

    this.bindActions(_actionsCharacterListActions2['default']);
    this.characters = [];
    this.prevPath = null;
  }

  _createClass(CharacterListStore, [{
    key: 'onGetCharactersSuccess',
    value: function onGetCharactersSuccess(payload) {
      this.characters = payload.data;
      this.prevPath = payload.path;
    }
  }, {
    key: 'onGetCharactersFail',
    value: function onGetCharactersFail(jqXhr) {
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }]);

  return CharacterListStore;
})();

exports['default'] = _alt2['default'].createStore(CharacterListStore);
module.exports = exports['default'];

},{"../actions/CharacterListActions":3,"../alt":7,"underscore":"underscore"}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _underscore = require('underscore');

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsCharacterActions = require('../actions/CharacterActions');

var _actionsCharacterActions2 = _interopRequireDefault(_actionsCharacterActions);

var CharacterStore = (function () {
  function CharacterStore() {
    _classCallCheck(this, CharacterStore);

    this.bindActions(_actionsCharacterActions2['default']);
    this.characterId = 0;
    this.name = 'TBD';
    this.race = 'TBD';
    this.bloodline = 'TBD';
    this.gender = 'TBD';
    this.wins = 0;
    this.losses = 0;
    this.winLossRatio = 0;
    this.email = '';
    this.isReported = false;
    this.isSubscribed = false;
    this.prevPath = null;
  }

  _createClass(CharacterStore, [{
    key: 'onUpdateEmail',
    value: function onUpdateEmail(event) {
      this.email = event.target.value;
    }
  }, {
    key: 'onGetCharacterSuccess',
    value: function onGetCharacterSuccess(payload) {
      $(document.body).attr('class', 'profile ' + payload.data.race.toLowerCase());

      (0, _underscore.assign)(this, payload.data);
      this.winLossRatio = (this.wins / (this.wins + this.losses) * 100 || 0).toFixed(1); // NaN or 0
      this.prevPath = payload.path;

      var appData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
      this.isReported = (0, _underscore.contains)(appData.reports, payload.data.characterId);
      this.isSubscribed = (0, _underscore.contains)(appData.subscriptions, payload.data.characterId);

      $('.magnific-popup').magnificPopup({
        type: 'image',
        mainClass: 'mfp-zoom-in',
        closeOnContentClick: true,
        midClick: true,
        zoom: {
          enabled: true,
          duration: 300
        }
      });
    }
  }, {
    key: 'onGetCharacterFail',
    value: function onGetCharacterFail(jqXhr) {
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }, {
    key: 'onReportSuccess',
    value: function onReportSuccess() {
      this.isReported = true;

      var appData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
      appData.reports = appData.reports || [];
      appData.reports.push(this.characterId);
      localStorage.setItem('NEF', JSON.stringify(appData));

      toastr.warning('Character has been reported.');
    }
  }, {
    key: 'onReportFail',
    value: function onReportFail(jqXhr) {
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }, {
    key: 'onSubscribeSuccess',
    value: function onSubscribeSuccess() {
      this.isSubscribed = true;

      var appData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
      appData.subscriptions = appData.subscriptions || [];
      appData.subscriptions.push(this.characterId);
      localStorage.setItem('NEF', JSON.stringify(appData));
    }
  }, {
    key: 'onSubscribeFail',
    value: function onSubscribeFail(jqXhr) {
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }]);

  return CharacterStore;
})();

exports['default'] = _alt2['default'].createStore(CharacterStore);
module.exports = exports['default'];

},{"../actions/CharacterActions":2,"../alt":7,"underscore":"underscore"}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _underscore = require('underscore');

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsHomeActions = require('../actions/HomeActions');

var _actionsHomeActions2 = _interopRequireDefault(_actionsHomeActions);

var HomeStore = (function () {
  function HomeStore() {
    _classCallCheck(this, HomeStore);

    this.bindActions(_actionsHomeActions2['default']);
    this.characters = [];
  }

  _createClass(HomeStore, [{
    key: 'onGetTwoCharactersSuccess',
    value: function onGetTwoCharactersSuccess(data) {
      this.characters = data;
    }
  }, {
    key: 'onGetTwoCharactersFail',
    value: function onGetTwoCharactersFail(jqXhr) {
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }, {
    key: 'onVoteFail',
    value: function onVoteFail(jqXhr) {
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }]);

  return HomeStore;
})();

exports['default'] = _alt2['default'].createStore(HomeStore);
module.exports = exports['default'];

},{"../actions/HomeActions":4,"../alt":7,"underscore":"underscore"}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsNavbarActions = require('../actions/NavbarActions');

var _actionsNavbarActions2 = _interopRequireDefault(_actionsNavbarActions);

var NavbarStore = (function () {
  function NavbarStore() {
    _classCallCheck(this, NavbarStore);

    this.bindActions(_actionsNavbarActions2['default']);
    this.totalCharacters = 0;
    this.onlineUsers = 0;
    this.searchQuery = '';
    this.ajaxAnimation = '';
  }

  _createClass(NavbarStore, [{
    key: 'onUpdateOnlineUsers',
    value: function onUpdateOnlineUsers(data) {
      this.onlineUsers = data.onlineUsers;
    }
  }, {
    key: 'onUpdateAjaxAnimation',
    value: function onUpdateAjaxAnimation(cssClass) {
      this.ajaxAnimation = cssClass;
    }
  }, {
    key: 'onUpdateSearchQuery',
    value: function onUpdateSearchQuery(event) {
      this.searchQuery = event.target.value;
    }
  }, {
    key: 'onGetCharacterCountSuccess',
    value: function onGetCharacterCountSuccess(data) {
      this.totalCharacters = data.count;
    }
  }, {
    key: 'onGetCharacterCountFail',
    value: function onGetCharacterCountFail(jqXhr) {
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }]);

  return NavbarStore;
})();

exports['default'] = _alt2['default'].createStore(NavbarStore);
module.exports = exports['default'];

},{"../actions/NavbarActions":5,"../alt":7}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _underscore = require('underscore');

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsStatsActions = require('../actions/StatsActions');

var _actionsStatsActions2 = _interopRequireDefault(_actionsStatsActions);

var StatsStore = (function () {
  function StatsStore() {
    _classCallCheck(this, StatsStore);

    this.bindActions(_actionsStatsActions2['default']);
    this.leadingRace = { race: 'Unknown', count: 0 };
    this.leadingBloodline = { bloodline: 'Unknown', count: 0 };
    this.amarrCount = 0;
    this.caldariCount = 0;
    this.gallenteCount = 0;
    this.minmatarCount = 0;
    this.totalVotes = 0;
    this.femaleCount = 0;
    this.maleCount = 0;
    this.totalCount = 0;
  }

  _createClass(StatsStore, [{
    key: 'onGetStatsSuccess',
    value: function onGetStatsSuccess(data) {
      (0, _underscore.assign)(this, data);
    }
  }, {
    key: 'onGetStatsFail',
    value: function onGetStatsFail(jqXhr) {
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }]);

  return StatsStore;
})();

exports['default'] = _alt2['default'].createStore(StatsStore);
module.exports = exports['default'];

},{"../actions/StatsActions":6,"../alt":7,"underscore":"underscore"}],24:[function(require,module,exports){
'use strict';

var WebAPIUtils = {
  addCharacter: function addCharacter(name, gender) {
    return $.ajax({
      type: 'POST',
      url: '/api/characters',
      data: { name: name, gender: gender }
    });
  }
};

module.exports = WebAPIUtils;

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = makeAction;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _esSymbol = require('es-symbol');

var _esSymbol2 = _interopRequireDefault(_esSymbol);

var _symbolsSymbols = require('../symbols/symbols');

var Sym = _interopRequireWildcard(_symbolsSymbols);

var _utilsAltUtils = require('../utils/AltUtils');

var utils = _interopRequireWildcard(_utilsAltUtils);

var AltAction = (function () {
  function AltAction(alt, name, action, actions, actionDetails) {
    _classCallCheck(this, AltAction);

    this[Sym.ACTION_UID] = name;
    this[Sym.ACTION_HANDLER] = action.bind(this);
    this.actions = actions;
    this.actionDetails = actionDetails;
    this.alt = alt;
  }

  _createClass(AltAction, [{
    key: 'dispatch',
    value: function dispatch(data) {
      this.alt.dispatch(this[Sym.ACTION_UID], data, this.actionDetails);
    }
  }]);

  return AltAction;
})();

function makeAction(alt, namespace, name, implementation, obj) {
  // make sure each Symbol is unique
  var actionId = utils.uid(alt[Sym.ACTIONS_REGISTRY], '' + namespace + '.' + name);
  alt[Sym.ACTIONS_REGISTRY][actionId] = 1;
  var actionSymbol = _esSymbol2['default']['for']('alt/' + actionId);

  var data = {
    namespace: namespace,
    name: name,
    id: actionId,
    symbol: actionSymbol
  };

  // Wrap the action so we can provide a dispatch method
  var newAction = new AltAction(alt, actionSymbol, implementation, obj, data);

  // the action itself
  var action = newAction[Sym.ACTION_HANDLER];
  action.defer = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    setTimeout(function () {
      newAction[Sym.ACTION_HANDLER].apply(null, args);
    });
  };
  action[Sym.ACTION_KEY] = actionSymbol;
  action.data = data;

  // ensure each reference is unique in the namespace
  var container = alt.actions[namespace];
  var id = utils.uid(container, name);
  container[id] = action;

  return action;
}

module.exports = exports['default'];
},{"../symbols/symbols":30,"../utils/AltUtils":31,"es-symbol":33}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _bind = Function.prototype.bind;

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _flux = require('flux');

var _utilsStateFunctions = require('./utils/StateFunctions');

var StateFunctions = _interopRequireWildcard(_utilsStateFunctions);

var _symbolsSymbols = require('./symbols/symbols');

var Sym = _interopRequireWildcard(_symbolsSymbols);

var _utilsFunctions = require('../utils/functions');

var fn = _interopRequireWildcard(_utilsFunctions);

var _store = require('./store');

var store = _interopRequireWildcard(_store);

var _utilsAltUtils = require('./utils/AltUtils');

var utils = _interopRequireWildcard(_utilsAltUtils);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var Alt = (function () {
  function Alt() {
    var config = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Alt);

    this.config = config;
    this.serialize = config.serialize || JSON.stringify;
    this.deserialize = config.deserialize || JSON.parse;
    this.dispatcher = config.dispatcher || new _flux.Dispatcher();
    this.actions = { global: {} };
    this.stores = {};
    this.storeTransforms = config.storeTransforms || [];
    this[Sym.ACTIONS_REGISTRY] = {};
    this[Sym.INIT_SNAPSHOT] = {};
    this[Sym.LAST_SNAPSHOT] = {};
  }

  _createClass(Alt, [{
    key: 'dispatch',
    value: function dispatch(action, data, details) {
      this.dispatcher.dispatch({ action: action, data: data, details: details });
    }
  }, {
    key: 'createUnsavedStore',
    value: function createUnsavedStore(StoreModel) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var key = StoreModel.displayName || '';
      store.createStoreConfig(this.config, StoreModel);
      var Store = store.transformStore(this.storeTransforms, StoreModel);

      return fn.isFunction(Store) ? store.createStoreFromClass.apply(store, [this, Store, key].concat(args)) : store.createStoreFromObject(this, Store, key);
    }
  }, {
    key: 'createStore',
    value: function createStore(StoreModel, iden) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      var key = iden || StoreModel.displayName || StoreModel.name || '';
      store.createStoreConfig(this.config, StoreModel);
      var Store = store.transformStore(this.storeTransforms, StoreModel);

      if (this.stores[key] || !key) {
        if (this.stores[key]) {
          utils.warn('A store named ' + key + ' already exists, double check your store ' + 'names or pass in your own custom identifier for each store');
        } else {
          utils.warn('Store name was not specified');
        }

        key = utils.uid(this.stores, key);
      }

      var storeInstance = fn.isFunction(Store) ? store.createStoreFromClass.apply(store, [this, Store, key].concat(args)) : store.createStoreFromObject(this, Store, key);

      this.stores[key] = storeInstance;
      StateFunctions.saveInitialSnapshot(this, key);

      return storeInstance;
    }
  }, {
    key: 'generateActions',
    value: function generateActions() {
      for (var _len3 = arguments.length, actionNames = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        actionNames[_key3] = arguments[_key3];
      }

      var actions = { name: 'global' };
      return this.createActions(actionNames.reduce(function (obj, action) {
        obj[action] = utils.dispatchIdentity;
        return obj;
      }, actions));
    }
  }, {
    key: 'createAction',
    value: function createAction(name, implementation, obj) {
      return (0, _actions2['default'])(this, 'global', name, implementation, obj);
    }
  }, {
    key: 'createActions',
    value: function createActions(ActionsClass) {
      for (var _len4 = arguments.length, argsForConstructor = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        argsForConstructor[_key4 - 2] = arguments[_key4];
      }

      var _this = this;

      var exportObj = arguments[1] === undefined ? {} : arguments[1];

      var actions = {};
      var key = utils.uid(this[Sym.ACTIONS_REGISTRY], ActionsClass.displayName || ActionsClass.name || 'Unknown');

      if (fn.isFunction(ActionsClass)) {
        (function () {
          fn.assign(actions, utils.getInternalMethods(ActionsClass, true));

          var ActionsGenerator = (function (_ActionsClass) {
            function ActionsGenerator() {
              for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
              }

              _classCallCheck(this, ActionsGenerator);

              _get(Object.getPrototypeOf(ActionsGenerator.prototype), 'constructor', this).apply(this, args);
            }

            _inherits(ActionsGenerator, _ActionsClass);

            _createClass(ActionsGenerator, [{
              key: 'generateActions',
              value: function generateActions() {
                for (var _len6 = arguments.length, actionNames = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                  actionNames[_key6] = arguments[_key6];
                }

                actionNames.forEach(function (actionName) {
                  actions[actionName] = utils.dispatchIdentity;
                });
              }
            }]);

            return ActionsGenerator;
          })(ActionsClass);

          fn.assign(actions, new (_bind.apply(ActionsGenerator, [null].concat(argsForConstructor)))());
        })();
      } else {
        fn.assign(actions, ActionsClass);
      }

      this.actions[key] = this.actions[key] || {};

      fn.eachObject(function (actionName, action) {
        if (!fn.isFunction(action)) {
          return;
        }

        // create the action
        exportObj[actionName] = (0, _actions2['default'])(_this, key, actionName, action, exportObj);

        // generate a constant
        var constant = utils.formatAsConstant(actionName);
        exportObj[constant] = exportObj[actionName][Sym.ACTION_KEY];
      }, [actions]);
      return exportObj;
    }
  }, {
    key: 'takeSnapshot',
    value: function takeSnapshot() {
      for (var _len7 = arguments.length, storeNames = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        storeNames[_key7] = arguments[_key7];
      }

      var state = StateFunctions.snapshot(this, storeNames);
      fn.assign(this[Sym.LAST_SNAPSHOT], state);
      return this.serialize(state);
    }
  }, {
    key: 'rollback',
    value: function rollback() {
      StateFunctions.setAppState(this, this.serialize(this[Sym.LAST_SNAPSHOT]), function (storeInst) {
        storeInst[Sym.LIFECYCLE].emit('rollback');
        storeInst.emitChange();
      });
    }
  }, {
    key: 'recycle',
    value: function recycle() {
      for (var _len8 = arguments.length, storeNames = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        storeNames[_key8] = arguments[_key8];
      }

      var initialSnapshot = storeNames.length ? StateFunctions.filterSnapshots(this, this[Sym.INIT_SNAPSHOT], storeNames) : this[Sym.INIT_SNAPSHOT];

      StateFunctions.setAppState(this, this.serialize(initialSnapshot), function (storeInst) {
        storeInst[Sym.LIFECYCLE].emit('init');
        storeInst.emitChange();
      });
    }
  }, {
    key: 'flush',
    value: function flush() {
      var state = this.serialize(StateFunctions.snapshot(this));
      this.recycle();
      return state;
    }
  }, {
    key: 'bootstrap',
    value: function bootstrap(data) {
      StateFunctions.setAppState(this, data, function (storeInst) {
        storeInst[Sym.LIFECYCLE].emit('bootstrap');
        storeInst.emitChange();
      });
    }
  }, {
    key: 'prepare',
    value: function prepare(storeInst, payload) {
      var data = {};
      if (!storeInst.displayName) {
        throw new ReferenceError('Store provided does not have a name');
      }
      data[storeInst.displayName] = payload;
      return this.serialize(data);
    }
  }, {
    key: 'addActions',

    // Instance type methods for injecting alt into your application as context

    value: function addActions(name, ActionsClass) {
      for (var _len9 = arguments.length, args = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
        args[_key9 - 2] = arguments[_key9];
      }

      this.actions[name] = Array.isArray(ActionsClass) ? this.generateActions.apply(this, ActionsClass) : this.createActions.apply(this, [ActionsClass].concat(args));
    }
  }, {
    key: 'addStore',
    value: function addStore(name, StoreModel) {
      for (var _len10 = arguments.length, args = Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
        args[_key10 - 2] = arguments[_key10];
      }

      this.createStore.apply(this, [StoreModel, name].concat(args));
    }
  }, {
    key: 'getActions',
    value: function getActions(name) {
      return this.actions[name];
    }
  }, {
    key: 'getStore',
    value: function getStore(name) {
      return this.stores[name];
    }
  }]);

  return Alt;
})();

exports['default'] = Alt;
module.exports = exports['default'];
},{"../utils/functions":38,"./actions":25,"./store":29,"./symbols/symbols":30,"./utils/AltUtils":31,"./utils/StateFunctions":32,"flux":35}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _esSymbol = require('es-symbol');

var _esSymbol2 = _interopRequireDefault(_esSymbol);

var _symbolsSymbols = require('../symbols/symbols');

var Sym = _interopRequireWildcard(_symbolsSymbols);

var _utilsFunctions = require('../../utils/functions');

var fn = _interopRequireWildcard(_utilsFunctions);

// event emitter instance
var EE = (0, _esSymbol2['default'])();

var AltStore = (function () {
  function AltStore(alt, model, state, StoreModel) {
    var _this = this;

    _classCallCheck(this, AltStore);

    this[EE] = new _eventemitter32['default']();
    this[Sym.LIFECYCLE] = model[Sym.LIFECYCLE];
    this[Sym.STATE_CONTAINER] = state || model;

    this._storeName = model._storeName;
    this.boundListeners = model[Sym.ALL_LISTENERS];
    this.StoreModel = StoreModel;

    fn.assign(this, model[Sym.PUBLIC_METHODS]);

    // Register dispatcher
    this.dispatchToken = alt.dispatcher.register(function (payload) {
      _this[Sym.LIFECYCLE].emit('beforeEach', payload, _this[Sym.STATE_CONTAINER]);

      if (model[Sym.LISTENERS][payload.action]) {
        var result = false;

        try {
          result = model[Sym.LISTENERS][payload.action](payload.data);
        } catch (e) {
          if (model[Sym.HANDLING_ERRORS]) {
            _this[Sym.LIFECYCLE].emit('error', e, payload, _this[Sym.STATE_CONTAINER]);
          } else {
            throw e;
          }
        }

        if (result !== false) {
          _this.emitChange();
        }
      }

      _this[Sym.LIFECYCLE].emit('afterEach', payload, _this[Sym.STATE_CONTAINER]);
    });

    this[Sym.LIFECYCLE].emit('init');
  }

  _createClass(AltStore, [{
    key: 'getEventEmitter',
    value: function getEventEmitter() {
      return this[EE];
    }
  }, {
    key: 'emitChange',
    value: function emitChange() {
      this[EE].emit('change', this[Sym.STATE_CONTAINER]);
    }
  }, {
    key: 'listen',
    value: function listen(cb) {
      var _this2 = this;

      this[EE].on('change', cb);
      return function () {
        return _this2.unlisten(cb);
      };
    }
  }, {
    key: 'unlisten',
    value: function unlisten(cb) {
      this[Sym.LIFECYCLE].emit('unlisten');
      this[EE].removeListener('change', cb);
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.StoreModel.config.getState.call(this, this[Sym.STATE_CONTAINER]);
    }
  }]);

  return AltStore;
})();

exports['default'] = AltStore;
module.exports = exports['default'];
},{"../../utils/functions":38,"../symbols/symbols":30,"es-symbol":33,"eventemitter3":34}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _esSymbol = require('es-symbol');

var _esSymbol2 = _interopRequireDefault(_esSymbol);

var _symbolsSymbols = require('../symbols/symbols');

var Sym = _interopRequireWildcard(_symbolsSymbols);

var _utilsFunctions = require('../../utils/functions');

var fn = _interopRequireWildcard(_utilsFunctions);

var StoreMixin = {
  waitFor: function waitFor() {
    for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
      sources[_key] = arguments[_key];
    }

    if (!sources.length) {
      throw new ReferenceError('Dispatch tokens not provided');
    }

    var sourcesArray = sources;
    if (sources.length === 1) {
      sourcesArray = Array.isArray(sources[0]) ? sources[0] : sources;
    }

    var tokens = sourcesArray.map(function (source) {
      return source.dispatchToken || source;
    });

    this.dispatcher.waitFor(tokens);
  },

  exportAsync: function exportAsync(asyncMethods) {
    this.registerAsync(asyncMethods);
  },

  registerAsync: function registerAsync(asyncDef) {
    var _this = this;

    var loadCounter = 0;

    var asyncMethods = fn.isFunction(asyncDef) ? asyncDef(this.alt) : asyncDef;

    var toExport = Object.keys(asyncMethods).reduce(function (publicMethods, methodName) {
      var desc = asyncMethods[methodName];
      var spec = fn.isFunction(desc) ? desc(_this) : desc;

      var validHandlers = ['success', 'error', 'loading'];
      validHandlers.forEach(function (handler) {
        if (spec[handler] && !spec[handler][Sym.ACTION_KEY]) {
          throw new Error('' + handler + ' handler must be an action function');
        }
      });

      publicMethods[methodName] = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var state = _this.getInstance().getState();
        var value = spec.local && spec.local.apply(spec, [state].concat(args));
        var shouldFetch = spec.shouldFetch ? spec.shouldFetch.apply(spec, [state].concat(args)) : value == null;
        var intercept = spec.interceptResponse || function (x) {
          return x;
        };

        // if we don't have it in cache then fetch it
        if (shouldFetch) {
          loadCounter += 1;
          /* istanbul ignore else */
          if (spec.loading) spec.loading(intercept(null, spec.loading, args));
          spec.remote.apply(spec, [state].concat(args)).then(function (v) {
            loadCounter -= 1;
            spec.success(intercept(v, spec.success, args));
          })['catch'](function (v) {
            loadCounter -= 1;
            spec.error(intercept(v, spec.error, args));
          });
        } else {
          // otherwise emit the change now
          _this.emitChange();
        }
      };

      return publicMethods;
    }, {});

    this.exportPublicMethods(toExport);
    this.exportPublicMethods({
      isLoading: function isLoading() {
        return loadCounter > 0;
      }
    });
  },

  exportPublicMethods: function exportPublicMethods(methods) {
    var _this2 = this;

    fn.eachObject(function (methodName, value) {
      if (!fn.isFunction(value)) {
        throw new TypeError('exportPublicMethods expects a function');
      }

      _this2[Sym.PUBLIC_METHODS][methodName] = value;
    }, [methods]);
  },

  emitChange: function emitChange() {
    this.getInstance().emitChange();
  },

  on: function on(lifecycleEvent, handler) {
    if (lifecycleEvent === 'error') {
      this[Sym.HANDLING_ERRORS] = true;
    }
    this[Sym.LIFECYCLE].on(lifecycleEvent, handler.bind(this));
  },

  bindAction: function bindAction(symbol, handler) {
    if (!symbol) {
      throw new ReferenceError('Invalid action reference passed in');
    }
    if (!fn.isFunction(handler)) {
      throw new TypeError('bindAction expects a function');
    }

    if (handler.length > 1) {
      throw new TypeError('Action handler in store ' + this._storeName + ' for ' + ('' + (symbol[Sym.ACTION_KEY] || symbol).toString() + ' was defined with ') + 'two parameters. Only a single parameter is passed through the ' + 'dispatcher, did you mean to pass in an Object instead?');
    }

    // You can pass in the constant or the function itself
    var key = symbol[Sym.ACTION_KEY] ? symbol[Sym.ACTION_KEY] : symbol;
    this[Sym.LISTENERS][key] = handler.bind(this);
    this[Sym.ALL_LISTENERS].push(_esSymbol2['default'].keyFor(key));
  },

  bindActions: function bindActions(actions) {
    var _this3 = this;

    fn.eachObject(function (action, symbol) {
      var matchFirstCharacter = /./;
      var assumedEventHandler = action.replace(matchFirstCharacter, function (x) {
        return 'on' + x[0].toUpperCase();
      });
      var handler = null;

      if (_this3[action] && _this3[assumedEventHandler]) {
        // If you have both action and onAction
        throw new ReferenceError('You have multiple action handlers bound to an action: ' + ('' + action + ' and ' + assumedEventHandler));
      } else if (_this3[action]) {
        // action
        handler = _this3[action];
      } else if (_this3[assumedEventHandler]) {
        // onAction
        handler = _this3[assumedEventHandler];
      }

      if (handler) {
        _this3.bindAction(symbol, handler);
      }
    }, [actions]);
  },

  bindListeners: function bindListeners(obj) {
    var _this4 = this;

    fn.eachObject(function (methodName, symbol) {
      var listener = _this4[methodName];

      if (!listener) {
        throw new ReferenceError('' + methodName + ' defined but does not exist in ' + _this4._storeName);
      }

      if (Array.isArray(symbol)) {
        symbol.forEach(function (action) {
          _this4.bindAction(action, listener);
        });
      } else {
        _this4.bindAction(symbol, listener);
      }
    }, [obj]);
  }
};

exports['default'] = StoreMixin;
module.exports = exports['default'];
},{"../../utils/functions":38,"../symbols/symbols":30,"es-symbol":33}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _bind = Function.prototype.bind;

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.createStoreConfig = createStoreConfig;
exports.transformStore = transformStore;
exports.createStoreFromObject = createStoreFromObject;
exports.createStoreFromClass = createStoreFromClass;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _symbolsSymbols = require('../symbols/symbols');

var Sym = _interopRequireWildcard(_symbolsSymbols);

var _utilsAltUtils = require('../utils/AltUtils');

var utils = _interopRequireWildcard(_utilsAltUtils);

var _utilsFunctions = require('../../utils/functions');

var fn = _interopRequireWildcard(_utilsFunctions);

var _AltStore = require('./AltStore');

var _AltStore2 = _interopRequireDefault(_AltStore);

var _StoreMixin = require('./StoreMixin');

var _StoreMixin2 = _interopRequireDefault(_StoreMixin);

function doSetState(store, storeInstance, state) {
  if (!state) {
    return;
  }

  var config = storeInstance.StoreModel.config;

  var nextState = fn.isFunction(state) ? state(storeInstance[Sym.STATE_CONTAINER]) : state;

  storeInstance[Sym.STATE_CONTAINER] = config.setState.call(store, storeInstance[Sym.STATE_CONTAINER], nextState);

  if (!store.alt.dispatcher.isDispatching()) {
    store.emitChange();
  }
}

function createPrototype(proto, alt, key, extras) {
  proto[Sym.ALL_LISTENERS] = [];
  proto[Sym.LIFECYCLE] = new _eventemitter32['default']();
  proto[Sym.LISTENERS] = {};
  proto[Sym.PUBLIC_METHODS] = {};

  return fn.assign(proto, _StoreMixin2['default'], {
    _storeName: key,
    alt: alt,
    dispatcher: alt.dispatcher
  }, extras);
}

function createStoreConfig(globalConfig, StoreModel) {
  StoreModel.config = fn.assign({
    getState: function getState(state) {
      return fn.assign({}, state);
    },
    setState: fn.assign
  }, globalConfig, StoreModel.config);
}

function transformStore(transforms, StoreModel) {
  return transforms.reduce(function (Store, transform) {
    return transform(Store);
  }, StoreModel);
}

function createStoreFromObject(alt, StoreModel, key) {
  var storeInstance = undefined;

  var StoreProto = createPrototype({}, alt, key, fn.assign({
    getInstance: function getInstance() {
      return storeInstance;
    },
    setState: function setState(nextState) {
      doSetState(this, storeInstance, nextState);
    }
  }, StoreModel));

  // bind the store listeners
  /* istanbul ignore else */
  if (StoreProto.bindListeners) {
    _StoreMixin2['default'].bindListeners.call(StoreProto, StoreProto.bindListeners);
  }

  // bind the lifecycle events
  /* istanbul ignore else */
  if (StoreProto.lifecycle) {
    fn.eachObject(function (eventName, event) {
      _StoreMixin2['default'].on.call(StoreProto, eventName, event);
    }, [StoreProto.lifecycle]);
  }

  // create the instance and fn.assign the public methods to the instance
  storeInstance = fn.assign(new _AltStore2['default'](alt, StoreProto, StoreProto.state, StoreModel), StoreProto.publicMethods, { displayName: key });

  return storeInstance;
}

function createStoreFromClass(alt, StoreModel, key) {
  for (var _len = arguments.length, argsForClass = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    argsForClass[_key - 3] = arguments[_key];
  }

  var storeInstance = undefined;
  var config = StoreModel.config;

  // Creating a class here so we don't overload the provided store's
  // prototype with the mixin behaviour and I'm extending from StoreModel
  // so we can inherit any extensions from the provided store.

  var Store = (function (_StoreModel) {
    function Store() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _classCallCheck(this, Store);

      _get(Object.getPrototypeOf(Store.prototype), 'constructor', this).apply(this, args);
    }

    _inherits(Store, _StoreModel);

    return Store;
  })(StoreModel);

  createPrototype(Store.prototype, alt, key, {
    getInstance: function getInstance() {
      return storeInstance;
    },
    setState: function setState(nextState) {
      doSetState(this, storeInstance, nextState);
    }
  });

  var store = new (_bind.apply(Store, [null].concat(argsForClass)))();

  if (config.bindListeners) {
    store.bindListeners(config.bindListeners);
  }

  if (config.datasource) {
    store.exportAsync(config.datasource);
  }

  storeInstance = fn.assign(new _AltStore2['default'](alt, store, store[alt.config.stateKey] || store[config.stateKey] || null, StoreModel), utils.getInternalMethods(StoreModel), config.publicMethods, { displayName: key });

  return storeInstance;
}
},{"../../utils/functions":38,"../symbols/symbols":30,"../utils/AltUtils":31,"./AltStore":27,"./StoreMixin":28,"eventemitter3":34}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _esSymbol = require('es-symbol');

var _esSymbol2 = _interopRequireDefault(_esSymbol);

// action creator handler
var ACTION_HANDLER = (0, _esSymbol2['default'])();

exports.ACTION_HANDLER = ACTION_HANDLER;
// the action's uid symbol for listening
var ACTION_KEY = (0, _esSymbol2['default'])();

exports.ACTION_KEY = ACTION_KEY;
// per instance registry of actions
var ACTIONS_REGISTRY = (0, _esSymbol2['default'])();

exports.ACTIONS_REGISTRY = ACTIONS_REGISTRY;
// the action's name
var ACTION_UID = (0, _esSymbol2['default'])();

exports.ACTION_UID = ACTION_UID;
// store all of a store's listeners
var ALL_LISTENERS = (0, _esSymbol2['default'])();

exports.ALL_LISTENERS = ALL_LISTENERS;
// are we handling our own errors
var HANDLING_ERRORS = (0, _esSymbol2['default'])();

exports.HANDLING_ERRORS = HANDLING_ERRORS;
// initial snapshot
var INIT_SNAPSHOT = (0, _esSymbol2['default'])();

exports.INIT_SNAPSHOT = INIT_SNAPSHOT;
// last snapshot
var LAST_SNAPSHOT = (0, _esSymbol2['default'])();

exports.LAST_SNAPSHOT = LAST_SNAPSHOT;
// all lifecycle listeners
var LIFECYCLE = (0, _esSymbol2['default'])();

exports.LIFECYCLE = LIFECYCLE;
// store action listeners
var LISTENERS = (0, _esSymbol2['default'])();

exports.LISTENERS = LISTENERS;
// public methods
var PUBLIC_METHODS = (0, _esSymbol2['default'])();

exports.PUBLIC_METHODS = PUBLIC_METHODS;
// contains all state
var STATE_CONTAINER = (0, _esSymbol2['default'])();
exports.STATE_CONTAINER = STATE_CONTAINER;
},{"es-symbol":33}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getInternalMethods = getInternalMethods;
exports.warn = warn;
exports.uid = uid;
exports.formatAsConstant = formatAsConstant;
exports.dispatchIdentity = dispatchIdentity;
/* istanbul ignore next */
function NoopClass() {}

var builtIns = Object.getOwnPropertyNames(NoopClass);
var builtInProto = Object.getOwnPropertyNames(NoopClass.prototype);

function getInternalMethods(Obj, isProto) {
  var excluded = isProto ? builtInProto : builtIns;
  var obj = isProto ? Obj.prototype : Obj;
  return Object.getOwnPropertyNames(obj).reduce(function (value, m) {
    if (excluded.indexOf(m) !== -1) {
      return value;
    }

    value[m] = obj[m];
    return value;
  }, {});
}

function warn(msg) {
  /* istanbul ignore else */
  if (typeof console !== 'undefined') {
    console.warn(new ReferenceError(msg));
  }
}

function uid(container, name) {
  var count = 0;
  var key = name;
  while (Object.hasOwnProperty.call(container, key)) {
    key = name + String(++count);
  }
  return key;
}

function formatAsConstant(name) {
  return name.replace(/[a-z]([A-Z])/g, function (i) {
    return '' + i[0] + '_' + i[1].toLowerCase();
  }).toUpperCase();
}

function dispatchIdentity(x) {
  for (var _len = arguments.length, a = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    a[_key - 1] = arguments[_key];
  }

  this.dispatch(a.length ? [x].concat(a) : x);
}
},{}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setAppState = setAppState;
exports.snapshot = snapshot;
exports.saveInitialSnapshot = saveInitialSnapshot;
exports.filterSnapshots = filterSnapshots;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _symbolsSymbols = require('../symbols/symbols');

var Sym = _interopRequireWildcard(_symbolsSymbols);

var _utilsFunctions = require('../../utils/functions');

var fn = _interopRequireWildcard(_utilsFunctions);

function setAppState(instance, data, onStore) {
  var obj = instance.deserialize(data);
  fn.eachObject(function (key, value) {
    var store = instance.stores[key];
    if (store) {
      var config = store.StoreModel.config;

      if (config.onDeserialize) {
        obj[key] = config.onDeserialize(value) || value;
      }
      fn.assign(store[Sym.STATE_CONTAINER], obj[key]);
      onStore(store);
    }
  }, [obj]);
}

function snapshot(instance) {
  var storeNames = arguments[1] === undefined ? [] : arguments[1];

  var stores = storeNames.length ? storeNames : Object.keys(instance.stores);
  return stores.reduce(function (obj, storeHandle) {
    var storeName = storeHandle.displayName || storeHandle;
    var store = instance.stores[storeName];
    var config = store.StoreModel.config;

    store[Sym.LIFECYCLE].emit('snapshot');
    var customSnapshot = config.onSerialize && config.onSerialize(store[Sym.STATE_CONTAINER]);
    obj[storeName] = customSnapshot ? customSnapshot : store.getState();
    return obj;
  }, {});
}

function saveInitialSnapshot(instance, key) {
  var state = instance.deserialize(instance.serialize(instance.stores[key][Sym.STATE_CONTAINER]));
  instance[Sym.INIT_SNAPSHOT][key] = state;
  instance[Sym.LAST_SNAPSHOT][key] = state;
}

function filterSnapshots(instance, state, stores) {
  return stores.reduce(function (obj, store) {
    var storeName = store.displayName || store;
    if (!state[storeName]) {
      throw new ReferenceError('' + storeName + ' is not a valid store');
    }
    obj[storeName] = state[storeName];
    return obj;
  }, {});
}
},{"../../utils/functions":38,"../symbols/symbols":30}],33:[function(require,module,exports){
"use strict";

var globalSymbolRegistryList = {};

// Aliases & Helpers
var make = Object.create;
var defProps = Object.defineProperties;
var defProp = Object.defineProperty;
var defValue = function (value) {
  var opts = arguments[1] === undefined ? {} : arguments[1];
  return {
    value: value,
    configurable: !!opts.c,
    writable: !!opts.w,
    enumerable: !!opts.e
  };
};
var isSymbol = function (symbol) {
  return symbol && symbol[xSymbol.toStringTag] === "Symbol";
};

var supportsAccessors = undefined;
try {
  var x = defProp({}, "y", { get: function () {
      return 1;
    } });
  supportsAccessors = x.y === 1;
} catch (e) {
  supportsAccessors = false;
}

var id = {};
var uid = function (desc) {
  desc = String(desc);
  var x = "";
  var i = 0;
  while (id[desc + x]) {
    x = i += 1;
  }
  id[desc + x] = 1;

  var tag = "Symbol(" + desc + "" + x + ")";

  /* istanbul ignore else */
  if (supportsAccessors) {
    // Make the symbols hidden to pre-es6 code
    defProp(Object.prototype, tag, {
      get: undefined,
      set: function (value) {
        defProp(this, tag, defValue(value, { c: true, w: true }));
      },
      configurable: true,
      enumerable: false
    });
  }

  return tag;
};

// The base symbol
var SymbolProto = make(null);

// 19.4.1.1
function xSymbol(descString) {
  if (this instanceof xSymbol) {
    throw new TypeError("Symbol is not a constructor");
  }

  descString = descString === undefined ? "" : String(descString);

  var tag = uid(descString);

  /* istanbul ignore next */
  if (!supportsAccessors) {
    return tag;
  }

  return make(SymbolProto, {
    __description__: defValue(descString),
    __tag__: defValue(tag)
  });
}

defProps(xSymbol, {
  // 19.4.2.1
  "for": defValue(function (key) {
    var stringKey = String(key);

    if (globalSymbolRegistryList[stringKey]) {
      return globalSymbolRegistryList[stringKey];
    }

    var symbol = xSymbol(stringKey);
    globalSymbolRegistryList[stringKey] = symbol;

    return symbol;
  }),

  // 19.4.2.5
  keyFor: defValue(function (sym) {
    if (supportsAccessors && !isSymbol(sym)) {
      throw new TypeError("" + sym + " is not a symbol");
    }

    for (var key in globalSymbolRegistryList) {
      if (globalSymbolRegistryList[key] === sym) {
        return supportsAccessors ? globalSymbolRegistryList[key].__description__ : globalSymbolRegistryList[key].substr(7, globalSymbolRegistryList[key].length - 8);
      }
    }
  })
});

// 6.1.5.1
defProps(xSymbol, {
  hasInstance: defValue(xSymbol("hasInstance")),
  isConcatSpreadable: defValue(xSymbol("isConcatSpreadable")),
  iterator: defValue(xSymbol("iterator")),
  match: defValue(xSymbol("match")),
  replace: defValue(xSymbol("replace")),
  search: defValue(xSymbol("search")),
  species: defValue(xSymbol("species")),
  split: defValue(xSymbol("split")),
  toPrimitive: defValue(xSymbol("toPrimitive")),
  toStringTag: defValue(xSymbol("toStringTag")),
  unscopables: defValue(xSymbol("unscopables"))
});

// 19.4.3
defProps(SymbolProto, {
  constructor: defValue(xSymbol),

  // 19.4.3.2
  toString: defValue(function () {
    return this.__tag__;
  }),

  // 19.4.3.3
  valueOf: defValue(function () {
    return "Symbol(" + this.__description__ + ")";
  })
});

// 19.4.3.5
/* istanbul ignore else */
if (supportsAccessors) {
  defProp(SymbolProto, xSymbol.toStringTag, defValue("Symbol", { c: true }));
}

module.exports = typeof Symbol === "function" ? Symbol : xSymbol;


},{}],34:[function(require,module,exports){
'use strict';

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];
  if (this._events[event].fn) return [this._events[event].fn];

  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
    ee[i] = this._events[event][i].fn;
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) {
    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
      events.push(listeners);
    }
    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
        events.push(listeners[i]);
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[event] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[event];
  }

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) delete this._events[event];
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

//
// Expose the module.
//
module.exports = EventEmitter;

},{}],35:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher')

},{"./lib/Dispatcher":36}],36:[function(require,module,exports){
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @typechecks
 */

"use strict";

var invariant = require('./invariant');

var _lastID = 1;
var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *
 *         case 'city-update':
 *           FlightPriceStore.price =
 *             FlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

  function Dispatcher() {
    this.$Dispatcher_callbacks = {};
    this.$Dispatcher_isPending = {};
    this.$Dispatcher_isHandled = {};
    this.$Dispatcher_isDispatching = false;
    this.$Dispatcher_pendingPayload = null;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   *
   * @param {function} callback
   * @return {string}
   */
  Dispatcher.prototype.register=function(callback) {
    var id = _prefix + _lastID++;
    this.$Dispatcher_callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   *
   * @param {string} id
   */
  Dispatcher.prototype.unregister=function(id) {
    invariant(
      this.$Dispatcher_callbacks[id],
      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
      id
    );
    delete this.$Dispatcher_callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   *
   * @param {array<string>} ids
   */
  Dispatcher.prototype.waitFor=function(ids) {
    invariant(
      this.$Dispatcher_isDispatching,
      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
    );
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this.$Dispatcher_isPending[id]) {
        invariant(
          this.$Dispatcher_isHandled[id],
          'Dispatcher.waitFor(...): Circular dependency detected while ' +
          'waiting for `%s`.',
          id
        );
        continue;
      }
      invariant(
        this.$Dispatcher_callbacks[id],
        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
        id
      );
      this.$Dispatcher_invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   *
   * @param {object} payload
   */
  Dispatcher.prototype.dispatch=function(payload) {
    invariant(
      !this.$Dispatcher_isDispatching,
      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
    );
    this.$Dispatcher_startDispatching(payload);
    try {
      for (var id in this.$Dispatcher_callbacks) {
        if (this.$Dispatcher_isPending[id]) {
          continue;
        }
        this.$Dispatcher_invokeCallback(id);
      }
    } finally {
      this.$Dispatcher_stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   *
   * @return {boolean}
   */
  Dispatcher.prototype.isDispatching=function() {
    return this.$Dispatcher_isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @param {string} id
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
    this.$Dispatcher_isPending[id] = true;
    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
    this.$Dispatcher_isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @param {object} payload
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
    for (var id in this.$Dispatcher_callbacks) {
      this.$Dispatcher_isPending[id] = false;
      this.$Dispatcher_isHandled[id] = false;
    }
    this.$Dispatcher_pendingPayload = payload;
    this.$Dispatcher_isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
    this.$Dispatcher_pendingPayload = null;
    this.$Dispatcher_isDispatching = false;
  };


module.exports = Dispatcher;

},{"./invariant":37}],37:[function(require,module,exports){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

},{}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.eachObject = eachObject;
exports.assign = assign;
var isFunction = function isFunction(x) {
  return typeof x === 'function';
};

exports.isFunction = isFunction;

function eachObject(f, o) {
  o.forEach(function (from) {
    Object.keys(Object(from)).forEach(function (key) {
      f(key, from[key]);
    });
  });
}

function assign(target) {
  for (var _len = arguments.length, source = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    source[_key - 1] = arguments[_key];
  }

  eachObject(function (key, value) {
    return target[key] = value;
  }, source);
  return target;
}
},{}],39:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

_reactRouter2['default'].run(_routes2['default'], _reactRouter2['default'].HistoryLocation, function (Handler) {
  _react2['default'].render(_react2['default'].createElement(Handler, null), document);
});

},{"./routes":17,"react":"react","react-router":"react-router"}]},{},[39]);
