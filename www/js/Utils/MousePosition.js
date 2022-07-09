"use strict";

export default class MousePosition {
	static x;
	static y;
	static prevPositions = [];
	static maxPrevCoords = 10;
	static relativeX;
	static relativeY;

	static mouseMoveHandler (e) {
		MousePosition.prevPositions.push({
			x: MousePosition.getX(),
			y: MousePosition.getY()
		});

		if (MousePosition.prevPositions.length >= MousePosition.maxPrevCoords) {
			MousePosition.prevPositions.shift();
		}

		MousePosition.relativeX = e.movementX;
		MousePosition.relativeY = e.movementY;
		MousePosition.x = e.pageX - Canvas.canvas.offsetLeft;
		MousePosition.y = e.pageY - Canvas.canvas.offsetTop;
	}

	static getX() {
		return MousePosition?.x === undefined ? Canvas.windowW / 2 : MousePosition?.x;
	}

	static getY() {
		return MousePosition?.y === undefined ? Canvas.windowH / 2 : MousePosition?.y;
	}

	static getPreviousCenter() {
		if (MousePosition.prevPositions.length <= 0) {
			return {
				x: MousePosition.getX(),
				y: MousePosition.getY()
			};
		}

		const xArray = MousePosition.prevPositions.map(el => el['x']),
			yArray = MousePosition.prevPositions.map(el => el['y']);

		return {
			x: (Math.min(...xArray) + Math.max(...xArray)) / 2,
			y: (Math.min(...yArray) + Math.max(...yArray)) / 2
		}
	}
}