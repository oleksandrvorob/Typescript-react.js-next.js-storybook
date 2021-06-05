import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

import _isEmpty from 'lodash/isEmpty'

import { Get } from 'lib/services/drawRequest'
import { getSQ } from 'lib/services/base'
import { getDiff } from 'lib/utils'

import sendEmail from 'server/utils/sendEmail'

import { getTimeStamp } from 'lib/utils/getTimeStamp'
import { getFloat, formatMoney } from 'lib/utils'

const handler = nextConnect()

handler
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const drawRequest = await Get(String(id))
    res.json({ drawRequest })
  })
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query

    const sq = getSQ()

    const drawRequest = await sq.from`draw_request`.where({ id }).one()

    const updates = getDiff(drawRequest, req.body)

    let updatedRow = {}

    if (!_isEmpty(updates)) {
      try {
        updatedRow = await sq.from`draw_request`.where({ id }).set(updates).return`*`.one()
      } catch (e) {
        console.log(e)
      }
    }

    if (!!drawRequest?.disbursedDate) {
      const loanContract = await sq.from`loan_contract`.where({ id: drawRequest.loanId }).one()
      drawRequest.loanContract = loanContract
      drawRequest.disbursedDate = updates.disbursedDate

      const clientEntity = await sq.from`client_entity`.where({ id: loanContract.cid }).one()
      const clientCompany = await sq.from`client_company`.where({ id: clientEntity.companyId }).one()

      clientEntity.company = clientCompany
      drawRequest.disbursedDate = getTimeStamp(drawRequest.disbursedDate)
      drawRequest.requestedDate = getTimeStamp(drawRequest.requestedDate)
      drawRequest.requestedDate = getTimeStamp(drawRequest.requestedDate)

      const netWireAmount = getFloat(drawRequest.approvedAmount) - getFloat(drawRequest.inspectionFee) - getFloat(drawRequest.wireFee)

      drawRequest.netWireAmount = formatMoney(netWireAmount)

      await sq.end()
      sendEmail(drawRequest, clientEntity, (error, info) => {
        console.log(error)
        console.log(info)

        if (error) {
          res.statusCode = 500
          res.statusMessage = error
          res.end()
        } else {
          res.json(updatedRow)
        }
      })
    } else {

      await sq.end()
      res.json(updatedRow)
    }


  })

export default handler
