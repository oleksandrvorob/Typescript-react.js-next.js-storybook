import { NextApiRequest, NextApiResponse } from 'next'
import nc
  from 'next-connect'
import formidable from 'formidable'

import parse from 'date-fns/parse'
import isValid from 'date-fns/isValid'
import format from 'date-fns/format'

import _get from 'lodash/get'

import { uploadToS3 } from 'server/utils'
import { Post as PostFile, FindOne as FindFile } from 'lib/services/file'
import { FindOne as FindReport } from 'lib/services/collateralReport'
// import { Post as PostCollateralReport } from 'lib/services/collateralReport'

const BUCKET_NAME = 'quanta-uploads'
const FILENAME_REGEX = /[0-9]/g
const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req, res) => {
  // const user = req.session.get('user')
  const user = null
  const form = new formidable.IncomingForm()

  // parse files from the multiform data and upload to s3
  form.parse(req, async (err, _, files) => {
    const file = files.file

    if (err || !file) {
      res.statusCode = 422
      res.statusMessage = 'file could not be read'
      return res.end()
    }

    const fileNameArr = file.name.match(FILENAME_REGEX)
    const fileNameStr = fileNameArr ? fileNameArr.join('') : ''
    const maybeParsed = parse(fileNameStr, 'MMddyy', new Date())

    if (!isValid(maybeParsed)) {
      res.statusCode = 422
      res.statusMessage = 'filename must contain date'
      return res.end()
    }

    const reportDate = format(maybeParsed, 'yyyy-MM-dd')
    const doesExist = await FindReport({ reportDate })

    if (doesExist) {
      res.statusCode = 409
      res.statusMessage = 'report already exists'
      return res.end()
    }

    const folder = format(maybeParsed, 'yyyyMMdd')
    const fileKey = `collateral-report/${folder}/${file.name}`

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileKey,
      ContentType: file.type,
      ContentLength: file.size,
    }

    const uploadedData = await uploadToS3(file.path, params)

    const existingFile = await FindFile({ name: fileKey })

    let fileId: string

    if (_get(existingFile, 'id')) {
      fileId = _get(existingFile, 'id') as string
    } else {
      const fid = await PostFile({
        name: uploadedData.Key,
        s3Hash: uploadedData.ETag,
        s3Url: uploadedData.Location,
        userId: user.id,
        contentType: file.type,
      })

      fileId = _get(fid, 'id')
    }

    console.log(fileId)

    res.json({ fileId })
  })
})

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
