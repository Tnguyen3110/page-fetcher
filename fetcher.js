const request = require('request');
const fs = require('fs');
const https = require('https');

const url = process.argv[2];
const localFilePath = process.argv[3];

request.get(url, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Failed to download file: ${response.statusMessage}`);
    return;
  }

  const fileSizeInBytes = Buffer.byteLength(body);
  const content = `Downloaded and saved ${fileSizeInBytes} bytes to ${localFilePath}`;

  fs.writeFile(localFilePath, body, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(content);
  });
});