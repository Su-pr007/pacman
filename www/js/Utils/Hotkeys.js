"use strict";

export default class Hotkeys
{
	static keyByAction = {
		'toggleTail': ['KeyT'],
		'pause': ['Escape']
	};

	static actionMethodByName = {
		'toggleTail': Logic.toggleTail,
		'pause': Logic.pause
	};

	static async initKeyHandlers()
	{
		document.addEventListener('keydown', Hotkeys.eventHandler);
	}

	static async eventHandler(e) {
		Object.entries(Hotkeys.keyByAction).forEach((actionName, keysList) => {
			if (keysList.includes(e.code)) {
				Hotkeys.doAction(actionName);
			}
		});
	}
}