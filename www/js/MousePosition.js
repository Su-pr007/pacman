"use strict";

export default class MousePosition {
	static x;
	static y;
	static prevPositions = [];
	static maxPrevCoords = 30;

	static mouseMoveHandler (e) {
		MousePosition.prevPositions.push({
			x: MousePosition.x,
			y: MousePosition.y
		});

		if (MousePosition.prevPositions.length >= MousePosition.maxPrevCoords) {
			MousePosition.prevPositions.shift();
		}

		MousePosition.x = e.pageX - this.offsetLeft;
		MousePosition.y = e.pageY - this.offsetTop;
	}
}