import fs from 'fs'
import { S3 } from 'aws-sdk'

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

function uploadToS3(
  filePath: string,
  params: S3.PutObjectRequest,
): Promise<S3.ManagedUpload.SendData> {
  var fileStream = fs.createReadStream(filePath)

  return new Promise(function (resolve, reject) {
    fileStream.once('error', reject)
    s3.upload({ ...params, Body: fileStream })
      .promise()
      .then(resolve, reject)
  })
}

export default uploadToS3
