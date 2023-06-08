const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: '127.0.0.1',
  port: 9000,
  useSSL: false,
  accessKey: 'aAVrrQzmQvsA4VZB', // MinIO access key
  secretKey: 'WBl3qX5l4qFWZhmH1ZGgbkQ49vXKRUmF', // MinIO secret key
});

module.exports = {minioClient};