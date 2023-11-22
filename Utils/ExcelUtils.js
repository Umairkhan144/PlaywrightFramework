// ExcelUtils.js

const ExcelJS = require('exceljs');

class ExcelUtils {
  constructor(filePath, sheetName) {
    this.filePath = filePath;
    this.sheetName = sheetName;
    this.workbook = new ExcelJS.Workbook();
    this.worksheet = null;
  }

  async loadWorkbook() {
    try {
      await this.workbook.xlsx.readFile(this.filePath);
      this.worksheet = this.workbook.getWorksheet(this.sheetName);
      console.log('Workbook and worksheet loaded successfully.');
    } catch (error) {
      console.error('Error loading workbook:', error);
      throw error;
    }
  }

  getCellValue(row, column) {
    try {
      const cell = this.worksheet.getCell(`${column}${row}`);
      // Check if the cell value is null or undefined, and return an empty string in that case
      return cell.value !== null && cell.value !== undefined ? cell.value.toString() : '';
    } catch (error) {
      console.error(`Error getting cell value at row ${row}, column ${column}:`, error);
      throw error;
    }
  }

  getRowCount() {
    return this.worksheet.rowCount;
  }

  getColumnCount() {
    return this.worksheet.columnCount;
  }

  getAllRowValues(column) {
    const columnValues = [];
    for (let i = 2; i <= this.getRowCount(); i++) {
      const cellValue = this.getCellValue(i, column);
      columnValues.push(cellValue);
    }
    return columnValues;
  }
}

module.exports = ExcelUtils;
