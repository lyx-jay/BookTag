import * as vscode from 'vscode';
import BookTag from './tag';


export function activate(context: vscode.ExtensionContext) {

	// function log(string: string) {
	// 	vscode.window.showInformationMessage(string)
	// }

	let lastContent: string = ""
	const tag = new BookTag({ context })

	console.log('Congratulations, your extension "booktag" is now active!');

	vscode.workspace.onDidOpenTextDocument((document) => {
		lastContent = document.getText()
		// log('打开文件时，记录当前文本字数')
	})

	vscode.workspace.onDidSaveTextDocument((document) => {
		console.log('last content -> ', lastContent)
		const content = document.getText()
		// lastContent = content
		const lines = content.split('\n')
		console.log('lines:', lines)
		const lastLines = lastContent.split('\n')
		console.log('lastLines', lastLines)
		const addedLines: Array<{ number: number, content: string }> = []
		lines.forEach((line, index) => {
			if (line !== lastLines[index]) {
				addedLines.push({ number: index + 1, content: line })
			}
		})
		// log(`file saved with ${addedLines.length} new lines`)
		console.log(`file saved with ${addedLines.length} new lines`)
		tag.updateMarkList(addedLines)
		lastContent = content
	})



	// mark the line
	vscode.commands.registerCommand('booktag.mark', () => tag.mark());
	vscode.commands.registerCommand('booktag.undo', () => tag.undo())

	// context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
