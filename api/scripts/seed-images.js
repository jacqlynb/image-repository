const fs = require('fs');
const fsPromises = fs.promises;
const util = require('util');
const { default: axios } = require('axios');
const { Buffer } = require('buffer');
const {
  RekognitionClient,
  DetectLabelsCommand,
} = require('@aws-sdk/client-rekognition');
const connection = require('../config/mysql-config.js');
const awsConfig = require('../config/aws-config.js');

const IMAGE_DIRECTORY =
  '/Users/jacqlyn/Downloads/artic-api-data/json/artworks/';
const BASE_URL = 'https://www.artic.edu/iiif/2/';
const URL_SUFFIX = '/full/843,/0/default.jpg';

const client = new RekognitionClient(awsConfig);

async function run() {
  try {
    const fileNames = await fsPromises.readdir(IMAGE_DIRECTORY);
    await readFiles(fileNames);
    connection.end();
  } catch (error) {
    throw error;
  }
}

async function readFiles(fileNames) {
  for (let i = 0; i < fileNames.length; i++) {
    try {
      // get data
      const rawData = await fsPromises.readFile(IMAGE_DIRECTORY + fileNames[i]);
      const data = JSON.parse(rawData);

      // if image exists
      if (data.image_id) {
        // prepare data
        const image_url = getImageURL(data.image_id);
        const rawLabels = await getImageLabels(image_url);
        const labels = rawLabels ? formatLabels(rawLabels.Labels) : '';

        // seed prepared data
        await seed({
          image_id: data.image_id,
          image_url,
          title: data.title,
          author: data.artist_titles.join(', '),
          date_display: data.date_display,
          labels,
        });
      }
    } catch (error) {
      throw error;
    }
  }
  return;
}

function getImageURL(image_id) {
  return BASE_URL + image_id + URL_SUFFIX;
}

async function getImageLabels(image_url) {
  return await axios({
    method: 'get',
    url: image_url,
    responseType: 'arraybuffer',
  })
    .then(async (response) => {
      if (response.data) {
        const detectLabelsCommand = new DetectLabelsCommand({
          Image: {
            Bytes: Buffer.from(response.data),
          },
        });

        const labels = await client.send(detectLabelsCommand);
        return labels;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log('failed axios request', error.message);
    });
}

function formatLabels(labels) {
  return labels
    .map((label) => {
      return label.Name + ':' + Math.round(label.Confidence * 100) / 100;
    })
    .join('');
}

async function seed(data) {
  const query = util.promisify(connection.query).bind(connection);
  try {
    await query('INSERT INTO images SET ?', data);
    return;
  } catch (error) {
    throw error;
  }
}

run();
