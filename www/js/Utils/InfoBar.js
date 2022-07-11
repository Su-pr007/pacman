"use strict";

import Counter from "./Counter.js";
import Pacman from "../Characters/Pacman.js";

export default class InfoBar
{
	static eatScoreBlock;
	static sizeBlock;
	static eatScoreBlockSelector = '#eatenScore';
	static sizeBlockSelector = '#characterSize';
	static missedBlockSelector = '#missedGhosts';

	static init() {
		InfoBar.eatScoreBlock = document.querySelector(this.eatScoreBlockSelector);
		InfoBar.sizeBlock = document.querySelector(this.sizeBlockSelector);
		InfoBar.missedGhosts = document.querySelector(this.missedBlockSelector);
	}

	async static updateInfo() {
		if (InfoBar.eatScoreBlock === null || InfoBar.sizeBlock === null) {
			return;
		}

		InfoBar.eatScoreBlock.innerHTML = Counter.eatenGhosts;
		InfoBar.sizeBlock.innerHTML = Pacman.size;
		InfoBar.missedGhosts.innerHTML = Counter.missedGhosts;
	}
}
