const {minioClient} = require('./index');

// Now you can use the minioClient object here
const createBucketIfNotExist = async()=>{
    bucketName = "documents"
    minioClient.bucketExists(bucketName, (err, exists) => {
        if (err) {
          console.error('Error:', err);
          return;
        }
      
        if (exists) {
          console.log(`Bucket "${bucketName}" already exists.`);
        } else {
          minioClient.makeBucket(bucketName, (err) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log(`Bucket "${bucketName}" created successfully.`);
            }
          });
        }
      });
}

const getUploadLink = async(childId,processId,fileName)=>{
  const bucketName = 'documents';
  const nchildId = childId.replace(/\//g, '_');
  const prefix = `${nchildId}/${processId}/`;
  try {
    const objectName = `${prefix}${fileName}`; // Replace with the desired filename and extension
    console.log(objectName)
    const url = await minioClient.presignedPutObject(bucketName, objectName, 15 * 60); // Expiry time in seconds

    console.log('Pre-signed URL:', url);
    return url;
  } catch (err) {
    console.error('Error:', err);
    return null;
  }

}

const getDocumentUrl = async(childId,processId,fileName)=>{
  console.log(childId,processId,fileName)
  const bucketName = 'documents';
  const nchildId = childId.replace(/\//g, '_');
  const prefix = `${nchildId}/${processId}/`;
  try {
    const objectName = `${prefix}${fileName}`; // Replace with the desired filename and extension
    const url = await minioClient.presignedGetObject(bucketName, objectName,  60 * 60); // Expiry time in seconds

    console.log('Pre-signed URL:', url);
    return url;
  } catch (err) {
    console.error('Error:', err);
    return null;
  }

}

const deleteDocument = async(childId,processId,fileName)=>{
  const bucketName = 'documents';
  const nchildId = childId.replace(/\//g, '_');
  const prefix = `${nchildId}/${processId}/`;

  const objectName = `${prefix}${fileName}`; // Replace with the desired filename and extension
  minioClient.removeObject(bucketName, objectName,(err) => {
    if (err) {
      console.error('Error:', err);
    } else {
      res.send(`Object ${objectName} deleted successfully from bucket ${bucketName}.`);
    }
  });
}

module.exports = {createBucketIfNotExist,getUploadLink,getDocumentUrl,deleteDocument}