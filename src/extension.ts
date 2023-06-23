import * as vscode from 'vscode';
import BookTag from './tag';


export function activate(context: vscode.ExtensionContext) {

	let lastContent: string = ""
	const tag = new BookTag({ context })

	console.log('Congratulations, your extension "booktag" is now active!');

	vscode.workspace.onDidOpenTextDocument((document) => {
		lastContent = document.getText()
		console.log('current file content', lastContent)
	})

	vscode.workspace.onDidSaveTextDocument((document) => {
		const content = document.getText()
		const lines = content.split('\n')
		const lastLines = lastContent.split('\n')
		const addedLines: Array<{ number: number, content: string }> = []

		lines.forEach((line, index) => {
			if (line !== lastLines[index]) {
				addedLines.push({ number: index + 1, content: line })
			}
		})

		console.log(`file saved with ${addedLines.length} new lines`)
		addedLines.forEach(line => {
			console.log(`new line ${line.number}`)
		})
	})



	// mark the line
	vscode.commands.registerCommand('booktag.mark', () => tag.mark());
	vscode.commands.registerCommand('booktag.undo', () => tag.undo())

	// context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
