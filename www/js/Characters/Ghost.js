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

	draw() {
		let ghostSize = this.size,
			feet = 4,
			head_radius = (ghostSize * 0.8).toFixed(2),
			foot_radius = (head_radius / feet).toFixed(2);

		Canvas.ctx.translate(this.posX, this.posY);
		Canvas.ctx.fillStyle = this.color;

		Canvas.ctx.beginPath();
		for (let foot = 0; foot < feet; foot++) {
			let footX = (2 * foot_radius * (feet - foot)) - head_radius - foot_radius,
				footY = ghostSize - foot_radius;
			Canvas.ctx.arc(
				footX.toFixed(2),
				footY.toFixed(2),
				foot_radius, 0, Math.PI
			);
		}

		Canvas.ctx.lineTo(-head_radius, ghostSize - foot_radius);
		Canvas.ctx.arc(0, head_radius - ghostSize, head_radius, Math.PI, 2 * Math.PI);
		Canvas.ctx.closePath();
		Canvas.ctx.fill();

		Canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
	}
}