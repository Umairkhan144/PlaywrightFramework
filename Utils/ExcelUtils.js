// ExcelUtils.js

const ExcelJS = require('exceljs');

class ExcelUtils {
  constructor(filePath, sheetName) {
    this.filePath = filePath;
    this.sheetName = sheetName;
    this.workbook = new ExcelJS.Workbook();
    this.worksheet = null;
    this.columnNames = [];
  }

  async loadWorkbook() {
    await this.workbook.xlsx.readFile(this.filePath);
    this.worksheet = this.workbook.getWorksheet(this.sheetName);
    this.columnNames = this.extractColumnNames();
  }

  extractColumnNames() {
    const firstRow = this.worksheet.getRow(1);
    return firstRow.values.map(value => (value ? value.toString() : ''));
  }

  getColumnIndex(columnName) {
    return this.columnNames.indexOf(columnName) + 1;
  }

  getCellValue(row, columnName) {
    try {
      const columnIndex = this.getColumnIndex(columnName);
      if (columnIndex > 0) {
        const cell = this.worksheet.getCell(row, columnIndex);
        return cell.value !== null && cell.value !== undefined ? cell.value.toString() : '';
      } else {
        console.error(`Column '${columnName}' not found.`);
        return '';
      }
    } catch (error) {
      console.error(error);
      return '';
    }
  }

  getRowCount() {
    return this.worksheet.rowCount;
  }

  getColumnCount() {
    return this.columnNames.length;
  }

  getAllRowValues(columnName) {
    const columnIndex = this.getColumnIndex(columnName);
    if (columnIndex > 0) {
      const columnValues = [];
      for (let i = 2; i <= this.getRowCount(); i++) {
        const cellValue = this.getCellValue(i, columnName);
        columnValues.push(cellValue);
      }
      return columnValues;
    } else {
      console.error(`Column '${columnName}' not found.`);
      return [];
    }
  }
}

module.exports = ExcelUtils;
