# Google Sheet cells unmerger and joiner

The tool for unmerging merged cells and joining cells in Google Sheets Documents.

# How doest it work?
1. Open a Google speadsheet.
2. in the menu -> Tools -> Script editor (Result: "Untitled project" new screen should be opened).
3. On the "Untitled project" replace 

function myFunction() {
  
}

with the code from the unmerger_script.js.

4. Press Ctrl + S to save the project and enter any name.
5. Return to the Google spreadsheet and reload the page (the script editor project screen has been closed, it's okay).
6. At this step a new "Merge Join helper" menu should appear.
7. Unmerge selected cells -> obviously, unmerges only selected cells.
   Unmerge all cells -> unmerges all flound merged cells on the spreadsheet.
   Join two cells -> joins two selected cells into one with value fron two cells. It works for two selected rows as well.
   Create stepId column -> select a few rows and click this button, it inserts the new column with unique id judging on the   uniqueness of value in the selected rows. Probably, you don't eed this option if you don't know why you should need it -))

Makes Google Sheet Great! (again?)
