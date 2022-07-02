"use strict";

export default class MousePosition {
	static x;
	static y;
	static prevX;
	static prevY;

	static mouseMoveHandler (e) {
		MousePosition.prevX = MousePosition.x;
		MousePosition.prevY = MousePosition.y;

		MousePosition.x = e.pageX - this.offsetLeft;
		MousePosition.y = e.pageY - this.offsetTop;
	}
}