"use strict";

import AbstractCharacter from "./AbstractCharacter.js";

export default class Pacman extends AbstractCharacter
{
	static size = 20;
	static maxSize = 100;
	static color = '#ee0';
	static mouthAngle = 0;
	static isMouthReversed = 1;
	static maxMouthAngle = 1;
	static minMouthAngle = 0.1;
	static starveInterval = 90;
	static posX;
	static posY;

	static prepareModel() {
		// Анимация рта
		if (Pacman.isMouthReversed) {
			Pacman.mouthAngle -= 0.01;

			if (Pacman.mouthAngle <= Pacman.minMouthAngle) {
				Pacman.isMouthReversed = false;
			}
		}
		else {
			Pacman.mouthAngle += 0.01;

			if (Pacman.mouthAngle >= Pacman.maxMouthAngle) {
				Pacman.isMouthReversed = true;
			}
		}

	}

	static drawModel() {
		Canvas.ctx.fillStyle = Pacman.color;
		Canvas.ctx.strokeStyle = '1px solid #000';
		Canvas.ctx.beginPath();
		Canvas.ctx.arc(Pacman.posX, Pacman.posY, Pacman.size, Pacman.direction + Pacman.mouthAngle, Pacman.direction - Pacman.mouthAngle, false);
		Canvas.ctx.lineTo(Pacman.posX, Pacman.posY);
		Canvas.ctx.fill();
		Canvas.ctx.stroke();
	}

}