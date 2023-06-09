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

    bucketName = "profile"
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

const getUploadLink = async(childId,subProcessId,fileName)=>{
  const bucketName = 'documents';
  const nchildId = childId.replace(/\//g, '_');
  const prefix = `${nchildId}/${subProcessId}/`;
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

const getDocumentUrl = async(childId,subProcessId,fileName)=>{
  console.log(childId,subProcessId,fileName)
  const bucketName = 'documents';
  const nchildId = childId.replace(/\//g, '_');
  const prefix = `${nchildId}/${subProcessId}/`;
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

const deleteDocument = async(childId,subProcessId,fileName)=>{
  const bucketName = 'documents';
  const nchildId = childId.replace(/\//g, '_');
  const prefix = `${nchildId}/${subProcessId}/`;

  const objectName = `${prefix}${fileName}`; // Replace with the desired filename and extension
  minioClient.removeObject(bucketName, objectName,(err) => {
    if (err) {
      console.error('Error:', err);
    } else {
      res.send(`Object ${objectName} deleted successfully from bucket ${bucketName}.`);
    }
  });
}

const getUploadProfilePic = async(folderName)=>{
  const bucketName = 'profile';
  const prefix = `${folderName}/profile_image`;
  try {
    const objectName = `${prefix}`; // Replace with the desired filename and extension
    const url = await minioClient.presignedPutObject(bucketName, objectName,  60 * 60); // Expiry time in seconds

    console.log('Pre-signed URL:', url);
    return url;
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
}

const getProfilePic = async(folderName)=>{
  const bucketName = 'profile';
  const prefix = `${folderName}/profile_image`;
  try {
    const objectName = `${prefix}`; // Replace with the desired filename and extension
    const url = await minioClient.presignedGetObject(bucketName, objectName,  60 * 60); // Expiry time in seconds

    console.log('Pre-signed URL:', url);
    return url;
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
}

module.exports = {createBucketIfNotExist,getUploadLink,getDocumentUrl,deleteDocument,getProfilePic,getUploadProfilePic}