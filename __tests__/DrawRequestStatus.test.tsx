import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import {
  toBeInTheDocument,
  toHaveValue,
  toBeVisible,
  toHaveTextContent,
  toContainElement,
} from '@testing-library/jest-dom/matchers'

import DrawRequestStatus from 'components/DrawRequest/Status'
import { DrawRequest, Inspection } from 'lib/interfaces'
import useUser from 'lib/useUser'
import { act } from 'react-dom/test-utils'

const handleSubmit = (data: Partial<DrawRequest>) => {}
expect.extend({ toBeInTheDocument, toHaveValue, toBeVisible, toHaveTextContent, toContainElement })

jest.mock('lib/useUser', () => jest.fn())

beforeAll(() => {
  // @ts-ignore
  useUser.mockClear()
})

afterAll(() => {
  jest.resetAllMocks()
})

test('draw status `new`', async () => {
  const drawRequest: Partial<DrawRequest> = {
    status: 'new',
    requestedAmount: '$50,000',
    requestedDate: new Date('01/01/2020'),
  }

  const utils = render(
    <DrawRequestStatus drawRequest={drawRequest} allowedAmount={30000} onApprove={handleSubmit} />,
  )

  const stepNew = utils.getByTestId('stepper-new')

  // make sure step is there with correct label
  expect(stepNew).toBeInTheDocument()
  expect(stepNew).toHaveTextContent('new')
  expect(stepNew.children.length).toBe(2)

  expect(utils.container).toMatchSnapshot()

  // should have date, date should be correct
  const stepNewDate = utils.getByTestId('stepper-new-date')
  expect(stepNew).toContainElement(stepNewDate)
  expect(stepNewDate).toHaveTextContent('01.01.2020')

  // should not have the form
  expect(utils.container).not.toContainElement(utils.queryByLabelText('Approved Amount'))
  expect(utils.queryByTestId('approval-form-button')).not.toBeInTheDocument()

  // should have inspection ordered, but no date
  expect(utils.getByTestId('stepper-inspection ordered')).toBeInTheDocument()
  expect(utils.getByTestId('stepper-inspection ordered').children.length).toBe(1)
})

test('draw status `inspection ordered`', async () => {
  const drawRequest: Partial<DrawRequest> = {
    status: 'inspection ordered',
    requestedAmount: '$50,000',
    requestedDate: new Date('01/01/2020'),
  }

  const inspection: Partial<Inspection> = {
    orderedDate: new Date('01/02/2020'),
  }

  const { getByText, queryByTestId, queryByLabelText } = render(
    <DrawRequestStatus
      drawRequest={drawRequest}
      allowedAmount={30000}
      onApprove={handleSubmit}
      inspection={inspection}
    />,
  )

  expect(getByText('inspection ordered')).toBeInTheDocument()
  expect(getByText('01.02.2020')).toBeInTheDocument()
  expect(queryByTestId('approval-form-button')).not.toBeInTheDocument()
  expect(queryByLabelText('Approved Amount')).not.toBeInTheDocument()
})

test('draw status `inspection ordered`, basic without privilege', async () => {
  const drawRequest: Partial<DrawRequest> = {
    status: 'inspection approved',
    requestedAmount: '$50,000',
    requestedDate: new Date('01/01/2020'),
  }

  const inspection: Partial<Inspection> = {
    orderedDate: new Date('01/02/2020'),
    approvedDate: new Date('01/03/2020'),
  }

  const mockSubmit = jest.fn((data: Partial<DrawRequest>) => {})

  // @ts-ignore
  useUser.mockImplementation(() => ({
    user: {
      isExec: () => false,
    },
  }))

  const utils = render(
    <DrawRequestStatus
      drawRequest={drawRequest}
      allowedAmount={30000}
      onApprove={mockSubmit}
      inspection={inspection}
    />,
  )

  expect(utils.getByTestId('stepper-inspection approved')).toHaveTextContent('01.03.2020')

  expect(utils.getByText('inspection approved')).toBeInTheDocument()
  expect(utils.queryByTestId('approval-form-button')).toBeInTheDocument()
  expect(utils.queryByLabelText('Approved Amount')).toBeInTheDocument()

  // use input and test
  await act(async () => {
    fireEvent.change(utils.queryByLabelText('Approved Amount'), { target: { value: '30000' } })
  })

  expect(utils.queryByLabelText('Approved Amount')).toHaveValue('$30,000')

  await act(async () => {
    fireEvent.click(utils.queryByTestId('approval-form-button'))
  })

  expect(mockSubmit).toHaveBeenCalledWith({
    approvedAmount: '$30,000',
    approvedDate: expect.anything(),
    // This should be fine since we don't have overage
    status: 'approved',
  })
})

test('draw status `inspection ordered`, overage without privilege', async () => {
  const drawRequest: Partial<DrawRequest> = {
    status: 'inspection approved',
    requestedAmount: '$50,000',
    requestedDate: new Date('01/01/2020'),
  }

  const inspection: Partial<Inspection> = {
    orderedDate: new Date('01/02/2020'),
    approvedDate: new Date('01/03/2020'),
  }

  const mockSubmit = jest.fn((data: Partial<DrawRequest>) => {})

  // @ts-ignore
  useUser.mockImplementation(() => ({
    user: {
      isExec: () => false,
    },
  }))

  const utils = render(
    <DrawRequestStatus
      drawRequest={drawRequest}
      allowedAmount={30000}
      onApprove={mockSubmit}
      inspection={inspection}
    />,
  )

  expect(utils.getByTestId('stepper-inspection approved')).toHaveTextContent('01.03.2020')

  expect(utils.getByText('inspection approved')).toBeInTheDocument()
  expect(utils.queryByTestId('approval-form-button')).toBeInTheDocument()
  expect(utils.queryByLabelText('Approved Amount')).toBeInTheDocument()

  // use input and test
  await act(async () => {
    fireEvent.change(utils.queryByLabelText('Approved Amount'), { target: { value: '32000' } })
  })

  expect(utils.queryByLabelText('Approved Amount')).toHaveValue('$32,000')

  await act(async () => {
    fireEvent.click(utils.queryByTestId('approval-form-button'))
  })

  // Same as last test, but should NOT have date
  expect(mockSubmit).toHaveBeenCalledWith({
    approvedAmount: '$32,000',
  })
})

test('draw status `inspection ordered`, overage with privilege', async () => {
  const drawRequest: Partial<DrawRequest> = {
    status: 'inspection approved',
    requestedAmount: '$50,000',
    requestedDate: new Date('01/01/2020'),
  }

  const inspection: Partial<Inspection> = {
    orderedDate: new Date('01/02/2020'),
    approvedDate: new Date('01/03/2020'),
  }

  const mockSubmit = jest.fn((data: Partial<DrawRequest>) => {})

  // @ts-ignore
  useUser.mockImplementation(() => ({
    user: {
      isExec: () => true,
    },
  }))

  const utils = render(
    <DrawRequestStatus
      drawRequest={drawRequest}
      allowedAmount={30000}
      onApprove={mockSubmit}
      inspection={inspection}
    />,
  )

  expect(utils.getByTestId('stepper-inspection approved')).toHaveTextContent('01.03.2020')

  expect(utils.getByText('inspection approved')).toBeInTheDocument()
  expect(utils.queryByTestId('approval-form-button')).toBeInTheDocument()
  expect(utils.queryByLabelText('Approved Amount')).toBeInTheDocument()

  // use input and test
  await act(async () => {
    fireEvent.change(utils.queryByLabelText('Approved Amount'), { target: { value: '32000' } })
  })

  expect(utils.queryByLabelText('Approved Amount')).toHaveValue('$32,000')

  await act(async () => {
    fireEvent.click(utils.queryByTestId('approval-form-button'))
  })

  // Same as last test, but should NOT have date
  expect(mockSubmit).toHaveBeenCalledWith({
    approvedAmount: '$32,000',
    approvedDate: expect.anything(),
    // Should actually move to 'approved' status if person has permission
    status: 'approved',
  })
})
