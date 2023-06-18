import * as vscode from 'vscode';

class BookTag {
  public markList: any[]
  constructor() {
    this.markList = []
  }

  /**
   * mark code line
   */
  mark(context: vscode.ExtensionContext) {

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found');
      return;
    }

    const lineNumberDecoration = vscode.window.createTextEditorDecorationType({
      gutterIconPath: context.asAbsolutePath('src/images/tag.svg'),
      gutterIconSize: 'cover',
    });

    const selection = editor.selection;
    const decorationOptions = {
      range: new vscode.Range(selection.start.line, 0, selection.start.line, 0),
      renderOptions: {
        gutterIconPath: context.asAbsolutePath('src/images/tag.svg'),
        gutterIconSize: 'contain',
      }
    };

    this.markList.push(decorationOptions)
    editor.setDecorations(lineNumberDecoration, this.markList);
  }

  /**
   * cancel the mark of code line
   */
  undoMark() {

  }
}

export default BookTag