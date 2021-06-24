const { dialog } = require('electron');
const { Extension, log, INPUT_METHOD, PLATFORMS } = require('deckboard-kit');
const { exec } = require("child_process");

class RunCommandExtension extends Extension {
	constructor() {
		super();
		this.name = 'Commands';
		this.platforms = [PLATFORMS.WINDOWS];
		this.inputs = [
			{
				label: 'Run Command',
				value: 'run-command',
				icon: 'terminal',
				color: '#34495e',
				input: [
					{
						label: 'Action',
						ref: 'commandAction',
						type: INPUT_METHOD.INPUT_TEXT,
						items: [
							{
								label: 'Run Command',
								value: 'command'
							}
						]
					}
				]
			}
		];
	}

	execute(action, {commandAction}) {
		switch (action) {
			case 'run-command': {
				if (commandAction != undefined) {
					console.log(`Running Command: ${commandAction}`);
					exec(commandAction, (error, stdout) => {
						if (error) {
							dialog.showErrorBox('Command Failed!',`${error}`);
						}
						console.log(`stdout: ${stdout}`);
					});
				}
			}
			default:
				break;
		}
	}
}

module.exports = new RunCommandExtension();
