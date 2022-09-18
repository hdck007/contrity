const AWS = require('aws-sdk');

const s3 = new AWS.S3({
 apiVersion: '2006-03-01',
 accessKeyId: `${process.env.NEXT_PUBLIC_FILEBASE_KEY}`,
 secretAccessKey: `${process.env.NEXT_PUBLIC_FILEBASE_SECRET}`,
 endpoint: 'https://s3.filebase.com',
 region: 'us-east-1',
 s3ForcePathStyle: true
})

export const listBuckets = () => {
  s3.listBuckets(function (err, data) {
 if (err) {
   console.log("Error when listing buckets", err);
 } else {
   console.log("Success when listing buckets", data);
 }
 })
}

const uploadProvider = (fileBlob, filepath, filemimetype) => {
 const params = {
  Bucket: 'github-pr-nft-marketplace',
  Key: filepath,
  ContentType: filemimetype,
  Body: fileBlob,
  ACL: 'public-read',
};

try {
 const request = s3.putObject(params);
request.send();
console.log("Uploaded")
} catch(err) {
 console.error(err.message);
}
}

export default uploadProvider;