const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const sleep = require('./sleep');

const R = require('./db')

// Specify the input directory where your *.ods files are located
const inputDirectory = '/opt/input'; // Change this to your input directory path

// Function to read an ODS file and convert it to a JSON array
async function readODSFile(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet

  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  return jsonData;
}

function getFilenameWithoutExtension(filePath) {
  return filePath.split('/').pop().split('.')[0];
}

async function batchImportData(tableName, jsonDataArray) {
  try {
    // let book = R.dispense('book');
    // book.title = 'Learn to Program';
    // book.rating = 10;
    // let id = await R.store(book);

    // Start a transaction
    // R.begin(); 
    // console.log(tableName)
    // Loop through the JSON array and create records 
    for (const jsonData of jsonDataArray) {
      let item
      try {
        item = await R.findOne('item', 'type = ? and item_id = ?', [tableName, jsonData.item_id]);
      }
      catch (e) {
      }

      if (!item) {
        item = R.dispense('item')
      } 

      // console.log(jsonData)
      for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {

          item[key] = jsonData[key];
        }
        item.type = tableName
      }
      let id = await R.store(item);
      // console.log({id})
    }

    // Commit the transaction
    // R.commit();
    console.log('Data imported successfully');
  } catch (error) {
    // Rollback the transaction in case of an error 
    R.rollback();
    console.error('Error importing data:', error);
  }
}

// Function to process all *.ods files in the input directory
async function processODSFiles() {
  try {
    const odsFiles = fs.readdirSync(inputDirectory).filter((file) => file.endsWith('.ods'));

    for (const file of odsFiles) {
      const filePath = path.join(inputDirectory, file);
      const jsonData = await readODSFile(filePath);

      const  tableName = getFilenameWithoutExtension(filePath);
      
      await batchImportData(tableName, jsonData)
    }

    console.log('All ODS files processed successfully');
  } catch (error) {
    console.error('Error processing ODS files:', error);

    await sleep(5000)

    await processODSFiles()
  }
}

// Call the function to start processing ODS files
module.exports = processODSFiles
