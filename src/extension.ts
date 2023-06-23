import * as vscode from 'vscode';
import BookTag from './tag';


export function activate(context: vscode.ExtensionContext) {

	const tag = new BookTag({ context })

	console.log('Congratulations, your extension "booktag" is now active!');

	// mark the line
	vscode.commands.registerCommand('booktag.mark', () => tag.mark());
	vscode.commands.registerCommand('booktag.undo', () => tag.undo())

	// context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
