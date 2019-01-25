var SpaceInvaders =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_SpaceInvaders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/SpaceInvaders */ "./src/SpaceInvaders.ts");


// this is where everything starts
let game = new _src_SpaceInvaders__WEBPACK_IMPORTED_MODULE_0__["SpaceInvaders"](document.querySelector('#game-canvas'));
// game.handleCollisions.bind(game)
window.addEventListener('keydown', game.onKeyDown.bind(game));
window.addEventListener('keyup', game.onKeyUp.bind(game));
document.querySelector('#leftBtn').addEventListener('click', function () {
    //const newEvent = new CustomEvent(Actions.MOVE_LEFT)
    const newEvent = new CustomEvent(_src_SpaceInvaders__WEBPACK_IMPORTED_MODULE_0__["Actions"].MOVE_LEFT);
    document.body.dispatchEvent(newEvent);
});
document.querySelector('#rightBtn').addEventListener('click', function () {
    const newEvent = new CustomEvent(_src_SpaceInvaders__WEBPACK_IMPORTED_MODULE_0__["Actions"].MOVE_RIGHT);
    document.body.dispatchEvent(newEvent);
});
document.querySelector('#upBtn').addEventListener('click', function () {
    const newEvent = new CustomEvent(_src_SpaceInvaders__WEBPACK_IMPORTED_MODULE_0__["Actions"].MOVE_UP);
    document.body.dispatchEvent(newEvent);
});
document.querySelector('#downBtn').addEventListener('click', function () {
    const newEvent = new CustomEvent(_src_SpaceInvaders__WEBPACK_IMPORTED_MODULE_0__["Actions"].MOVE_DOWN);
    document.body.dispatchEvent(newEvent);
});
function gameLoop() {
    requestAnimationFrame(gameLoop);
    // Drawing code goes here
    game.update();
}
gameLoop();


/***/ }),

/***/ "./src/SpaceInvaders.ts":
/*!******************************!*\
  !*** ./src/SpaceInvaders.ts ***!
  \******************************/
/*! exports provided: Actions, SpaceInvaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Actions", function() { return Actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpaceInvaders", function() { return SpaceInvaders; });
/* harmony import */ var _constants_GameSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/GameSettings */ "./src/constants/GameSettings.ts");
/* harmony import */ var _constants_GameStates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants/GameStates */ "./src/constants/GameStates.ts");
/* harmony import */ var _constants_KeyCodes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants/KeyCodes */ "./src/constants/KeyCodes.ts");
/* harmony import */ var _gameObjects_Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameObjects/Player */ "./src/gameObjects/Player.ts");
/* harmony import */ var _gameObjects_PlayerBase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameObjects/PlayerBase */ "./src/gameObjects/PlayerBase.ts");
/* harmony import */ var _story_WaveManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./story/WaveManager */ "./src/story/WaveManager.ts");
/* harmony import */ var _util_CollisionDetection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/CollisionDetection */ "./src/util/CollisionDetection.ts");
/* harmony import */ var _util_Conversions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util/Conversions */ "./src/util/Conversions.ts");
/* harmony import */ var _util_Vectors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/Vectors */ "./src/util/Vectors.ts");
/* harmony import */ var _agent_Interpreter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./agent/Interpreter */ "./src/agent/Interpreter.ts");









//import sunrise from './images/backgrounds/sunrise.jpg'
//let sunrise = require('./images/backgrounds/sunrise.jpg')

var Actions;
(function (Actions) {
    Actions["MOVE_UP"] = "MOVE_UP";
    Actions["MOVE_RIGHT"] = "MOVE_RIGHT";
    Actions["MOVE_DOWN"] = "MOVE_DOWN";
    Actions["MOVE_LEFT"] = "MOVE_LEFT";
    Actions["SHOOT"] = "SHOOT";
})(Actions || (Actions = {}));
class SpaceInvaders {
    /**
     * Basically we figure out the best width for our canvas at start up.
     */
    constructor(hostElement) {
        this.waveManager = new _story_WaveManager__WEBPACK_IMPORTED_MODULE_5__["WaveManager"]();
        this.playerOffsetHeight = 20;
        this.playerBullets = [];
        this.bases = [];
        this.invaderBullets = [];
        // private background = new Image() remove for now as ai agent needs as simple as possible
        this.spaceColor = 'black';
        this.keyStatus = {};
        this.ActionsOnce = {}; //only runs 1 frame
        this.lastFrame = new Date().getTime();
        this.canvas = hostElement;
        new Date().getTime();
        this.context2D = this.canvas.getContext('2d');
        this.canvas.width = SpaceInvaders.CANVAS_WIDTH;
        this.canvas.height = this.canvas.width / SpaceInvaders.ASPECT_RATIO;
        //this.background.src = sunrise
        // all keys are down to start
        for (const code in _constants_KeyCodes__WEBPACK_IMPORTED_MODULE_2__["KEY_CODES"]) {
            if (_constants_KeyCodes__WEBPACK_IMPORTED_MODULE_2__["KEY_CODES"].hasOwnProperty(code)) {
                this.keyStatus[_constants_KeyCodes__WEBPACK_IMPORTED_MODULE_2__["KEY_CODES"][code]] = false;
            }
        }
        this.initGame();
        this.setupAgent();
        this.addExternalEvents();
    }
    setupAgent() {
        this.interpreter = new _agent_Interpreter__WEBPACK_IMPORTED_MODULE_9__["Interpreter"]();
    }
    /**
     * This is for external egents to hook into the game to control it, instead of the default keyboard commands like up down shoot
     */
    addExternalEvents() {
        document.body.addEventListener(Actions.MOVE_LEFT, () => {
            this.ActionsOnce[Actions.MOVE_LEFT] = true;
        });
        document.body.addEventListener(Actions.MOVE_RIGHT, () => {
            this.ActionsOnce[Actions.MOVE_RIGHT] = true;
        });
        document.body.addEventListener(Actions.MOVE_UP, () => {
            this.ActionsOnce[Actions.MOVE_UP] = true;
        });
        document.body.addEventListener(Actions.MOVE_DOWN, () => {
            this.ActionsOnce[Actions.MOVE_DOWN] = true;
        });
    }
    update() {
        const start = new Date().getTime();
        const elapsedTime = start - this.lastFrame;
        // get the current time as seconds then multiple by the game speed to get a sensible number for multiplying velocities per frame
        const elapsedReduced = (elapsedTime / 1000.0) * _constants_GameSettings__WEBPACK_IMPORTED_MODULE_0__["GAME_SPEED"];
        this.drawBackground();
        switch (SpaceInvaders.gameState) {
            case _constants_GameStates__WEBPACK_IMPORTED_MODULE_1__["INITIALISING"]:
                this.drawInit();
                return;
            case _constants_GameStates__WEBPACK_IMPORTED_MODULE_1__["YOU_WIN"]:
                this.drawYouWin();
                return;
            case _constants_GameStates__WEBPACK_IMPORTED_MODULE_1__["GAME_OVER"]:
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
                SpaceInvaders.gameState = _constants_GameStates__WEBPACK_IMPORTED_MODULE_1__["YOU_WIN"];
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
    createBases(noOfBases, containedWithinDimensions, edgeSpace = 40) {
        const bases = []; // clear old one if there
        for (let i = 0; i < noOfBases; i++) {
            this.bases.push(new _gameObjects_PlayerBase__WEBPACK_IMPORTED_MODULE_4__["PlayerBase"](containedWithinDimensions));
        }
        const freeSpace = SpaceInvaders.CANVAS_WIDTH - edgeSpace * 2 - noOfBases * this.bases[0].actualDimensions.x;
        const spaceBetween = freeSpace / (noOfBases - 1);
        // assume that all bases are same size
        for (let i = 0; i < noOfBases; i++) {
            const nextPos = new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2"](i * (this.bases[0].actualDimensions.x + spaceBetween) + edgeSpace, 500);
            this.bases[i].transform(nextPos);
        }
    }
    drawInit() {
        this.context2D.fillStyle = '#0FF';
        this.context2D.font = _constants_GameSettings__WEBPACK_IMPORTED_MODULE_0__["LARGE_FONT_SIZE"] + 'px Verdana';
        this.context2D.fillText('Loading..', 5, 25);
        SpaceInvaders.gameState = _constants_GameStates__WEBPACK_IMPORTED_MODULE_1__["BATTLE_MODE"];
    }
    drawGameOver() {
        this.context2D.fillStyle = '#F00';
        this.context2D.font = _constants_GameSettings__WEBPACK_IMPORTED_MODULE_0__["LARGE_FONT_SIZE"] + 'px Verdana';
        this.context2D.fillText('SpaceInvaders over!', 5, 25);
    }
    drawYouWin() {
        this.context2D.fillStyle = '#FF0';
        this.context2D.font = _constants_GameSettings__WEBPACK_IMPORTED_MODULE_0__["LARGE_FONT_SIZE"] + 'px Verdana';
        this.context2D.fillText('YOU win!', 5, 25);
    }
    onKeyDown(evt) {
        this.keyStatus[evt.keyCode] = true;
    }
    onKeyUp(evt) {
        this.keyStatus[evt.keyCode] = false;
    }
    onAction(action) {
        // this.keyStatus[evt.keyCode] = false
    }
    initGame() {
        // bottom middle
        this.player = new _gameObjects_Player__WEBPACK_IMPORTED_MODULE_3__["Player"](new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2"](SpaceInvaders.CANVAS_WIDTH / 2, this.canvas.height - this.playerOffsetHeight - _gameObjects_Player__WEBPACK_IMPORTED_MODULE_3__["Player"].DEFAULT_HEIGHT));
        this.invaders = this.waveManager.getNextWave();
        this.createBases(3, new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2"](100, 30));
    }
    /**
     * Remove scenery that has been hit
     */
    updateBases() {
        this.bases.forEach((base) => {
            base.allDestructibleScenery = base.allDestructibleScenery.filter(particle => {
                return particle.active;
            });
        });
    }
    drawBackground() {
        this.context2D.fillStyle = this.spaceColor;
        this.context2D.fillRect(0, 0, SpaceInvaders.CANVAS_WIDTH, SpaceInvaders.CANVAS_HEIGHT);
    }
    drawScore() {
        this.context2D.fillStyle = '#0FF';
        this.context2D.font = _constants_GameSettings__WEBPACK_IMPORTED_MODULE_0__["MEDIUM_FONT_SIZE"] + 'px Verdana';
        this.context2D.fillText(`Score: ${SpaceInvaders.score}`, 2, 14);
        this.context2D.fillText(`Health: ${this.player.health}`, 2, SpaceInvaders.CANVAS_HEIGHT - 6);
    }
    drawBattleScene() {
        this.drawScore();
        this.invaders.forEach((thing) => {
            thing.draw(this.context2D);
        });
        this.playerBullets.forEach((thing) => {
            thing.draw(this.context2D);
        });
        this.invaderBullets.forEach((thing) => {
            thing.draw(this.context2D);
        });
        this.bases.forEach((thing) => {
            thing.draw(this.context2D);
        });
        this.player.draw(this.context2D);
        this.interpreter.readPixels();
    }
    /**
     * listens to both manual mode and agent mode at the same time
     * Manual commands always overwrite the agent
     * In manual mode the app listens to keyboard presses and agent mode to actions via dom events (see index.ts)
     * @param elapsedTime
     */
    updatePlayer(elapsedTime) {
        //  listen to agent events
        if (this.ActionsOnce[Actions.MOVE_LEFT] === true) {
            this.player.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2Normalised"](Object(_util_Conversions__WEBPACK_IMPORTED_MODULE_7__["degreesToRadians"])(270)), true);
        }
        else if (this.ActionsOnce[Actions.MOVE_RIGHT] === true) {
            this.player.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2Normalised"](Object(_util_Conversions__WEBPACK_IMPORTED_MODULE_7__["degreesToRadians"])(90)), true);
        }
        else if (this.ActionsOnce[Actions.MOVE_UP] === true) {
            this.player.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2Normalised"](Object(_util_Conversions__WEBPACK_IMPORTED_MODULE_7__["degreesToRadians"])(0)), true);
        }
        else if (this.ActionsOnce[Actions.MOVE_DOWN] === true) {
            this.player.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2Normalised"](Object(_util_Conversions__WEBPACK_IMPORTED_MODULE_7__["degreesToRadians"])(180)), true);
        }
        // listen to user keyboard (overrides the agent if it sets somethings)
        if (this.keyStatus[_constants_KeyCodes__WEBPACK_IMPORTED_MODULE_2__["KEY_CODES"].LEFT]) {
            if (this.keyStatus[_constants_KeyCodes__WEBPACK_IMPORTED_MODULE_2__["KEY_CODES"].UP]) {
                this.player.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2Normalised"](Object(_util_Conversions__WEBPACK_IMPORTED_MODULE_7__["degreesToRadians"])(305)));
            }
            else if (this.keyStatus[_constants_KeyCodes__WEBPACK_IMPORTED_MODULE_2__["KEY_CODES"].DOWN]) {
                this.player.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2Normalised"](Object(_util_Conversions__WEBPACK_IMPORTED_MODULE_7__["degreesToRadians"])(225)));
            }
            else {
                this.player.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2Normalised"](Object(_util_Conversions__WEBPACK_IMPORTED_MODULE_7__["degreesToRadians"])(270)));
            }
        }
        else if (this.keyStatus[_constants_KeyCodes__WEBPACK_IMPORTED_MODULE_2__["KEY_CODES"].RIGHT]) {
            if (this.keyStatus[_constants_KeyCodes__WEBPACK_IMPORTED_MODULE_2__["KEY_CODES"].UP]) {
                this.player.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2Normalised"](Object(_util_Conversions__WEBPACK_IMPORTED_MODULE_7__["degreesToRadians"])(45)));
            }
            else if (this.keyStatus[_constants_KeyCodes__WEBPACK_IMPORTED_MODULE_2__["KEY_CODES"].DOWN]) {
                this.player.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2Normalised"](Object(_util_Conversions__WEBPACK_IMPORTED_MODULE_7__["degreesToRadians"])(135)));
            }
            else {
                this.player.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2Normalised"](Object(_util_Conversions__WEBPACK_IMPORTED_MODULE_7__["degreesToRadians"])(90)));
            }
        }
        else if (this.keyStatus[_constants_KeyCodes__WEBPACK_IMPORTED_MODULE_2__["KEY_CODES"].UP]) {
            this.player.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2Normalised"](Object(_util_Conversions__WEBPACK_IMPORTED_MODULE_7__["degreesToRadians"])(0)));
        }
        else if (this.keyStatus[_constants_KeyCodes__WEBPACK_IMPORTED_MODULE_2__["KEY_CODES"].DOWN]) {
            this.player.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_8__["Vector2Normalised"](Object(_util_Conversions__WEBPACK_IMPORTED_MODULE_7__["degreesToRadians"])(180)));
        }
        else {
            // this cancels the movement of any manual input if non of the flags are set, we don't do it if agent moved
            if (Object.entries(this.ActionsOnce).length === 0 &&
                this.ActionsOnce.constructor === Object) {
                this.player.remainStationary();
            }
        }
        if (this.keyStatus[_constants_KeyCodes__WEBPACK_IMPORTED_MODULE_2__["KEY_CODES"].SPACE]) {
            const bullet = this.player.shootAhead();
            if (bullet) {
                this.playerBullets.push(bullet);
            }
        }
        /* if (this.isAgentMode) {
           // reset states
           this.keyStatus[KEY_CODES.LEFT] = false
           this.keyStatus[KEY_CODES.RIGHT] = false
           this.keyStatus[KEY_CODES.UP] = false
           this.keyStatus[KEY_CODES.DOWN] = false
         }*/
        this.player.update(elapsedTime);
        this.clamp(this.player);
        //clear any actions
        this.ActionsOnce = {};
    }
    ReverseEnemyDirectionIfOutOfBoundsAndDropDown() {
        let outOfBoundsBy = 0;
        this.invaders.forEach(item => {
            if (item.position.x < 0) {
                outOfBoundsBy = item.position.x;
                return;
            }
            else if (item.position.x > SpaceInvaders.CANVAS_WIDTH - item.dimensions.width) {
                outOfBoundsBy = item.position.x - (SpaceInvaders.CANVAS_WIDTH - item.dimensions.width);
                return;
            }
        });
        if (outOfBoundsBy === 0) {
            return;
        }
        this.invaders.forEach((enemy) => {
            // moving to the right
            enemy.position.x -= outOfBoundsBy;
            enemy.reverse();
            enemy.position.y += 10;
        });
    }
    updateEnemies(elapsedUnit) {
        this.invaders = this.invaders.filter(enemy => {
            return enemy.active;
        });
        this.invaders.forEach((enemy) => {
            enemy.update(elapsedUnit); // this might move things out of bounds so check next
            //  self.clamp(enemy)
        });
        this.ReverseEnemyDirectionIfOutOfBoundsAndDropDown();
        this.invaders.forEach((invader) => {
            if (Math.random() < invader.probabilityOfShooting) {
                this.invaderBullets = this.invaderBullets.concat(invader.shootAhead());
            }
        });
    }
    updateBullets(elapsedUnit) {
        this.playerBullets = this.playerBullets.filter(bullet => {
            return bullet.active;
        });
        this.playerBullets.forEach((bullet) => {
            bullet.update(elapsedUnit);
        });
        this.invaderBullets = this.invaderBullets.filter(bullet => {
            return bullet.active;
        });
        this.invaderBullets.forEach((bullet) => {
            bullet.update(elapsedUnit);
        });
    }
    handleCollisions() {
        this.playerBullets.forEach((bullet) => {
            this.invaders.forEach((invader) => {
                if (Object(_util_CollisionDetection__WEBPACK_IMPORTED_MODULE_6__["rectCollides"])(bullet, invader)) {
                    invader.takeHit(bullet);
                    bullet.active = false;
                }
            });
            this.bases.forEach((base) => {
                base.allDestructibleScenery.forEach((particle) => {
                    if (Object(_util_CollisionDetection__WEBPACK_IMPORTED_MODULE_6__["rectCollides"])(bullet, particle)) {
                        particle.explode();
                        bullet.active = false;
                    }
                });
            });
        });
        this.invaderBullets.forEach((bullet) => {
            if (Object(_util_CollisionDetection__WEBPACK_IMPORTED_MODULE_6__["rectCollides"])(bullet, this.player)) {
                this.player.takeDamage(bullet);
                const positionCopy = JSON.parse(JSON.stringify(this.player.position));
                bullet.active = false;
            }
            this.bases.forEach((base) => {
                base.allDestructibleScenery.forEach((particle) => {
                    if (Object(_util_CollisionDetection__WEBPACK_IMPORTED_MODULE_6__["rectCollides"])(bullet, particle)) {
                        particle.explode();
                        bullet.active = false;
                    }
                });
            });
        });
    }
    gameOver() {
        alert('you lose!');
    }
    clamp(item) {
        if (item.position.x < 0) {
            item.position.x = 0;
            return;
        }
        else if (item.position.x > SpaceInvaders.CANVAS_WIDTH - item.dimensions.width) {
            item.position.x = SpaceInvaders.CANVAS_WIDTH - item.dimensions.width;
            return;
        }
        else if (item.position.y < 0) {
            item.position.y = 0;
            return;
        }
        else if (item.position.y > SpaceInvaders.CANVAS_HEIGHT - item.dimensions.height) {
            item.position.y = SpaceInvaders.CANVAS_HEIGHT - item.dimensions.height;
            return;
        }
    }
}
SpaceInvaders.ASPECT_RATIO = 1; // keep it square for now
SpaceInvaders.CANVAS_WIDTH = 600;
SpaceInvaders.CANVAS_HEIGHT = SpaceInvaders.CANVAS_WIDTH / SpaceInvaders.ASPECT_RATIO;
SpaceInvaders.gameState = _constants_GameStates__WEBPACK_IMPORTED_MODULE_1__["INITIALISING"];
SpaceInvaders.score = 0;


/***/ }),

/***/ "./src/agent/Interpreter.ts":
/*!**********************************!*\
  !*** ./src/agent/Interpreter.ts ***!
  \**********************************/
/*! exports provided: Interpreter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interpreter", function() { return Interpreter; });
/**
 * Created by nikos on 27/07/2018.
 */
class Interpreter {
    readPixels() {
        const gameCanvas = document.querySelector('#game-canvas');
        const miniColourCanvas = document.querySelector('#mini-colour-canvas');
        const monoCanvas = document.querySelector('#mono-canvas');
        const miniColourCanvasCtx = miniColourCanvas.getContext('2d');
        const monoCanvasCtx = monoCanvas.getContext('2d');
        miniColourCanvasCtx.drawImage(gameCanvas, 0, 0, 100, 100);
        // convert to black and white
        const imageData = miniColourCanvasCtx.getImageData(0, 0, miniColourCanvas.width, miniColourCanvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
            // red
            data[i] = brightness;
            // green
            data[i + 1] = brightness;
            // blue
            data[i + 2] = brightness;
        }
        // overwrite original image
        monoCanvasCtx.putImageData(imageData, 0, 0);
    }
}


/***/ }),

/***/ "./src/constants/GameSettings.ts":
/*!***************************************!*\
  !*** ./src/constants/GameSettings.ts ***!
  \***************************************/
/*! exports provided: GAME_SPEED, VERY_SLOW_MOVEMENT_SPEED, SLOW_MOVEMENT_SPEED, MEDIUM_MOVEMENT_SPEED, FAST_MOVEMENT_SPEED, VERY_FAST_MOVEMENT_SPEED, MEDIUM_FONT_SIZE, LARGE_FONT_SIZE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_SPEED", function() { return GAME_SPEED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERY_SLOW_MOVEMENT_SPEED", function() { return VERY_SLOW_MOVEMENT_SPEED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SLOW_MOVEMENT_SPEED", function() { return SLOW_MOVEMENT_SPEED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEDIUM_MOVEMENT_SPEED", function() { return MEDIUM_MOVEMENT_SPEED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FAST_MOVEMENT_SPEED", function() { return FAST_MOVEMENT_SPEED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERY_FAST_MOVEMENT_SPEED", function() { return VERY_FAST_MOVEMENT_SPEED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEDIUM_FONT_SIZE", function() { return MEDIUM_FONT_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LARGE_FONT_SIZE", function() { return LARGE_FONT_SIZE; });
const GAME_SPEED = 50; // the higher the number the faster the game will run, all movements are effected by this number
const VERY_SLOW_MOVEMENT_SPEED = 1;
const SLOW_MOVEMENT_SPEED = 2;
const MEDIUM_MOVEMENT_SPEED = 4;
const FAST_MOVEMENT_SPEED = 6;
const VERY_FAST_MOVEMENT_SPEED = 12;
const MEDIUM_FONT_SIZE = 14;
const LARGE_FONT_SIZE = 20;


/***/ }),

/***/ "./src/constants/GameStates.ts":
/*!*************************************!*\
  !*** ./src/constants/GameStates.ts ***!
  \*************************************/
/*! exports provided: INITIALISING, GAME_OVER, BATTLE_MODE, YOU_WIN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INITIALISING", function() { return INITIALISING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_OVER", function() { return GAME_OVER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BATTLE_MODE", function() { return BATTLE_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YOU_WIN", function() { return YOU_WIN; });
const INITIALISING = 'INITIALISING';
const GAME_OVER = 'GAME_OVER';
const BATTLE_MODE = 'BATTLE_MODE';
const YOU_WIN = 'YOU_WIN';


/***/ }),

/***/ "./src/constants/KeyCodes.ts":
/*!***********************************!*\
  !*** ./src/constants/KeyCodes.ts ***!
  \***********************************/
/*! exports provided: KEY_CODES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEY_CODES", function() { return KEY_CODES; });
let KEY_CODES = {
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


/***/ }),

/***/ "./src/gameObjects/AbstractInvader.ts":
/*!********************************************!*\
  !*** ./src/gameObjects/AbstractInvader.ts ***!
  \********************************************/
/*! exports provided: AbstractInvader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractInvader", function() { return AbstractInvader; });
/* harmony import */ var _util_Vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Vectors */ "./src/util/Vectors.ts");
/* harmony import */ var _Bullets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bullets */ "./src/gameObjects/Bullets.ts");
/* harmony import */ var _constants_GameSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/GameSettings */ "./src/constants/GameSettings.ts");
/* harmony import */ var _SpaceInvaders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SpaceInvaders */ "./src/SpaceInvaders.ts");
/* harmony import */ var _util_Canvas2D_tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/Canvas2D_tools */ "./src/util/Canvas2D_tools.ts");





class AbstractInvader {
    constructor(position) {
        this.position = position;
        this.health = 1;
        this.dimensions = new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Dimensions2"](AbstractInvader.DEFAULT_WIDTH, AbstractInvader.DEFAULT_HEIGHT);
        this.active = true;
        this.probabilityOfShooting = 0.0005; // on each game frame
        this.rotationInDegrees = 180; // todo this will change
        this.image = new Image();
        this.directionVector = new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0, 0);
        this.facingAngleRad = Math.PI; // pointing down for now
    }
    draw(ctx) {
        Object(_util_Canvas2D_tools__WEBPACK_IMPORTED_MODULE_4__["rotateAndPaintImage"])(ctx, this.image, 180, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }
    midpoint() {
        return new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Vector2"](this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height / 2);
    }
    explode() {
        this.active = false;
        _SpaceInvaders__WEBPACK_IMPORTED_MODULE_3__["SpaceInvaders"].score += this.pointsValue;
        // todo boom graphic
    }
    reverse() {
        this.directionVector.x = -this.directionVector.x;
        this.directionVector.y = -this.directionVector.y;
        // todo boom graphic
    }
    updateDirection(directionVector) {
        this.directionVector = directionVector;
    }
    update(elapsedUnit) {
        this.position.x += this.directionVector.x * elapsedUnit * _constants_GameSettings__WEBPACK_IMPORTED_MODULE_2__["VERY_SLOW_MOVEMENT_SPEED"];
    }
    shootAhead() {
        // todo Sound.play('shoot')
        return [new _Bullets__WEBPACK_IMPORTED_MODULE_1__["BasicBullet"](this.midpoint(), new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0, 1))];
    }
    takeHit(bullet) {
        this.health -= bullet.damageInflicted;
        if (this.health <= 0) {
            this.explode();
        }
    }
}
AbstractInvader.DEFAULT_HEIGHT = 20;
AbstractInvader.DEFAULT_WIDTH = 30;


/***/ }),

/***/ "./src/gameObjects/Bullets.ts":
/*!************************************!*\
  !*** ./src/gameObjects/Bullets.ts ***!
  \************************************/
/*! exports provided: Bullet, BasicBullet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bullet", function() { return Bullet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicBullet", function() { return BasicBullet; });
/* harmony import */ var _SpaceInvaders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SpaceInvaders */ "./src/SpaceInvaders.ts");
/* harmony import */ var _util_Vectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Vectors */ "./src/util/Vectors.ts");
/* harmony import */ var _constants_GameSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/GameSettings */ "./src/constants/GameSettings.ts");



class Bullet {
    constructor(position, directionVector) {
        this.position = position;
        this.active = true;
        this.directionVector = directionVector;
    }
    inBounds() {
        return (this.position.x >= 0 &&
            this.position.x - this.dimensions.width <= _SpaceInvaders__WEBPACK_IMPORTED_MODULE_0__["SpaceInvaders"].CANVAS_WIDTH &&
            this.position.y >= 0 &&
            this.position.y - this.dimensions.height <= _SpaceInvaders__WEBPACK_IMPORTED_MODULE_0__["SpaceInvaders"].CANVAS_HEIGHT);
    }
}
Bullet.SMALL_SIZE = 3;
Bullet.LARGE_SIZE = 9;
class BasicBullet extends Bullet {
    constructor(position, directionVector) {
        super(position, directionVector);
        this.position = position;
        this.dimensions = new _util_Vectors__WEBPACK_IMPORTED_MODULE_1__["Dimensions2"](Bullet.SMALL_SIZE, Bullet.SMALL_SIZE);
        this.color = 'white';
        this.damageInflicted = 1;
    }
    draw(canvas) {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }
    update(elapsedUnit) {
        this.position.x += this.directionVector.x * elapsedUnit * _constants_GameSettings__WEBPACK_IMPORTED_MODULE_2__["MEDIUM_MOVEMENT_SPEED"];
        this.position.y += this.directionVector.y * elapsedUnit * _constants_GameSettings__WEBPACK_IMPORTED_MODULE_2__["MEDIUM_MOVEMENT_SPEED"];
        this.active = this.active && this.inBounds();
    }
}


/***/ }),

/***/ "./src/gameObjects/Invaders.ts":
/*!*************************************!*\
  !*** ./src/gameObjects/Invaders.ts ***!
  \*************************************/
/*! exports provided: LightInvader, MediumInvader, HeavyInvader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LightInvader", function() { return LightInvader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediumInvader", function() { return MediumInvader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeavyInvader", function() { return HeavyInvader; });
/* harmony import */ var _util_Vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Vectors */ "./src/util/Vectors.ts");
/* harmony import */ var _Bullets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bullets */ "./src/gameObjects/Bullets.ts");
/* harmony import */ var _AbstractInvader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AbstractInvader */ "./src/gameObjects/AbstractInvader.ts");
/* harmony import */ var _util_Conversions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/Conversions */ "./src/util/Conversions.ts");




class LightInvader extends _AbstractInvader__WEBPACK_IMPORTED_MODULE_2__["AbstractInvader"] {
    constructor(position = new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0, 0)) {
        super(position);
        this.probabilityOfShooting = 0.001;
        this.health = 1;
        this.pointsValue = 10;
        this.image.src = __webpack_require__(/*! ../images/lightInvader.svg */ "./src/images/lightInvader.svg");
    }
}
class MediumInvader extends _AbstractInvader__WEBPACK_IMPORTED_MODULE_2__["AbstractInvader"] {
    constructor(position = new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0, 0)) {
        super(position);
        this.probabilityOfShooting = 0.002;
        this.health = 3;
        this.pointsValue = 30;
        this.image.src = __webpack_require__(/*! ../images/MediumInvader.svg */ "./src/images/MediumInvader.svg");
    }
}
class HeavyInvader extends _AbstractInvader__WEBPACK_IMPORTED_MODULE_2__["AbstractInvader"] {
    constructor(position = new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0, 0)) {
        super(position);
        this.probabilityOfShooting = 0.004;
        this.pointsValue = 60;
        this.health = 5;
        this.image.src = __webpack_require__(/*! ../images/HeavyInvader.svg */ "./src/images/HeavyInvader.svg");
    }
    shootAhead() {
        // todo Sound.play('shoot')
        let self = this;
        let x = Math.random();
        if (x >= 0 && x <= 0.75) {
            return [new _Bullets__WEBPACK_IMPORTED_MODULE_1__["BasicBullet"](this.midpoint(), new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Vector2Normalised"](0))];
        }
        else {
            let vectors = Object(_util_Vectors__WEBPACK_IMPORTED_MODULE_0__["getFanSpreadVectors"])(10, Object(_util_Conversions__WEBPACK_IMPORTED_MODULE_3__["degreesToRadians"])(45));
            let bulletsToFire = [];
            vectors.forEach(item => {
                let b = new _Bullets__WEBPACK_IMPORTED_MODULE_1__["BasicBullet"](this.midpoint(), new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Vector2Normalised"](this.facingAngleRad + item.angle()));
                bulletsToFire.push(b);
            });
            return bulletsToFire;
        }
    }
}


/***/ }),

/***/ "./src/gameObjects/Player.ts":
/*!***********************************!*\
  !*** ./src/gameObjects/Player.ts ***!
  \***********************************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var _util_Vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Vectors */ "./src/util/Vectors.ts");
/* harmony import */ var _Bullets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bullets */ "./src/gameObjects/Bullets.ts");
/* harmony import */ var _constants_GameSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/GameSettings */ "./src/constants/GameSettings.ts");
/* harmony import */ var _constants_GameStates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/GameStates */ "./src/constants/GameStates.ts");
/* harmony import */ var _SpaceInvaders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SpaceInvaders */ "./src/SpaceInvaders.ts");





class Player {
    constructor(position) {
        this.color = '#0FF';
        this.dimensions = new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Dimensions2"](Player.DEFAULT_WIDTH, Player.DEFAULT_HEIGHT);
        this.health = 3;
        this.lastShotTime = 0;
        this.fireRatePerSec = 4;
        this.lastCommandWasAgentEvent = false;
        this.directionVector = new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0, 0);
        this.position = position;
    }
    draw(context2D) {
        context2D.drawImage(img, this.position.x, this.position.y);
    }
    update(elapsedUnit) {
        this.position.x += this.directionVector.x * elapsedUnit * _constants_GameSettings__WEBPACK_IMPORTED_MODULE_2__["MEDIUM_MOVEMENT_SPEED"];
        this.position.y += this.directionVector.y * elapsedUnit * _constants_GameSettings__WEBPACK_IMPORTED_MODULE_2__["MEDIUM_MOVEMENT_SPEED"];
        if (this.lastCommandWasAgentEvent) { // agent decides one frame at a time
            this.remainStationary();
        }
    }
    midpoint() {
        return new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Vector2"](this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height / 2);
    }
    explode() {
        _SpaceInvaders__WEBPACK_IMPORTED_MODULE_4__["SpaceInvaders"].gameState = _constants_GameStates__WEBPACK_IMPORTED_MODULE_3__["GAME_OVER"];
        let myAudio = document.createElement('audio');
        // todo
        // myAudio.src = require('file?name=playerExplosion.mp3!../audio/playerExplosion.mp3')
        // myAudio.play()
    }
    shootAhead() {
        // todo Sound.play('shoot')
        let timeDifference = new Date().getTime() - this.lastShotTime;
        if (timeDifference > 1000 / this.fireRatePerSec) {
            this.lastShotTime = new Date().getTime();
            return new _Bullets__WEBPACK_IMPORTED_MODULE_1__["BasicBullet"](this.midpoint(), new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Vector2Normalised"](0));
        }
        else {
            return null;
        }
    }
    /**
     *
     * @param directionVector
     * @param lastCommandWasAgentEvent if this is set then we revert the ship to remain stationary after one update loop, unless manual overide
     */
    updateDirection(directionVector, lastCommandWasAgentEvent = false) {
        this.directionVector = directionVector;
        this.lastCommandWasAgentEvent = lastCommandWasAgentEvent;
    }
    remainStationary() {
        this.directionVector.x = 0;
        this.directionVector.y = 0;
    }
    takeDamage(bullet) {
        this.health -= bullet.damageInflicted;
        if (this.health <= 0) {
            this.explode();
        }
    }
}
Player.DEFAULT_HEIGHT = 30;
Player.DEFAULT_WIDTH = 60;
let img = new Image();
img.src = __webpack_require__(/*! ../images/player.svg */ "./src/images/player.svg");


/***/ }),

/***/ "./src/gameObjects/PlayerBase.ts":
/*!***************************************!*\
  !*** ./src/gameObjects/PlayerBase.ts ***!
  \***************************************/
/*! exports provided: DestructibleScenery, PlayerBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DestructibleScenery", function() { return DestructibleScenery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerBase", function() { return PlayerBase; });
/* harmony import */ var _util_Vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Vectors */ "./src/util/Vectors.ts");

class DestructibleScenery {
    constructor(position) {
        this.dimensions = new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Dimensions2"](DestructibleScenery.DEFAULT_SIZE, DestructibleScenery.DEFAULT_SIZE);
        this.color = '#0F9';
        this.active = true;
        this.position = position;
    }
    draw(canvas) {
        canvas.fillStyle = this.color;
        if (this.active) {
            canvas.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        }
    }
    // tslint:disable-next-line
    update(elapsedUnit) { }
    explode() {
        this.active = false;
        // todo boom graphic
    }
}
DestructibleScenery.DEFAULT_SIZE = 5;
/**
 * The classic Green protective bases the player can hide behind
 */
class PlayerBase {
    constructor(requestedDimensions) {
        this.requestedDimensions = requestedDimensions;
        this.allDestructibleScenery = [];
        let numberPerRow = Math.floor(requestedDimensions.x / DestructibleScenery.DEFAULT_SIZE);
        let numberPerColumn = Math.floor(requestedDimensions.y / DestructibleScenery.DEFAULT_SIZE);
        this.actualDimensions = new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Vector2"](numberPerRow * DestructibleScenery.DEFAULT_SIZE, numberPerColumn * DestructibleScenery.DEFAULT_SIZE);
        let nextPosition;
        // just rectangular bases to start with
        // todo mask values to give shapes like the original space invaders bases
        for (let i = 0; i < numberPerRow; i++) {
            nextPosition = new _util_Vectors__WEBPACK_IMPORTED_MODULE_0__["Vector2"](DestructibleScenery.DEFAULT_SIZE * i, 0);
            for (let j = 0; j < numberPerColumn; j++) {
                nextPosition = nextPosition.addTwo(0, DestructibleScenery.DEFAULT_SIZE);
                this.allDestructibleScenery.push(new DestructibleScenery(nextPosition));
            }
        }
    }
    draw(canvas) {
        this.allDestructibleScenery.forEach((item) => {
            item.draw(canvas);
        });
    }
    transform(position) {
        this.allDestructibleScenery.forEach(function (item) {
            item.position = item.position.add(position);
        });
    }
}


/***/ }),

/***/ "./src/images/HeavyInvader.svg":
/*!*************************************!*\
  !*** ./src/images/HeavyInvader.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a29b209e4cde9ca981b0547df3cd01fd.svg";

/***/ }),

/***/ "./src/images/MediumInvader.svg":
/*!**************************************!*\
  !*** ./src/images/MediumInvader.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b000f6c649a9a520d4b9d77037409c1c.svg";

/***/ }),

/***/ "./src/images/lightInvader.svg":
/*!*************************************!*\
  !*** ./src/images/lightInvader.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "96b72f265559529badb309b9e9b1fdf3.svg";

/***/ }),

/***/ "./src/images/player.svg":
/*!*******************************!*\
  !*** ./src/images/player.svg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "421aea6e4c14536bacb0c89586f61154.svg";

/***/ }),

/***/ "./src/story/WaveManager.ts":
/*!**********************************!*\
  !*** ./src/story/WaveManager.ts ***!
  \**********************************/
/*! exports provided: WaveManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaveManager", function() { return WaveManager; });
/* harmony import */ var _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gameObjects/Invaders */ "./src/gameObjects/Invaders.ts");
/* harmony import */ var _util_Vectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Vectors */ "./src/util/Vectors.ts");
/* harmony import */ var _util_Formations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Formations */ "./src/util/Formations.ts");



class WaveManager {
    constructor() {
        this.waves = [];
        this.currentWave = 0;
        this.generateWaves();
    }
    getNextWave() {
        let nextWave = this.waves[this.currentWave];
        if (nextWave) {
            this.currentWave++;
            return nextWave();
        }
        return null;
    }
    generateWaves() {
        let horizontalGap = 15;
        let verticalGap = 20;
        let initialXOffset = 20;
        let initialYOffset = 20;
        this.waves.push(function () {
            let units = [
                new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](),
                new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"]()
            ];
            units.forEach(unit => {
                unit.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_1__["Vector2Normalised"](90));
            });
            Object(_util_Formations__WEBPACK_IMPORTED_MODULE_2__["rectangle"])(units, 4, horizontalGap, verticalGap);
            return units;
        });
        this.waves.push(function () {
            let units = [
                new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["MediumInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["MediumInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](),
                new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"]()
            ];
            units.forEach(unit => {
                unit.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_1__["Vector2Normalised"](90));
            });
            Object(_util_Formations__WEBPACK_IMPORTED_MODULE_2__["rectangle"])(units, 8, horizontalGap, verticalGap);
            return units;
        });
        this.waves.push(function () {
            let units = [
                new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["MediumInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["HeavyInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["MediumInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](),
                new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["MediumInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["MediumInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["MediumInvader"](),
                new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"]()
            ];
            units.forEach(unit => {
                unit.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_1__["Vector2Normalised"](90));
            });
            Object(_util_Formations__WEBPACK_IMPORTED_MODULE_2__["triangle"])(units, horizontalGap, verticalGap);
            return units;
        });
        this.waves.push(function () {
            let units = [
                new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["MediumInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["HeavyInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["HeavyInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["HeavyInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["MediumInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](),
                new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["MediumInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["HeavyInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["MediumInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](),
                new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["MediumInvader"](), new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"](),
                new _gameObjects_Invaders__WEBPACK_IMPORTED_MODULE_0__["LightInvader"]()
            ];
            units.forEach(unit => {
                unit.updateDirection(new _util_Vectors__WEBPACK_IMPORTED_MODULE_1__["Vector2Normalised"](90));
            });
            Object(_util_Formations__WEBPACK_IMPORTED_MODULE_2__["triangle"])(units, horizontalGap, verticalGap);
            return units;
        });
    }
}


/***/ }),

/***/ "./src/util/Canvas2D_tools.ts":
/*!************************************!*\
  !*** ./src/util/Canvas2D_tools.ts ***!
  \************************************/
/*! exports provided: rotateAndPaintImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateAndPaintImage", function() { return rotateAndPaintImage; });
/* harmony import */ var _Vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vectors */ "./src/util/Vectors.ts");

function rotateAndPaintImage(context, image, angleInDegrees, positionX, positionY, axisX, axisY) {
    let angleInRadians = _Vectors__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"](angleInDegrees);
    context.translate(positionX, positionY);
    context.rotate(angleInRadians);
    context.drawImage(image, -axisX, -axisY);
    context.rotate(-angleInRadians);
    context.translate(-positionX, -positionY);
}


/***/ }),

/***/ "./src/util/CollisionDetection.ts":
/*!****************************************!*\
  !*** ./src/util/CollisionDetection.ts ***!
  \****************************************/
/*! exports provided: rectCollides */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rectCollides", function() { return rectCollides; });
function rectCollides(a, b) {
    return (a.position.x < b.position.x + b.dimensions.width &&
        a.position.x + a.dimensions.width > b.position.x &&
        a.position.y < b.position.y + b.dimensions.height &&
        a.position.y + a.dimensions.height > b.position.y);
}


/***/ }),

/***/ "./src/util/Conversions.ts":
/*!*********************************!*\
  !*** ./src/util/Conversions.ts ***!
  \*********************************/
/*! exports provided: degreesToRadians, radiansToDegress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degreesToRadians", function() { return degreesToRadians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radiansToDegress", function() { return radiansToDegress; });
function degreesToRadians(degrees) {
    return (degrees / 360) * 2 * Math.PI;
}
function radiansToDegress(radians) {
    return (radians * 360) / (2 * Math.PI);
}


/***/ }),

/***/ "./src/util/Formations.ts":
/*!********************************!*\
  !*** ./src/util/Formations.ts ***!
  \********************************/
/*! exports provided: triangle, rectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triangle", function() { return triangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rectangle", function() { return rectangle; });
/* harmony import */ var _MathChecks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MathChecks */ "./src/util/MathChecks.ts");
/* harmony import */ var _Vectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vectors */ "./src/util/Vectors.ts");


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
    if (!Object(_MathChecks__WEBPACK_IMPORTED_MODULE_0__["isSquare"])(gameObjects.length)) {
        throw new Error('needs perfect square number of units');
    }
    let numberOfRows = Math.sqrt(gameObjects.length);
    let nextRowOffset = new _Vectors__WEBPACK_IMPORTED_MODULE_1__["Vector2"](0, 0);
    let thisRowStartingIndex = 0;
    for (let i = numberOfRows; i >= 1; i--) {
        let numberOnThisRow = i * 2 - 1;
        let maxHeight = 0;
        for (let j = 0; j < numberOnThisRow; j++) {
            let go = gameObjects[thisRowStartingIndex + j];
            if (go.dimensions.height > maxHeight) {
                maxHeight = go.dimensions.height;
            }
            go.position = new _Vectors__WEBPACK_IMPORTED_MODULE_1__["Vector2"](j * (go.dimensions.width + horizontalGap) + nextRowOffset.x, nextRowOffset.y);
        }
        nextRowOffset = nextRowOffset.addTwo(gameObjects[thisRowStartingIndex].dimensions.width + horizontalGap, maxHeight + verticalGap);
        thisRowStartingIndex = thisRowStartingIndex + numberOnThisRow;
    }
}
function rectangle(gameObjects, itemsPerRow, horizontalGap, verticalGap) {
    let numberOfRows = gameObjects.length / itemsPerRow;
    if (numberOfRows % 1 !== 0) {
        throw new Error('number / itemsPerRow must fit');
    }
    let nextRowOffset = new _Vectors__WEBPACK_IMPORTED_MODULE_1__["Vector2"](0, 0);
    let thisRowStartingIndex = 0;
    for (let i = 0; i < numberOfRows; i++) {
        let maxHeight = 0;
        for (let j = 0; j < itemsPerRow; j++) {
            let go = gameObjects[thisRowStartingIndex + j];
            if (go.dimensions.height > maxHeight) {
                maxHeight = go.dimensions.height;
            }
            go.position = new _Vectors__WEBPACK_IMPORTED_MODULE_1__["Vector2"](j * (go.dimensions.width + horizontalGap) + nextRowOffset.x, nextRowOffset.y);
        }
        nextRowOffset = nextRowOffset.addTwo(0, maxHeight + verticalGap);
        thisRowStartingIndex = thisRowStartingIndex + itemsPerRow;
    }
}


/***/ }),

/***/ "./src/util/MathChecks.ts":
/*!********************************!*\
  !*** ./src/util/MathChecks.ts ***!
  \********************************/
/*! exports provided: isSquare */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSquare", function() { return isSquare; });
function isSquare(n) {
    return n > 0 && Math.sqrt(n) % 1 === 0;
}


/***/ }),

/***/ "./src/util/Vectors.ts":
/*!*****************************!*\
  !*** ./src/util/Vectors.ts ***!
  \*****************************/
/*! exports provided: Dimensions2, Vector2, Vector2Normalised, degreesToRadians, radiansToDegress, getFanSpreadVectors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dimensions2", function() { return Dimensions2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2", function() { return Vector2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2Normalised", function() { return Vector2Normalised; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degreesToRadians", function() { return degreesToRadians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radiansToDegress", function() { return radiansToDegress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFanSpreadVectors", function() { return getFanSpreadVectors; });
class Dimensions2 {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(otherVector) {
        return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
    }
    addTwo(x, y) {
        return new Vector2(this.x + x, this.y + y);
    }
    reverse() {
        return new Vector2(-this.x, -this.y);
    }
    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    angle() {
        return Math.atan2(this.y, this.x) - degreesToRadians(-90);
    }
    /**
     * returns a new vector based on the current one rotated by an angle
     * @param initialVector
     * @param rotatingDegrees
     * @returns {Vector2}
     */
    rotateBy(radians) {
        let newAngleRads = Math.atan2(this.x, this.y) + radians;
        let mag = this.magnitude();
        return new Vector2(mag * Math.sin(newAngleRads), mag * Math.cos(newAngleRads));
    }
}
class Vector2Normalised extends Vector2 {
    constructor(radians) {
        super(Math.sin(radians), -Math.cos(radians));
    }
}
function degreesToRadians(degrees) {
    return (degrees / 360) * 2 * Math.PI;
}
function radiansToDegress(radians) {
    return (radians * 360) / (2 * Math.PI);
}
/**
 * Returns array of vectors equally spaced measured from both sidesfor the x origin in normal maths xy chart
 * the shooter will then modify based on its rotation of the firing gun
 */
function getFanSpreadVectors(numberOfBullets, spreadAngleRadians) {
    let arr = [];
    let angleGap = spreadAngleRadians / numberOfBullets;
    let startingAngle = spreadAngleRadians / 2;
    for (let i = 0; i < numberOfBullets; i++) {
        let nextAngle = startingAngle - i * angleGap;
        arr.push(new Vector2Normalised(nextAngle));
    }
    return arr;
}


/***/ })

/******/ });
//# sourceMappingURL=spaceInvaders.js.map