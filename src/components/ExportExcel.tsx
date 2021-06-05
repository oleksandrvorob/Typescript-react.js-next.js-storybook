import React, { FunctionComponent } from 'react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

import Box from '@material-ui/core/Box'
import Button, { ButtonProps } from '@material-ui/core/Button'
import GetAppIcon from '@material-ui/icons/GetApp'

interface Props extends ButtonProps {
  csvData: Record<string, any>
  fileName: string
  title: string
}

const ExportCSV: FunctionComponent<Props> = ({ csvData, fileName, title }) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Button
        aria-label="export"
        onClick={() => exportToCSV(csvData, fileName)}
        endIcon={<GetAppIcon />}
      >
        {title}
      </Button>
    </Box>
  )
}

export default ExportCSV
