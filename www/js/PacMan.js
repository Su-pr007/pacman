"use strict";

import MousePosition from './MousePosition.js';
import Enemy from './Enemy.js';

export default class PacMan {
	static size = 20;
	static pacmanColor = '#ee0';
	static foodColor = '#333';
	static maxEnemyCount = 50;
	static drawer;
	static canvas;
	static windowW;
	static windowH;
	static posX;
	static posY;
	static foodList = [];


	constructor() {
		PacMan.canvas = document.getElementById('canvas');
	}

	init() {
		PacMan.updateWindowSizes();
		let isSuccess = PacMan.draw();

		if (!isSuccess) {
			return;
		}

		PacMan.drawer = setInterval(PacMan.draw, 1000 / 60);

		PacMan.canvas.addEventListener('mousemove', MousePosition.mouseMoveHandler, false);
		window.addEventListener('resize', this.updateWindowSizes, false);
	}

	static draw() {
		if (!PacMan.canvas.getContext) {
			return false;
		}

		PacMan.ctx = PacMan.canvas.getContext('2d');
		PacMan.ctx.clearRect(0, 0, PacMan.canvas.width, PacMan.canvas.height); // Очистка прошлого кадра

		PacMan.posX = MousePosition.x - (PacMan.size / 2);
		PacMan.posY = MousePosition.y - (PacMan.size / 2);

		PacMan.addEnemy();
		PacMan.drawEnemies();
		PacMan.drawPacMan();

		return true;
	}

	static addEnemy() {
		if (PacMan.foodList >= PacMan.maxEnemyCount) {
			return;
		}

		for (let i = 0; i < PacMan.maxEnemyCount - PacMan.foodList.length; i++) {
			let posX = Math.random()*100 + PacMan.windowW,
				posY = Math.random()*PacMan.windowH,
				size = Math.random()*100,
				newEnemy = new Enemy(posX, posY, size);

			PacMan.foodList.push(newEnemy);
		}
	}

	static drawEnemies() {
		PacMan.ctx.fillStyle = PacMan.foodColor;
		for (let i = 0; i < PacMan.foodList.length; i++) {
			let food = PacMan.foodList[i],
				foodSize = food.size,
				foodPosX = food.posX,
				foodPosY = food.posY,
				foodCenterX = foodPosX - foodSize,
				foodCenterY = foodPosY - foodSize;

			// TODO: расчёт положения призрака
			PacMan.ctx.beginPath();
			PacMan.ctx.moveTo(83, 116);
			PacMan.ctx.lineTo(83, 102);
			PacMan.ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
			PacMan.ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
			PacMan.ctx.lineTo(111, 116);
			PacMan.ctx.lineTo(106.333, 111.333);
			PacMan.ctx.lineTo(101.666, 116);
			PacMan.ctx.lineTo(97, 111.333);
			PacMan.ctx.lineTo(92.333, 116);
			PacMan.ctx.lineTo(87.666, 111.333);
			PacMan.ctx.lineTo(83, 116);
			PacMan.ctx.fill();
		}


	}

	static drawPacMan() {
		PacMan.ctx.fillStyle = PacMan.pacmanColor;
		PacMan.ctx.beginPath();
		PacMan.ctx.arc(PacMan.posX, PacMan.posY, PacMan.size, Math.PI / 7, -Math.PI / 7, false);
		PacMan.ctx.lineTo(PacMan.posX, PacMan.posY);
		PacMan.ctx.fill();
	}

	static updateWindowSizes() {
		PacMan.windowW = (PacMan.canvas.width = window.innerWidth);
		PacMan.windowH = (PacMan.canvas.height = window.innerHeight);
	}
}