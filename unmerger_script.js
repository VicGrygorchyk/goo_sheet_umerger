var HeaderRows = 1; //how many rows header contains
var ColPos = 1; // where insert new row

/**
* A special function that runs when the spreadsheet is open, used to add a
* custom menu to the spreadsheet.
*/
function onOpen() {
 var spreadsheet = SpreadsheetApp.getActive();
 var menuItems = [
   {name: 'Unmerge selected cell', functionName: 'unmergeCell'},
   {name: 'Unmerge all cells', functionName: 'unmergeAllCells'},
   {name: 'Join two cells', functionName: 'joinCells'},
   {name: 'Create stepId column', functionName: 'createStepId'}
 ];
 spreadsheet.addMenu('Import to Zephyr helper', menuItems);
}

/** this function unmerges cell and replaces each cell with duplicate value
* func fails if to run against not-merged cell
*/
function unmergeCell() {
 var sheet = SpreadsheetApp.getActiveSheet();
 var activeCells = sheet.getActiveRange();
 var valueFromCells = activeCells.getValue();
  if(activeCells.getMergedRanges().length == 0){
   SpreadsheetApp.getUi().alert("this is not merged cell");
   return;
 }
  var unmerge = activeCells.breakApart();
 var unMergedRanges = sheet.getActiveRange();
 unMergedRanges.setValue(valueFromCells);
}

function unmergeAllCells() {
 var sheet = SpreadsheetApp.getActiveSheet();
 sheet.getDataRange().getMergedRanges().forEach(function (merged_cell){
   var _value = merged_cell.getValue();
   var selectedRange = merged_cell;
   merged_cell.breakApart();
   selectedRange.setValue(_value);
 });
}

/** this function creates step_id column
* make sure to change headerRows and colPos
* highlight module + submodule columns
*/
function createStepId() {
 var headerRows = HeaderRows ; //how many rows header contains
 var colPos = ColPos ; // where insert new row
  //get values of highlighted column
 var sheet = SpreadsheetApp.getActiveSheet();
 var activeCells = sheet.getActiveRange();
 var activeValues = activeCells.getValues();
  // get how many rows
 var cellInColumn = activeCells.getNumRows() - headerRows;
 // create a new column
 sheet.insertColumnBefore(colPos);
  // set first cell with value
 var StepId = 100;
 sheet.getRange(headerRows+1, colPos).setValue(StepId)

 //set next cells starting from value[headerRows+1]
 for(var i=headerRows+1; i < cellInColumn; i++){
   var cell = sheet.getRange(i+1,1);
   var title = activeValues[i].toString();
   var preTitle = activeValues[i-1].toString();
   if(title != preTitle) {
     StepId++;
   }
   cell.setValue(StepId);
 }
}

/**
* function to join (concatenate) two column
*/
function joinCells() {
   var headerRows = HeaderRows ; //how many rows header contains 
   //get values of highlighted column
   var sheet = SpreadsheetApp.getActiveSheet();
   var activeCells = sheet.getActiveRange();
   var valuesForEachRow = activeCells.getValues();
   var rows = activeCells.getNumRows() - headerRows;

   for(var i=headerRows+1; i < rows; i++){
   var value = valuesForEachRow[i].toString();
   activeCells.getCell(i, 1).setValue(value);
   }
}
