import { EventSubscriber, EntitySubscriberInterface, InsertEvent, RemoveEvent } from 'typeorm'

import { DrawRequest } from 'entities/DrawRequest'
import { DrawRequestReimbursement } from 'entities/DrawRequestReimbursement'

import { getFloat } from 'lib/utils'

@EventSubscriber()
export default class DrawRequestReimbursementSubscriber
  implements EntitySubscriberInterface<DrawRequestReimbursement> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return DrawRequestReimbursement
  }

  async afterInsert(event: InsertEvent<DrawRequestReimbursement>) {
    // const drawRequest = await event.manager.findOne(DrawRequest, {
    //   id: event.entity.drawRequest.id,
    // })

    // const newAmount = getFloat(event.entity.amount) + getFloat(drawRequest.reimbursedAmount)

    // drawRequest.reimbursedAmount = `${newAmount}`

    // if (newAmount >= getFloat(drawRequest.approvedAmount)) {
    //   drawRequest.status = 'reimbursed'
    //   drawRequest.reimbursedDate = new Date()
    // }

    // await event.manager.save(drawRequest)
  }

  async beforeRemove(event: RemoveEvent<DrawRequestReimbursement>) {
    // const drawRequest = await event.manager.findOne(DrawRequest, {
    //   id: event.entity.drawRequest.id,
    // })

    // const newAmount = getFloat(drawRequest.reimbursedAmount) - getFloat(event.entity.amount)
    // drawRequest.reimbursedAmount = `${newAmount >= 0 ? newAmount : 0}`
    // await event.manager.save(drawRequest)
  }
}
