import * as vscode from 'vscode';


class BookTag {

  public markList: any[]
  public markMap: Map<number, any>
  context: vscode.ExtensionContext;
  baseDecoration: vscode.TextEditorDecorationType;

  constructor({ context }: {
    context: vscode.ExtensionContext
  }) {
    this.markList = []
    this.markMap = new Map()
    this.context = context
    this.baseDecoration = vscode.window.createTextEditorDecorationType(this.getIcon())
  }

  /**
   * mark code line
   */
  mark() {

    const editor = this.getActiveEditor()

    const row = editor.selection.start.line;
    const decorationOptions = {
      range: new vscode.Range(row, 0, row, 0),
      renderOptions: this.getIcon()
    };

    this.markList.push(decorationOptions)
    this.markMap.set(row, decorationOptions)

    editor.setDecorations(this.baseDecoration, this.markList);
  }

  /**
   * cancel the mark of code line
   */
  undo() {

    const editor = this.getActiveEditor()
    const row = editor.selection.start.line;
    if (!this.markMap.get(row)) {
      vscode.window.showInformationMessage('No mark found');
      return;
    }
    const decorationOption = this.markMap.get(row)
    const idx = this.markList.indexOf(decorationOption)
    this.markList.splice(idx, 1)
    this.markMap.delete(row)
    this.update()
  }

  /**
   * update mark list and redraw marks
   */
  update() {
    const editor = this.getActiveEditor()
    editor.setDecorations(this.baseDecoration, this.markList)
  }

  updateMarkList(newLines: Array<{ number: number, content: string }>) {
    // key is old row, value is new row
    const temp = new Map<string, number>()
    newLines.forEach(newLine => {
      console.log('markMap', this.markMap)
      for (const row in this.markMap) {
        console.log(`old line num: ${row}`)
        if (newLine.number <= Number(row)) {
          temp.set(row, Number(row) + 1)
        }
      }
    })
    console.log('temp', temp)
    // vscode.window.showInformationMessage(JSON.stringify(temp))
    for (const oldRow in temp) {
      const oldRowNumber = Number(oldRow)
      const decoration = this.markMap.get(oldRowNumber)
      const idx = this.markList.indexOf(decoration)
      // delete old item
      this.markList.splice(idx, 1)
      this.markMap.delete(oldRowNumber)
      // add new item
      const newRowNumber = temp.get(oldRow)!
      const newDecoration = {
        range: new vscode.Range(newRowNumber, 0, newRowNumber, 0),
        renderOptions: this.getIcon()
      }
      this.markList.push(newDecoration)
      this.markMap.set(newRowNumber, newDecoration)
    }
    temp.clear()
    this.update()
  }

  /**
   * get icon settings
   * @returns Object
   */
  getIcon() {
    return {
      gutterIconPath: this.context.asAbsolutePath('src/images/tag.svg'),
      gutterIconSize: 'contain',
    }
  }

  /**
   * get current active editor
   * @returns editor
   */
  getActiveEditor(): vscode.TextEditor {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found');
      // @ts-ignore
      return;
    }
    return editor
  }
}


export default BookTag