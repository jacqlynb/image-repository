require('dotenv').config();

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
  region: process.env.AWS_REGION,
};

module.exports = awsConfig;
