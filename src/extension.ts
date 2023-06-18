import * as vscode from 'vscode';
import BookTag from './tag'

const tag = new BookTag()

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "booktag" is now active!');

	// mark the line
	vscode.commands.registerCommand('booktag.mark', () => tag.mark(context));

	// context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
