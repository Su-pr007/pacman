"use strict";

import MousePosition from "../Utils/MousePosition.js";

export default class AbstractCharacter
{
	static size = 20;
	static color = '#000';
	static posX;
	static posY;
	static direction;

	static draw() {
		this.getPosition();
		this.getDirection();
		this.prepareModel();
		this.drawModel();
	}

	static drawModel() {
		Canvas.ctx.fillStyle = this.color;
		Canvas.ctx.beginPath();
		Canvas.ctx.rect(this.posX - (this.size / 2), this.posY - (this.size / 2), this.size, this.size);
		Canvas.ctx.fill();
	}

	static getDirection() {
		const relativeX = MousePosition.getX() - MousePosition.getPreviousCenter().x,
			relativeY = MousePosition.getY() - MousePosition.getPreviousCenter().y,
			result = Math.atan2(relativeY, relativeX);

		if (relativeX === 0 || relativeY === 0 || isNaN(result)) {
			return;
		}

		this.direction = result;
	}

	static prepareModel() {}

	static getPosition() {
		this.posX = MousePosition.getX();
		this.posY = MousePosition.getY();
	}
}