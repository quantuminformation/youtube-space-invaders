// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/util/Vectors.ts":[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Dimensions2 = function Dimensions2(width, height) {
    _classCallCheck(this, Dimensions2);

    this.width = width;
    this.height = height;
};

exports.Dimensions2 = Dimensions2;

var Vector2 = function () {
    function Vector2(x, y) {
        _classCallCheck(this, Vector2);

        this.x = x;
        this.y = y;
    }

    _createClass(Vector2, [{
        key: "add",
        value: function add(otherVector) {
            return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
        }
    }, {
        key: "addTwo",
        value: function addTwo(x, y) {
            return new Vector2(this.x + x, this.y + y);
        }
    }, {
        key: "reverse",
        value: function reverse() {
            return new Vector2(-this.x, -this.y);
        }
    }, {
        key: "magnitude",
        value: function magnitude() {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }
    }, {
        key: "angle",
        value: function angle() {
            return Math.atan2(this.y, this.x) - degreesToRadians(-90);
        }
        /**
         * returns a new vector based on the current one rotated by an angle
         * @param initialVector
         * @param rotatingDegrees
         * @returns {Vector2}
         */

    }, {
        key: "rotateBy",
        value: function rotateBy(radians) {
            var newAngleRads = Math.atan2(this.x, this.y) + radians;
            var mag = this.magnitude();
            return new Vector2(mag * Math.sin(newAngleRads), mag * Math.cos(newAngleRads));
        }
    }]);

    return Vector2;
}();

exports.Vector2 = Vector2;

var Vector2Normalised = function (_Vector) {
    _inherits(Vector2Normalised, _Vector);

    function Vector2Normalised(radians) {
        _classCallCheck(this, Vector2Normalised);

        return _possibleConstructorReturn(this, (Vector2Normalised.__proto__ || Object.getPrototypeOf(Vector2Normalised)).call(this, Math.sin(radians), -Math.cos(radians)));
    }

    return Vector2Normalised;
}(Vector2);

exports.Vector2Normalised = Vector2Normalised;
function degreesToRadians(degrees) {
    return degrees / 360 * 2 * Math.PI;
}
exports.degreesToRadians = degreesToRadians;
function radiansToDegress(radians) {
    return radians * 360 / (2 * Math.PI);
}
exports.radiansToDegress = radiansToDegress;
/**
 * Returns array of vectors equally spaced measured from both sidesfor the x origin in normal maths xy chart
 * the shooter will then modify based on its rotation of the firing gun
 */
function getFanSpreadVectors(numberOfBullets, spreadAngleRadians) {
    var arr = [];
    var angleGap = spreadAngleRadians / numberOfBullets;
    var startingAngle = spreadAngleRadians / 2;
    for (var i = 0; i < numberOfBullets; i++) {
        var nextAngle = startingAngle - i * angleGap;
        arr.push(new Vector2Normalised(nextAngle));
    }
    return arr;
}
exports.getFanSpreadVectors = getFanSpreadVectors;
},{}],"src/constants/GameSettings.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GAME_SPEED = 50; // the higher the number the faster the game will run, all movemments are effected by this number
exports.VERY_SLOW_MOVEMENT_SPEED = 1;
exports.SLOW_MOVEMENT_SPEED = 2;
exports.MEDIUM_MOVEMENT_SPEED = 4;
exports.FAST_MOVEMENT_SPEED = 6;
exports.VERY_FAST_MOVEMENT_SPEED = 12;
exports.MEDIUM_FONT_SIZE = 14;
exports.LARGE_FONT_SIZE = 20;
},{}],"src/gameObjects/Bullets.ts":[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var SpaceInvaders_1 = require("../SpaceInvaders");
var Vectors_1 = require("../util/Vectors");
var GameSettings = require("../constants/GameSettings");

var Bullet = function () {
    function Bullet(position, directionVector) {
        _classCallCheck(this, Bullet);

        this.position = position;
        this.active = true;
        this.directionVector = directionVector;
    }

    _createClass(Bullet, [{
        key: "inBounds",
        value: function inBounds() {
            return this.position.x >= 0 && this.position.x - this.dimensions.width <= SpaceInvaders_1.SpaceInvaders.CANVAS_WIDTH && this.position.y >= 0 && this.position.y - this.dimensions.height <= SpaceInvaders_1.SpaceInvaders.CANVAS_HEIGHT;
        }
    }]);

    return Bullet;
}();

Bullet.SMALL_SIZE = 3;
Bullet.LARGE_SIZE = 9;
exports.Bullet = Bullet;

var BasicBullet = function (_Bullet) {
    _inherits(BasicBullet, _Bullet);

    function BasicBullet(position, directionVector) {
        _classCallCheck(this, BasicBullet);

        var _this = _possibleConstructorReturn(this, (BasicBullet.__proto__ || Object.getPrototypeOf(BasicBullet)).call(this, position, directionVector));

        _this.position = position;
        _this.dimensions = new Vectors_1.Dimensions2(Bullet.SMALL_SIZE, Bullet.SMALL_SIZE);
        _this.color = 'white';
        _this.damageInflicted = 1;
        return _this;
    }

    _createClass(BasicBullet, [{
        key: "draw",
        value: function draw(canvas) {
            canvas.fillStyle = this.color;
            canvas.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        }
    }, {
        key: "update",
        value: function update(elapsedUnit) {
            this.position.x += this.directionVector.x * elapsedUnit * GameSettings.MEDIUM_MOVEMENT_SPEED;
            this.position.y += this.directionVector.y * elapsedUnit * GameSettings.MEDIUM_MOVEMENT_SPEED;
            this.active = this.active && this.inBounds();
        }
    }]);

    return BasicBullet;
}(Bullet);

exports.BasicBullet = BasicBullet;
},{"../SpaceInvaders":"src/SpaceInvaders.ts","../util/Vectors":"src/util/Vectors.ts","../constants/GameSettings":"src/constants/GameSettings.ts"}],"src/constants/GameStates.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.INITIALISING = 'INITIALISING';
exports.GAME_OVER = 'GAME_OVER';
exports.BATTLE_MODE = 'BATTLE_MODE';
exports.YOU_WIN = 'YOU_WIN';
},{}],"src/images/player.svg":[function(require,module,exports) {
module.exports = "/player.1f50a6df.svg";
},{}],"src/gameObjects/Player.ts":[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Vectors_1 = require("../util/Vectors");
var Bullets_1 = require("./Bullets");
var GameSettings_1 = require("../constants/GameSettings");
var GameStates_1 = require("../constants/GameStates");
var SpaceInvaders_1 = require("../SpaceInvaders");

var Player = function () {
    function Player(position) {
        _classCallCheck(this, Player);

        this.color = '#0FF';
        this.dimensions = new Vectors_1.Dimensions2(Player.DEFAULT_WIDTH, Player.DEFAULT_HEIGHT);
        this.health = 3;
        this.lastShotTime = 0;
        this.fireRatePerSec = 4;
        this.directionVector = new Vectors_1.Vector2(0, 0);
        this.position = position;
    }

    _createClass(Player, [{
        key: "draw",
        value: function draw(context2D) {
            context2D.drawImage(img, this.position.x, this.position.y);
        }
    }, {
        key: "update",
        value: function update(elapsedUnit) {
            this.position.x += this.directionVector.x * elapsedUnit * GameSettings_1.MEDIUM_MOVEMENT_SPEED;
            this.position.y += this.directionVector.y * elapsedUnit * GameSettings_1.MEDIUM_MOVEMENT_SPEED;
        }
    }, {
        key: "midpoint",
        value: function midpoint() {
            return new Vectors_1.Vector2(this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height / 2);
        }
    }, {
        key: "explode",
        value: function explode() {
            SpaceInvaders_1.SpaceInvaders.gameState = GameStates_1.GAME_OVER;
            var myAudio = document.createElement('audio');
            // todo
            // myAudio.src = require('file?name=playerExplosion.mp3!../audio/playerExplosion.mp3')
            // myAudio.play()
        }
    }, {
        key: "shootAhead",
        value: function shootAhead() {
            // todo Sound.play('shoot')
            var timeDifference = new Date().getTime() - this.lastShotTime;
            if (timeDifference > 1000 / this.fireRatePerSec) {
                this.lastShotTime = new Date().getTime();
                return new Bullets_1.BasicBullet(this.midpoint(), new Vectors_1.Vector2Normalised(0));
            } else {
                return null;
            }
        }
    }, {
        key: "updateDirection",
        value: function updateDirection(directionVector) {
            this.directionVector = directionVector;
        }
    }, {
        key: "remainStationary",
        value: function remainStationary() {
            this.directionVector.x = 0;
            this.directionVector.y = 0;
        }
    }, {
        key: "takeDamage",
        value: function takeDamage(bullet) {
            this.health -= bullet.damageInflicted;
            if (this.health <= 0) {
                this.explode();
            }
        }
    }]);

    return Player;
}();

Player.DEFAULT_HEIGHT = 30;
Player.DEFAULT_WIDTH = 60;
exports.Player = Player;
var img = new Image();
img.src = require('../images/player.svg');
},{"../util/Vectors":"src/util/Vectors.ts","./Bullets":"src/gameObjects/Bullets.ts","../constants/GameSettings":"src/constants/GameSettings.ts","../constants/GameStates":"src/constants/GameStates.ts","../SpaceInvaders":"src/SpaceInvaders.ts","../images/player.svg":"src/images/player.svg"}],"src/constants/Keycodes.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY_CODES = {
    RETURN: 13,
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ZERO: 48,
    ONE: 49,
    TWO: 50
};
},{}],"src/util/Canvas2D_tools.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameMath = require("./Vectors");
function rotateAndPaintImage(context, image, angleInDegrees, positionX, positionY, axisX, axisY) {
    var angleInRadians = GameMath.degreesToRadians(angleInDegrees);
    context.translate(positionX, positionY);
    context.rotate(angleInRadians);
    context.drawImage(image, -axisX, -axisY);
    context.rotate(-angleInRadians);
    context.translate(-positionX, -positionY);
}
exports.rotateAndPaintImage = rotateAndPaintImage;
},{"./Vectors":"src/util/Vectors.ts"}],"src/gameObjects/AbstractInvader.ts":[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Vectors_1 = require("../util/Vectors");
var Bullets_1 = require("./Bullets");
var GameSettings = require("../constants/GameSettings");
var SpaceInvaders_1 = require("../SpaceInvaders");
var Canvas2D_tools_1 = require("../util/Canvas2D_tools");

var AbstractInvader = function () {
    function AbstractInvader(position) {
        _classCallCheck(this, AbstractInvader);

        this.position = position;
        this.health = 1;
        this.dimensions = new Vectors_1.Dimensions2(AbstractInvader.DEFAULT_WIDTH, AbstractInvader.DEFAULT_HEIGHT);
        this.active = true;
        this.probabilityOfShooting = 0.0005; // on each game frame
        this.rotationInDegrees = 180; // todo this will change
        this.image = new Image();
        this.directionVector = new Vectors_1.Vector2(0, 0);
        this.facingAngleRad = Math.PI; // pointing down for now
    }

    _createClass(AbstractInvader, [{
        key: "draw",
        value: function draw(ctx) {
            Canvas2D_tools_1.rotateAndPaintImage(ctx, this.image, 180, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        }
    }, {
        key: "midpoint",
        value: function midpoint() {
            return new Vectors_1.Vector2(this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height / 2);
        }
    }, {
        key: "explode",
        value: function explode() {
            this.active = false;
            SpaceInvaders_1.SpaceInvaders.score += this.pointsValue;
            // todo boom graphic
        }
    }, {
        key: "reverse",
        value: function reverse() {
            this.directionVector.x = -this.directionVector.x;
            this.directionVector.y = -this.directionVector.y;
            // todo boom graphic
        }
    }, {
        key: "updateDirection",
        value: function updateDirection(directionVector) {
            this.directionVector = directionVector;
        }
    }, {
        key: "update",
        value: function update(elapsedUnit) {
            this.position.x += this.directionVector.x * elapsedUnit * GameSettings.VERY_SLOW_MOVEMENT_SPEED;
        }
    }, {
        key: "shootAhead",
        value: function shootAhead() {
            // todo Sound.play('shoot')
            return [new Bullets_1.BasicBullet(this.midpoint(), new Vectors_1.Vector2(0, 1))];
        }
    }, {
        key: "takeHit",
        value: function takeHit(bullet) {
            this.health -= bullet.damageInflicted;
            if (this.health <= 0) {
                this.explode();
            }
        }
    }]);

    return AbstractInvader;
}();

AbstractInvader.DEFAULT_HEIGHT = 20;
AbstractInvader.DEFAULT_WIDTH = 30;
exports.AbstractInvader = AbstractInvader;
},{"../util/Vectors":"src/util/Vectors.ts","./Bullets":"src/gameObjects/Bullets.ts","../constants/GameSettings":"src/constants/GameSettings.ts","../SpaceInvaders":"src/SpaceInvaders.ts","../util/Canvas2D_tools":"src/util/Canvas2D_tools.ts"}],"src/util/Conversions.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function degreesToRadians(degrees) {
    return degrees / 360 * 2 * Math.PI;
}
exports.degreesToRadians = degreesToRadians;
function radiansToDegress(radians) {
    return radians * 360 / (2 * Math.PI);
}
exports.radiansToDegress = radiansToDegress;
},{}],"src/images/lightInvader.svg":[function(require,module,exports) {
module.exports = "/lightInvader.ce2acc7d.svg";
},{}],"src/images/MediumInvader.svg":[function(require,module,exports) {
module.exports = "/MediumInvader.9433c889.svg";
},{}],"src/images/HeavyInvader.svg":[function(require,module,exports) {
module.exports = "/HeavyInvader.bc5ada9b.svg";
},{}],"src/gameObjects/Invaders.ts":[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var Vectors_1 = require("../util/Vectors");
var Bullets_1 = require("./Bullets");
var AbstractInvader_1 = require("./AbstractInvader");
var Conversions_1 = require("../util/Conversions");

var LightInvader = function (_AbstractInvader_1$Ab) {
    _inherits(LightInvader, _AbstractInvader_1$Ab);

    function LightInvader() {
        var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vectors_1.Vector2(0, 0);

        _classCallCheck(this, LightInvader);

        var _this = _possibleConstructorReturn(this, (LightInvader.__proto__ || Object.getPrototypeOf(LightInvader)).call(this, position));

        _this.probabilityOfShooting = 0.001;
        _this.health = 1;
        _this.pointsValue = 10;
        _this.image.src = require('../images/lightInvader.svg');
        return _this;
    }

    return LightInvader;
}(AbstractInvader_1.AbstractInvader);

exports.LightInvader = LightInvader;

var MediumInvader = function (_AbstractInvader_1$Ab2) {
    _inherits(MediumInvader, _AbstractInvader_1$Ab2);

    function MediumInvader() {
        var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vectors_1.Vector2(0, 0);

        _classCallCheck(this, MediumInvader);

        var _this2 = _possibleConstructorReturn(this, (MediumInvader.__proto__ || Object.getPrototypeOf(MediumInvader)).call(this, position));

        _this2.probabilityOfShooting = 0.002;
        _this2.health = 3;
        _this2.pointsValue = 30;
        _this2.image.src = require('../images/MediumInvader.svg');
        return _this2;
    }

    return MediumInvader;
}(AbstractInvader_1.AbstractInvader);

exports.MediumInvader = MediumInvader;

var HeavyInvader = function (_AbstractInvader_1$Ab3) {
    _inherits(HeavyInvader, _AbstractInvader_1$Ab3);

    function HeavyInvader() {
        var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vectors_1.Vector2(0, 0);

        _classCallCheck(this, HeavyInvader);

        var _this3 = _possibleConstructorReturn(this, (HeavyInvader.__proto__ || Object.getPrototypeOf(HeavyInvader)).call(this, position));

        _this3.probabilityOfShooting = 0.004;
        _this3.pointsValue = 60;
        _this3.health = 5;
        _this3.image.src = require('../images/HeavyInvader.svg');
        return _this3;
    }

    _createClass(HeavyInvader, [{
        key: "shootAhead",
        value: function shootAhead() {
            var _this4 = this;

            // todo Sound.play('shoot')
            var self = this;
            var x = Math.random();
            if (x >= 0 && x <= 0.75) {
                return [new Bullets_1.BasicBullet(this.midpoint(), new Vectors_1.Vector2Normalised(0))];
            } else {
                var vectors = Vectors_1.getFanSpreadVectors(10, Conversions_1.degreesToRadians(45));
                var bulletsToFire = [];
                vectors.forEach(function (item) {
                    var b = new Bullets_1.BasicBullet(_this4.midpoint(), new Vectors_1.Vector2Normalised(_this4.facingAngleRad + item.angle()));
                    bulletsToFire.push(b);
                });
                return bulletsToFire;
            }
        }
    }]);

    return HeavyInvader;
}(AbstractInvader_1.AbstractInvader);

exports.HeavyInvader = HeavyInvader;
},{"../util/Vectors":"src/util/Vectors.ts","./Bullets":"src/gameObjects/Bullets.ts","./AbstractInvader":"src/gameObjects/AbstractInvader.ts","../util/Conversions":"src/util/Conversions.ts","../images/lightInvader.svg":"src/images/lightInvader.svg","../images/MediumInvader.svg":"src/images/MediumInvader.svg","../images/HeavyInvader.svg":"src/images/HeavyInvader.svg"}],"src/util/MathChecks.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isSquare(n) {
    return n > 0 && Math.sqrt(n) % 1 === 0;
}
exports.isSquare = isSquare;
},{}],"src/util/Formations.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MathChecks_1 = require("./MathChecks");
var Vectors_1 = require("./Vectors");
/**
 * modifys an array of objects so their position is in a triangle
 *
 * let row number = n
 * each row contains (n*2)-1
 *
 * total rows = n^2
 * must be a perfect square of units
 * we render each unit from the bottom left
 *
 * looks like:
 *     1
 *    111
 *   11111
 *  1111111
 *
 * @param gameObjects
 */
function triangle(gameObjects, horizontalGap, verticalGap) {
    if (!MathChecks_1.isSquare(gameObjects.length)) {
        throw new Error('needs perfect square number of units');
    }
    var numberOfRows = Math.sqrt(gameObjects.length);
    var nextRowOffset = new Vectors_1.Vector2(0, 0);
    var thisRowStartingIndex = 0;
    for (var i = numberOfRows; i >= 1; i--) {
        var numberOnThisRow = i * 2 - 1;
        var maxHeight = 0;
        for (var j = 0; j < numberOnThisRow; j++) {
            var go = gameObjects[thisRowStartingIndex + j];
            if (go.dimensions.height > maxHeight) {
                maxHeight = go.dimensions.height;
            }
            go.position = new Vectors_1.Vector2(j * (go.dimensions.width + horizontalGap) + nextRowOffset.x, nextRowOffset.y);
        }
        nextRowOffset = nextRowOffset.addTwo(gameObjects[thisRowStartingIndex].dimensions.width + horizontalGap, maxHeight + verticalGap);
        thisRowStartingIndex = thisRowStartingIndex + numberOnThisRow;
    }
}
exports.triangle = triangle;
function rectangle(gameObjects, itemsPerRow, horizontalGap, verticalGap) {
    var numberOfRows = gameObjects.length / itemsPerRow;
    if (numberOfRows % 1 !== 0) {
        throw new Error('number / itemsPerRow must fit');
    }
    var nextRowOffset = new Vectors_1.Vector2(0, 0);
    var thisRowStartingIndex = 0;
    for (var i = 0; i < numberOfRows; i++) {
        var maxHeight = 0;
        for (var j = 0; j < itemsPerRow; j++) {
            var go = gameObjects[thisRowStartingIndex + j];
            if (go.dimensions.height > maxHeight) {
                maxHeight = go.dimensions.height;
            }
            go.position = new Vectors_1.Vector2(j * (go.dimensions.width + horizontalGap) + nextRowOffset.x, nextRowOffset.y);
        }
        nextRowOffset = nextRowOffset.addTwo(0, maxHeight + verticalGap);
        thisRowStartingIndex = thisRowStartingIndex + itemsPerRow;
    }
}
exports.rectangle = rectangle;
},{"./MathChecks":"src/util/MathChecks.ts","./Vectors":"src/util/Vectors.ts"}],"src/story/WaveManager.ts":[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Invaders_1 = require("../gameObjects/Invaders");
var Vectors_1 = require("../util/Vectors");
var Formations_1 = require("../util/Formations");

var WaveManager = function () {
    function WaveManager() {
        _classCallCheck(this, WaveManager);

        this.waves = [];
        this.currentWave = 0;
        this.generateWaves();
    }

    _createClass(WaveManager, [{
        key: "getNextWave",
        value: function getNextWave() {
            var nextWave = this.waves[this.currentWave];
            if (nextWave) {
                this.currentWave++;
                return nextWave();
            }
            return null;
        }
    }, {
        key: "generateWaves",
        value: function generateWaves() {
            var horizontalGap = 15;
            var verticalGap = 20;
            var initialXOffset = 20;
            var initialYOffset = 20;
            this.waves.push(function () {
                var units = [new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader()];
                units.forEach(function (unit) {
                    unit.updateDirection(new Vectors_1.Vector2Normalised(90));
                });
                Formations_1.rectangle(units, 4, horizontalGap, verticalGap);
                return units;
            });
            this.waves.push(function () {
                var units = [new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.MediumInvader(), new Invaders_1.MediumInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader()];
                units.forEach(function (unit) {
                    unit.updateDirection(new Vectors_1.Vector2Normalised(90));
                });
                Formations_1.rectangle(units, 8, horizontalGap, verticalGap);
                return units;
            });
            this.waves.push(function () {
                var units = [new Invaders_1.LightInvader(), new Invaders_1.MediumInvader(), new Invaders_1.HeavyInvader(), new Invaders_1.MediumInvader(), new Invaders_1.LightInvader(), new Invaders_1.MediumInvader(), new Invaders_1.MediumInvader(), new Invaders_1.MediumInvader(), new Invaders_1.LightInvader()];
                units.forEach(function (unit) {
                    unit.updateDirection(new Vectors_1.Vector2Normalised(90));
                });
                Formations_1.triangle(units, horizontalGap, verticalGap);
                return units;
            });
            this.waves.push(function () {
                var units = [new Invaders_1.LightInvader(), new Invaders_1.MediumInvader(), new Invaders_1.HeavyInvader(), new Invaders_1.HeavyInvader(), new Invaders_1.HeavyInvader(), new Invaders_1.MediumInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.MediumInvader(), new Invaders_1.HeavyInvader(), new Invaders_1.MediumInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader(), new Invaders_1.MediumInvader(), new Invaders_1.LightInvader(), new Invaders_1.LightInvader()];
                units.forEach(function (unit) {
                    unit.updateDirection(new Vectors_1.Vector2Normalised(90));
                });
                Formations_1.triangle(units, horizontalGap, verticalGap);
                return units;
            });
        }
    }]);

    return WaveManager;
}();

exports.WaveManager = WaveManager;
},{"../gameObjects/Invaders":"src/gameObjects/Invaders.ts","../util/Vectors":"src/util/Vectors.ts","../util/Formations":"src/util/Formations.ts"}],"src/util/CollisionDetection.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function rectCollides(a, b) {
    return a.position.x < b.position.x + b.dimensions.width && a.position.x + a.dimensions.width > b.position.x && a.position.y < b.position.y + b.dimensions.height && a.position.y + a.dimensions.height > b.position.y;
}
exports.rectCollides = rectCollides;
},{}],"src/gameObjects/PlayerBase.ts":[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Vectors_1 = require("../util/Vectors");

var DestructibleScenery = function () {
    function DestructibleScenery(position) {
        _classCallCheck(this, DestructibleScenery);

        this.dimensions = new Vectors_1.Dimensions2(DestructibleScenery.DEFAULT_SIZE, DestructibleScenery.DEFAULT_SIZE);
        this.color = '#0F9';
        this.active = true;
        this.position = position;
    }

    _createClass(DestructibleScenery, [{
        key: "draw",
        value: function draw(canvas) {
            canvas.fillStyle = this.color;
            if (this.active) {
                canvas.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
            }
        }
        // tslint:disable-next-line

    }, {
        key: "update",
        value: function update(elapsedUnit) {}
    }, {
        key: "explode",
        value: function explode() {
            this.active = false;
            // todo boom graphic
        }
    }]);

    return DestructibleScenery;
}();

DestructibleScenery.DEFAULT_SIZE = 5;
exports.DestructibleScenery = DestructibleScenery;
/**
 * The classic Green protective bases the player can hide behind
 */

var PlayerBase = function () {
    function PlayerBase(requestedDimensions) {
        _classCallCheck(this, PlayerBase);

        this.requestedDimensions = requestedDimensions;
        this.allDestructibleScenery = [];
        var numberPerRow = Math.floor(requestedDimensions.x / DestructibleScenery.DEFAULT_SIZE);
        var numberPerColumn = Math.floor(requestedDimensions.y / DestructibleScenery.DEFAULT_SIZE);
        this.actualDimensions = new Vectors_1.Vector2(numberPerRow * DestructibleScenery.DEFAULT_SIZE, numberPerColumn * DestructibleScenery.DEFAULT_SIZE);
        var nextPosition = void 0;
        // just rectangular bases to start with
        // todo mask values to give shapes like the original space invaders bases
        for (var i = 0; i < numberPerRow; i++) {
            nextPosition = new Vectors_1.Vector2(DestructibleScenery.DEFAULT_SIZE * i, 0);
            for (var j = 0; j < numberPerColumn; j++) {
                nextPosition = nextPosition.addTwo(0, DestructibleScenery.DEFAULT_SIZE);
                this.allDestructibleScenery.push(new DestructibleScenery(nextPosition));
            }
        }
    }

    _createClass(PlayerBase, [{
        key: "draw",
        value: function draw(canvas) {
            var self = this;
            self.allDestructibleScenery.forEach(function (item) {
                item.draw(canvas);
            });
        }
    }, {
        key: "transform",
        value: function transform(position) {
            this.allDestructibleScenery.forEach(function (item) {
                item.position = item.position.add(position);
            });
        }
    }]);

    return PlayerBase;
}();

exports.PlayerBase = PlayerBase;
},{"../util/Vectors":"src/util/Vectors.ts"}],"src/images/backgrounds/sunrise.jpg":[function(require,module,exports) {
module.exports = "/sunrise.305dc9b8.jpg";
},{}],"src/SpaceInvaders.ts":[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./gameObjects/Player");
var Vectors_1 = require("./util/Vectors");
var Keycodes_1 = require("./constants/Keycodes");
var GameSettings = require("./constants/GameSettings");
var GameStates_1 = require("./constants/GameStates");
var WaveManager_1 = require("./story/WaveManager");
var CollisionDetection_1 = require("./util/CollisionDetection");
var Conversions_1 = require("./util/Conversions");
var PlayerBase_1 = require("./gameObjects/PlayerBase");

var SpaceInvaders = function () {
    /**
     * Basically we figure out the best width for our canvas at start up.
     */
    function SpaceInvaders(hostElement) {
        _classCallCheck(this, SpaceInvaders);

        this.waveManager = new WaveManager_1.WaveManager();
        this.playerOffsetHeight = 20;
        this.playerBullets = [];
        this.bases = [];
        this.invaderBullets = [];
        this.background = new Image();
        this.spaceColor = 'black';
        this.keyStatus = {};
        this.lastFrame = new Date().getTime();
        this.canvas = hostElement;
        new Date().getTime();
        this.context2D = this.canvas.getContext('2d');
        this.canvas.width = SpaceInvaders.CANVAS_WIDTH;
        this.canvas.height = this.canvas.width / SpaceInvaders.ASPECT_RATIO;
        this.background.src = require('./images/backgrounds/sunrise.jpg');
        // all keys are down to start
        for (var code in Keycodes_1.KEY_CODES) {
            this.keyStatus[Keycodes_1.KEY_CODES[code]] = false;
        }
        this.initGame();
    }

    _createClass(SpaceInvaders, [{
        key: "update",
        value: function update() {
            var start = new Date().getTime();
            var elapsedTime = start - this.lastFrame;
            // get the current time as seconds then multiple by the game speed to get a sensible number for multiplying velocities per frame
            var elapsedReduced = elapsedTime / 1000.0 * GameSettings.GAME_SPEED;
            this.drawBackground();
            switch (SpaceInvaders.gameState) {
                case GameStates_1.INITIALISING:
                    this.drawInit();
                    return;
                case GameStates_1.YOU_WIN:
                    this.drawYouWin();
                    return;
                case GameStates_1.GAME_OVER:
                    this.drawGameOver();
                    return;
            }
            // battle mode
            this.updatePlayer(elapsedReduced);
            this.updateEnemies(elapsedReduced);
            this.updateBullets(elapsedReduced);
            this.updateBases();
            this.handleCollisions();
            if (this.invaders.length === 0) {
                this.invaders = this.waveManager.getNextWave();
                if (!this.invaders) {
                    SpaceInvaders.gameState = GameStates_1.YOU_WIN;
                    return;
                }
            }
            this.drawBattleScene();
            this.lastFrame = start;
        }
        /**
         * We want equally spaced bases  like this:
         *
         *
         * |                                        |
         * |                                        |
         * |                                        |
         * |                                        |
         * |     ###           ###          ###     |
         * |                                        |
         * |                                        |
         * |                                        |
         *
         */

    }, {
        key: "createBases",
        value: function createBases(noOfBases, containedWithinDimensions) {
            var edgeSpace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 40;

            var bases = []; // clear old one if there
            for (var i = 0; i < noOfBases; i++) {
                this.bases.push(new PlayerBase_1.PlayerBase(containedWithinDimensions));
            }
            var freeSpace = SpaceInvaders.CANVAS_WIDTH - edgeSpace * 2 - noOfBases * this.bases[0].actualDimensions.x;
            var spaceBetween = freeSpace / (noOfBases - 1);
            // assume that all bases are same size
            for (var _i = 0; _i < noOfBases; _i++) {
                var nextPos = new Vectors_1.Vector2(_i * (this.bases[0].actualDimensions.x + spaceBetween) + edgeSpace, 500);
                this.bases[_i].transform(nextPos);
            }
        }
    }, {
        key: "drawInit",
        value: function drawInit() {
            this.context2D.fillStyle = '#0FF';
            this.context2D.font = GameSettings.LARGE_FONT_SIZE + 'px Verdana';
            this.context2D.fillText('Loading..', 5, 25);
            SpaceInvaders.gameState = GameStates_1.BATTLE_MODE;
        }
    }, {
        key: "drawGameOver",
        value: function drawGameOver() {
            this.context2D.fillStyle = '#F00';
            this.context2D.font = GameSettings.LARGE_FONT_SIZE + 'px Verdana';
            this.context2D.fillText('SpaceInvaders over!', 5, 25);
        }
    }, {
        key: "drawYouWin",
        value: function drawYouWin() {
            this.context2D.fillStyle = '#FF0';
            this.context2D.font = GameSettings.LARGE_FONT_SIZE + 'px Verdana';
            this.context2D.fillText('YOU win!', 5, 25);
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(evt) {
            this.keyStatus[evt.keyCode] = true;
        }
    }, {
        key: "onKeyUp",
        value: function onKeyUp(evt) {
            this.keyStatus[evt.keyCode] = false;
        }
    }, {
        key: "initGame",
        value: function initGame() {
            // bottom middle
            this.player = new Player_1.Player(new Vectors_1.Vector2(SpaceInvaders.CANVAS_WIDTH / 2, this.canvas.height - this.playerOffsetHeight - Player_1.Player.DEFAULT_HEIGHT));
            this.invaders = this.waveManager.getNextWave();
            this.createBases(3, new Vectors_1.Vector2(100, 30));
        }
        /**
         * Remove scenery that has been hit
         */

    }, {
        key: "updateBases",
        value: function updateBases() {
            var self = this;
            self.bases.forEach(function (base) {
                base.allDestructibleScenery = base.allDestructibleScenery.filter(function (particle) {
                    return particle.active;
                });
            });
        }
    }, {
        key: "drawBackground",
        value: function drawBackground() {
            this.context2D.fillStyle = this.spaceColor;
            this.context2D.fillRect(0, 0, SpaceInvaders.CANVAS_WIDTH, SpaceInvaders.CANVAS_HEIGHT);
            this.context2D.drawImage(this.background, -200, 0);
        }
    }, {
        key: "drawScore",
        value: function drawScore() {
            this.context2D.fillStyle = '#0FF';
            this.context2D.font = GameSettings.MEDIUM_FONT_SIZE + 'px Verdana';
            this.context2D.fillText("Score: " + SpaceInvaders.score, 2, 14);
            this.context2D.fillText("Health: " + this.player.health, 2, SpaceInvaders.CANVAS_HEIGHT - 6);
        }
    }, {
        key: "drawBattleScene",
        value: function drawBattleScene() {
            this.drawScore();
            var self = this;
            this.invaders.forEach(function (thing) {
                thing.draw(self.context2D);
            });
            this.playerBullets.forEach(function (thing) {
                thing.draw(self.context2D);
            });
            this.invaderBullets.forEach(function (thing) {
                thing.draw(self.context2D);
            });
            this.bases.forEach(function (thing) {
                thing.draw(self.context2D);
            });
            this.player.draw(this.context2D);
        }
    }, {
        key: "updatePlayer",
        value: function updatePlayer(elapsedTime) {
            if (this.keyStatus[Keycodes_1.KEY_CODES.LEFT]) {
                if (this.keyStatus[Keycodes_1.KEY_CODES.UP]) {
                    this.player.updateDirection(new Vectors_1.Vector2Normalised(Conversions_1.degreesToRadians(305)));
                } else if (this.keyStatus[Keycodes_1.KEY_CODES.DOWN]) {
                    this.player.updateDirection(new Vectors_1.Vector2Normalised(Conversions_1.degreesToRadians(225)));
                } else {
                    this.player.updateDirection(new Vectors_1.Vector2Normalised(Conversions_1.degreesToRadians(270)));
                }
            } else if (this.keyStatus[Keycodes_1.KEY_CODES.RIGHT]) {
                if (this.keyStatus[Keycodes_1.KEY_CODES.UP]) {
                    this.player.updateDirection(new Vectors_1.Vector2Normalised(Conversions_1.degreesToRadians(45)));
                } else if (this.keyStatus[Keycodes_1.KEY_CODES.DOWN]) {
                    this.player.updateDirection(new Vectors_1.Vector2Normalised(Conversions_1.degreesToRadians(135)));
                } else {
                    this.player.updateDirection(new Vectors_1.Vector2Normalised(Conversions_1.degreesToRadians(90)));
                }
            } else if (this.keyStatus[Keycodes_1.KEY_CODES.UP]) {
                this.player.updateDirection(new Vectors_1.Vector2Normalised(Conversions_1.degreesToRadians(0)));
            } else if (this.keyStatus[Keycodes_1.KEY_CODES.DOWN]) {
                this.player.updateDirection(new Vectors_1.Vector2Normalised(Conversions_1.degreesToRadians(180)));
            } else {
                this.player.remainStationary();
            }
            if (this.keyStatus[Keycodes_1.KEY_CODES.SPACE]) {
                var bullet = this.player.shootAhead();
                if (bullet) {
                    this.playerBullets.push(bullet);
                }
            }
            this.player.update(elapsedTime);
            this.clamp(this.player);
        }
    }, {
        key: "ReverseEnemyDirectionIfOutOfBoundsAndDropDown",
        value: function ReverseEnemyDirectionIfOutOfBoundsAndDropDown() {
            var outOfBoundsBy = 0;
            this.invaders.forEach(function (item) {
                if (item.position.x < 0) {
                    outOfBoundsBy = item.position.x;
                    return;
                } else if (item.position.x > SpaceInvaders.CANVAS_WIDTH - item.dimensions.width) {
                    outOfBoundsBy = item.position.x - (SpaceInvaders.CANVAS_WIDTH - item.dimensions.width);
                    return;
                }
            });
            if (outOfBoundsBy === 0) {
                return;
            }
            this.invaders.forEach(function (enemy) {
                // moving to the right
                enemy.position.x -= outOfBoundsBy;
                enemy.reverse();
                enemy.position.y += 10;
            });
        }
    }, {
        key: "updateEnemies",
        value: function updateEnemies(elapsedUnit) {
            var self = this;
            self.invaders = self.invaders.filter(function (enemy) {
                return enemy.active;
            });
            self.invaders.forEach(function (enemy) {
                enemy.update(elapsedUnit); // this might move things out of bounds so check next
                //  self.clamp(enemy)
            });
            self.ReverseEnemyDirectionIfOutOfBoundsAndDropDown();
            self.invaders.forEach(function (invader) {
                if (Math.random() < invader.probabilityOfShooting) {
                    self.invaderBullets = self.invaderBullets.concat(invader.shootAhead());
                }
            });
        }
    }, {
        key: "updateBullets",
        value: function updateBullets(elapsedUnit) {
            this.playerBullets = this.playerBullets.filter(function (bullet) {
                return bullet.active;
            });
            this.playerBullets.forEach(function (bullet) {
                bullet.update(elapsedUnit);
            });
            this.invaderBullets = this.invaderBullets.filter(function (bullet) {
                return bullet.active;
            });
            this.invaderBullets.forEach(function (bullet) {
                bullet.update(elapsedUnit);
            });
        }
    }, {
        key: "handleCollisions",
        value: function handleCollisions() {
            var self = this;
            self.playerBullets.forEach(function (bullet) {
                self.invaders.forEach(function (invader) {
                    if (CollisionDetection_1.rectCollides(bullet, invader)) {
                        invader.takeHit(bullet);
                        bullet.active = false;
                    }
                });
                self.bases.forEach(function (base) {
                    base.allDestructibleScenery.forEach(function (particle) {
                        if (CollisionDetection_1.rectCollides(bullet, particle)) {
                            particle.explode();
                            bullet.active = false;
                        }
                    });
                });
            });
            self.invaderBullets.forEach(function (bullet) {
                if (CollisionDetection_1.rectCollides(bullet, self.player)) {
                    self.player.takeDamage(bullet);
                    var postionCopy = JSON.parse(JSON.stringify(self.player.position));
                    bullet.active = false;
                }
                self.bases.forEach(function (base) {
                    base.allDestructibleScenery.forEach(function (particle) {
                        if (CollisionDetection_1.rectCollides(bullet, particle)) {
                            particle.explode();
                            bullet.active = false;
                        }
                    });
                });
            });
        }
    }, {
        key: "gameOver",
        value: function gameOver() {
            alert('you lose!');
        }
    }, {
        key: "clamp",
        value: function clamp(item) {
            if (item.position.x < 0) {
                item.position.x = 0;
                return;
            } else if (item.position.x > SpaceInvaders.CANVAS_WIDTH - item.dimensions.width) {
                item.position.x = SpaceInvaders.CANVAS_WIDTH - item.dimensions.width;
                return;
            } else if (item.position.y < 0) {
                item.position.y = 0;
                return;
            } else if (item.position.y > SpaceInvaders.CANVAS_HEIGHT - item.dimensions.height) {
                item.position.y = SpaceInvaders.CANVAS_HEIGHT - item.dimensions.height;
                return;
            }
        }
    }]);

    return SpaceInvaders;
}();

SpaceInvaders.ASPECT_RATIO = 1; // keep it square for now
SpaceInvaders.CANVAS_WIDTH = 600;
SpaceInvaders.CANVAS_HEIGHT = SpaceInvaders.CANVAS_WIDTH / SpaceInvaders.ASPECT_RATIO;
SpaceInvaders.gameState = GameStates_1.INITIALISING;
SpaceInvaders.score = 0;
exports.SpaceInvaders = SpaceInvaders;
},{"./gameObjects/Player":"src/gameObjects/Player.ts","./util/Vectors":"src/util/Vectors.ts","./constants/Keycodes":"src/constants/Keycodes.ts","./constants/GameSettings":"src/constants/GameSettings.ts","./constants/GameStates":"src/constants/GameStates.ts","./story/WaveManager":"src/story/WaveManager.ts","./util/CollisionDetection":"src/util/CollisionDetection.ts","./util/Conversions":"src/util/Conversions.ts","./gameObjects/PlayerBase":"src/gameObjects/PlayerBase.ts","./images/backgrounds/sunrise.jpg":"src/images/backgrounds/sunrise.jpg"}],"index.js":[function(require,module,exports) {
'use strict';

var _SpaceInvaders = require('./src/SpaceInvaders');

// this is where everything starts
var game = new _SpaceInvaders.SpaceInvaders(document.querySelector('#canvas'));

// game.handleCollisions.bind(game)
window.addEventListener('keydown', game.onKeyDown.bind(game));
window.addEventListener('keyup', game.onKeyUp.bind(game));

function gameLoop() {
  requestAnimationFrame(gameLoop);
  // Drawing code goes here
  game.update();
}

gameLoop();
},{"./src/SpaceInvaders":"src/SpaceInvaders.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '60803' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/youtube-space-invaders.24041856.map