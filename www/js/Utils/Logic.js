"use strict";

import Pacman from "../Characters/Pacman.js";

export default class Logic
{
	static isGhostEaten = false;
	static storageMousePathName = 'showMousePath';

	static checkGhostEaten(ghost) {
		// Pacman
		let pX1 = Pacman.posX - (Pacman.size),
			pX2 = Pacman.posX + (Pacman.size),
			pY1 = Pacman.posY - (Pacman.size),
			pY2 = Pacman.posY + (Pacman.size),

			// Ghost
			gX1 = ghost.posX - (ghost.size / 2),
			gX2 = ghost.posX + (ghost.size / 2),
			gY1 = ghost.posY - (ghost.size / 2),
			gY2 = ghost.posY + (ghost.size / 2);

		return Logic.isRectanglesIntersect({
				'x1': pX1,
				'y1': pY1,
				'x2': pX2,
				'y2': pY2
			},
			{
				'x1': gX1,
				'y1': gY1,
				'x2': gX2,
				'y2': gY2
			})

	}

	static isRectanglesIntersect(aSquare, bSquare) {
		let aLeftOfB = aSquare['x2'] < bSquare['x1'],
			aRightOfB = aSquare['x1'] > bSquare['x2'],
			aAboveB = aSquare['y1'] > bSquare['y2'],
			aBelowB = aSquare['y2'] < bSquare['y1'];

	return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
}

	static isShowMousePath() {
		return localStorage.getItem(Logic.storageMousePathName) !== 'Y';
	}

	static pause() {
		document.body.classList.add('paused');
	}

	static continue() {
		document.body.classList.remove('paused');
	}

	static toggleTail() {
		if (Logic.isShowMousePath()) {
			localStorage.setItem(Logic.storageMousePathName, 'N');

			return;
		}

		localStorage.setItem(Logic.storageMousePathName, 'Y');
	}

}