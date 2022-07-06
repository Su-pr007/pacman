"use strict";
import MousePosition from './MousePosition.js';
import Ghost from './Ghost.js';

export default class PacMan {
	static size = 20;
	static pacmanColor = '#ee0';
	static maxGhostCount = 50;
	static drawer;
	static canvas;
	static windowW;
	static windowH;
	static posX;
	static posY;
	static ghostList = [];
	static mouthAngle = 0;
	static isMouthReversed = 1;
	static maxMouthAngle = 1;
	static minMouthAngle = 0.1;

	static init() {
		PacMan.canvas = document.getElementById('canvas');

		window.PacMan = PacMan;
		window.MousePosition = MousePosition;
		window.Ghost = Ghost;

		PacMan.updateWindowSizes();
		let isSuccess = PacMan.draw();

		if (!isSuccess) {
			return;
		}

		PacMan.drawer = setInterval(PacMan.draw, 1000 / 120);

		PacMan.canvas.addEventListener('mousemove', MousePosition.mouseMoveHandler, false);
		window.addEventListener('resize', this.updateWindowSizes, false);
	}

	static draw() {
		if (!PacMan.canvas.getContext) {
			return false;
		}

		PacMan.ctx = PacMan.canvas.getContext('2d');
		PacMan.ctx.clearRect(0, 0, PacMan.canvas.width, PacMan.canvas.height); // Очистка прошлого кадра

		PacMan.posX = MousePosition.x;
		PacMan.posY = MousePosition.y;

		PacMan.updateEnemies();
		PacMan.drawEnemies();
		PacMan.drawMousePath();
		PacMan.drawPacMan();

		return true;
	}

	static updateEnemies() {
		for (let i = 0; i < PacMan.ghostList.length; i++) {
			let ghost = PacMan.ghostList[i];

			ghost.x -= ghost.speed;
		}

		if (PacMan.ghostList >= PacMan.maxGhostCount) {
			return;
		}

		for (let i = 0; i < PacMan.maxGhostCount - PacMan.ghostList.length; i++) {
			let posX = Math.random()*100 + PacMan.windowW,
				posY = Math.random()*PacMan.windowH,
				size = Math.random()*100,
				color = '#'+Math.floor(Math.random()*16777215).toString(16),
				speed = Math.random() * 10,
				newGhost = new Ghost(posX, posY, size, speed, color);

			PacMan.ghostList.push(newGhost);
		}
	}

	static drawEnemies() {
		for (let i = 0; i < PacMan.ghostList.length; i++) {
			Ghost.drawGhost(PacMan.ghostList[i]);
		}
	}

	static drawPacMan() {
		// Анимация рта
		if (PacMan.isMouthReversed) {
			PacMan.mouthAngle -= 0.01;

			if (PacMan.mouthAngle <= PacMan.minMouthAngle) {
				PacMan.isMouthReversed = false;
			}
		}
		else {
			PacMan.mouthAngle += 0.01;

			if (PacMan.mouthAngle >= PacMan.maxMouthAngle) {
				PacMan.isMouthReversed = true;
			}
		}

		PacMan.ctx.fillStyle = PacMan.pacmanColor;
		PacMan.ctx.beginPath();
		PacMan.ctx.arc(PacMan.posX, PacMan.posY, PacMan.size, PacMan.mouthAngle, -PacMan.mouthAngle, false);
		PacMan.ctx.lineTo(PacMan.posX, PacMan.posY);
		PacMan.ctx.fill();
	}

	static drawMousePath() {
		for (let i = 0; i < MousePosition.prevPositions.length; i++) {
			let lineFrom = MousePosition.prevPositions[i],
				lineTo = MousePosition.prevPositions[i+1] !== undefined
					? MousePosition.prevPositions[i+1]
					: {x: MousePosition.x, y: MousePosition.y};

			PacMan.ctx.strokeStyle = 'blue';

			PacMan.ctx.beginPath();
			PacMan.ctx.moveTo(lineFrom.x, lineFrom.y);
			PacMan.ctx.lineTo(lineTo.x, lineTo.y)
			PacMan.ctx.stroke();
		}
	}

	static updateWindowSizes() {
		PacMan.windowW = (PacMan.canvas.width = window.innerWidth);
		PacMan.windowH = (PacMan.canvas.height = window.innerHeight);
	}
}