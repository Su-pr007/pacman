"use strict";

export default class Ghost
{
	static posX;
	static posY;
	static size;

	constructor(posX, posY, size) {
		Ghost.posX = posX;
		Ghost.posY = posY;
		Ghost.size = size;
	}
}