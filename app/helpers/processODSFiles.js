const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const sleep = require('./sleep');

// const { Sequelize, DataTypes } = require('sequelize');
const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB} = process.env
// const sequelize = new Sequelize(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}`)
const { R } = require("redbean-node");
R.setup('postgres', {
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB
});


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
    // Start a transaction
    R.begin();

    // Loop through the JSON array and create records
    for (const jsonData of jsonDataArray) {
      const item = R.dispense(tableName);
      for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
          item[key] = jsonData[key];
        }
      }
      R.store(item);
    }

    // Commit the transaction
    R.commit();
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
      // Create a dynamic model based on the JSON data
      // const model = sequelize.define(tableName, {});

      // // Synchronize the model with the database
      // await model.sync();

      // // Insert JSON data into the table
      // await model.bulkCreate(jsonData);

      // Now you can work with the jsonData as a JSON array
      // console.log(`Data from ${file}:`, jsonData);

      // let beam = R.dispense(tableName);
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
