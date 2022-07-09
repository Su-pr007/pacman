"use strict";

import MousePosition from './Utils/MousePosition.js';
import Ghost from './Characters/Ghost.js';
import Pacman from "./Characters/Pacman.js";
import Counter from "./Utils/Counter.js";
import Logic from "./Utils/Logic.js";
import InfoBar from "./Utils/InfoBar.js";

export default class Canvas {
	static maxGhostCount = 10;
	static ghostList = [];
	static animStep = 1;
	static canvas;
	static windowW;
	static windowH;
	static character;

	static init() {
		Canvas.canvas = document.getElementById('canvas');
		Canvas.character = Pacman;

		Canvas.initGlobals();
		InfoBar.init();

		Canvas.ctx = Canvas.canvas.getContext('2d');

		Canvas.updateWindowSizes();
		let isSuccess = Canvas.draw();

		if (isSuccess === false) {
			return;
		}

		window.requestAnimationFrame(Canvas.draw);

		Canvas.canvas.addEventListener('mousemove', MousePosition.mouseMoveHandler, false);
		window.addEventListener('resize', Canvas.updateWindowSizes, false);
	}

	static draw() {
		Canvas.animStep++;

		if (!Canvas.canvas.getContext) {
			return false;
		}

		Canvas.ctx.clearRect(-Canvas.canvas.width, -Canvas.canvas.height, Canvas.canvas.width * 2, Canvas.canvas.height * 2); // Очистка прошлого кадра

		Canvas.updateEnemies();
		Canvas.drawMousePath();
		Canvas.drawEnemies();
		Canvas.updateCharacter();
		Canvas.drawCharacter();

		InfoBar.updateInfo();

		if (Pacman.size === Pacman.maxSize) {
			Canvas.pause();

			alert('Молодец. Ты победил. Дальше уже игра не продумана');

			Canvas.continue();

			Pacman.maxSize = 99999;
		}

		window.requestAnimationFrame(Canvas.draw);
	}

	static updateEnemies() {

		Canvas.ghostList.forEach(function (ghost, index, object) {
			ghost.posX -= ghost.speed;

			if (Logic.checkGhostEaten(ghost)) {
				object.splice(index, 1);
				Counter.eatenGhosts++;
				Logic.isGhostEaten = true;
			}

			if (ghost.posX < -100) {
				object.splice(index, 1);
				Counter.missedGhosts++;
			}
		});

		if (Canvas.ghostList.length >= Canvas.maxGhostCount) {
			return;
		}

		for (let i = 0; i < Canvas.maxGhostCount - Canvas.ghostList.length; i++) {
			let posX = Math.random() * 100 + Canvas.windowW,
				posY = Math.random() * Canvas.windowH,
				size = Math.random() * 20,
				color = '#' + Math.floor(Math.random() * 16777215).toString(16),
				speed = Math.random() * 5,
				newGhost = new Ghost(Math.floor(posX), Math.floor(posY), Math.ceil(size), speed.toFixed(2), color);

			Canvas.ghostList.push(newGhost);
		}
	}

	static updateCharacter() {
		if (Logic.isGhostEaten && Pacman.size < Pacman.maxSize) {
			Pacman.size++;
			Logic.isGhostEaten = false;
		}

		if (Canvas.animStep % Pacman.starveInterval === 0 && Pacman.size > 20) {
			Pacman.size--;
		}
	}

	static drawEnemies() {
		Canvas.ghostList.forEach(function (ghost) {
			ghost.draw();
		});
	}

	static drawCharacter() {
		Canvas.character.draw();
	}

	static drawMousePath() {
		if (localStorage.getItem('showPMousePath') !== 'Y') {
			return;
		}

		MousePosition.prevPositions.forEach(function (lineFrom, index, object) {
			let lineTo = object[index+1] !== undefined
					? object[index+1]
					: {x: MousePosition.getX(), y: MousePosition.getY()};

			Canvas.ctx.strokeStyle = '#099';

			Canvas.ctx.beginPath();
			Canvas.ctx.moveTo(lineFrom.x, lineFrom.y);
			Canvas.ctx.lineTo(lineTo.x, lineTo.y)
			Canvas.ctx.stroke();
		});

		if (Canvas.animStep % 2 === 0) {
			MousePosition.prevPositions.shift();
		}
	}

	static pause() {
		document.body.classList.add('paused');
	}

	static continue() {
		document.body.classList.remove('paused');
	}

	static updateWindowSizes() {
		Canvas.windowW = (Canvas.canvas.width = window.innerWidth);
		Canvas.windowH = (Canvas.canvas.height = window.innerHeight);
	}

	static initGlobals() {
		window.Canvas = Canvas;
		window.MousePosition = MousePosition;
		window.Ghost = Ghost;
		window.Pacman = Pacman;
		window.Logic = Logic;
		window.Counter = Counter;
	}
}