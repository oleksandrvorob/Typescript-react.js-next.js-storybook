import path from 'path'
import nodemailer from 'nodemailer'
import sesTransport from 'nodemailer-ses-transport'
import hbs from 'nodemailer-express-handlebars'

import { getTimeStamp } from 'lib/utils/getTimeStamp'

import { DrawRequest } from 'entities/DrawRequest'
import { ClientEntity } from 'entities/ClientEntity'

const sesTransporter = nodemailer.createTransport(
  sesTransport({
    // @ts-ignore
    accessKeyId: 'AKIAXOKDVR2ZDEYAOQX6',
    secretAccessKey: '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',
    region: 'us-west-2',
  }),
)

const handlebarOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./src/templates/'),
    layoutsDir: path.resolve('./src/templates/'),
    defaultLayout: 'wire-alert.html',
    helpers: {
      formatDate: getTimeStamp
    },
  },
  viewPath: path.resolve('./src/templates/'),
  extName: '.html',
}

sesTransporter.use('compile', hbs(handlebarOptions))

const sendList = process.env.NODE_ENV === 'production' ? [
  'abrown@quantafinance.com',
  'tdin@quantafinance.com',
  'jatamian@quantafinance.com',
  'jmitchell@quantafinance.com',
  'drachman@quantafinance.com',
  'vlopez@quantafinance.com'
] : [
    'abrown@quantafinance.com'
  ]


export default (drawRequest: DrawRequest, client: ClientEntity, callback: any) => {
  const mailOptions = {
    from: 'noreply@quantaportal.com',
    to: sendList,
    subject: 'Rehab Wire Out Alert',
    template: 'wire-alert',
    context: { ...drawRequest, ...client }
  }

  sesTransporter.sendMail(mailOptions, callback)
}

