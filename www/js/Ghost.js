"use strict";

export default class Ghost {
	posX;
	posY;
	size;
	color;
	speed;

	constructor(posX, posY, size, speed, color) {
		this.posX = posX;
		this.posY = posY;
		this.size = size;
		this.speed = speed;
		this.color = color;
	}

	static drawGhost(ghost) {
		let ghostSize = ghost.size,
			ghostPosX = ghost.posX,
			ghostPosY = ghost.posY,
			ghostCenterX = ghostPosX - ghostSize,
			ghostCenterY = ghostPosY - ghostSize;

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