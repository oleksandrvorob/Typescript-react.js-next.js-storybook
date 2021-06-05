import axios from 'axios'

import FileList from './FileList'
import styled from 'styled-components'
import UploadButton from './UploadButton'
import format from 'date-fns/format'
import DocumentDrop from './DocumentDrop'
import { Typography } from '@material-ui/core'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const Wrapper = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 11px 15px 1px rgba(0, 0, 0, 0.02), 0px 4px 20px 3px rgba(0, 0, 0, 0.02);
  outline: none;
  border-radius: 4px;
  margin-top: 16px;
  flex-basis: 826px;
  position: relative;
`

const Header = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
`

const files = [
  {
    id: 1,
    fileName: 'New Plan.pdf',
    fileType: 'pdf',
    date: '20 Oct 2020, 16:08',
    file: null,
  },
  {
    id: 2,
    fileName: 'Photo1.jpg',
    fileType: 'jpg',
    date: '20 Oct 2020, 16:08',
    file: null,
  },
  {
    id: 3,
    fileName: 'Word.doc',
    fileType: 'doc',
    date: '20 Oct 2020, 16:08',
    file: null,
  },
  {
    id: 4,
    fileName: 'excel.xls',
    fileType: 'xls',
    date: '20 Oct 2020, 16:08',
    file: null,
  },
]

const Documents = () => {
  const [fileData, setFileData] = useState(files)
  const [showDrag, setShowDrag] = useState(false)

  const onDrop = useCallback(() => {
    setShowDrag(true)
  }, [showDrag])

  const handleDelete = useCallback(
    (fileId) => {
      const newData = fileData.filter((x) => x.id !== fileId)
      setFileData(newData)
    },
    [fileData],
  )

  const handleUpload = (file: File, idx: number) => {
    const onUploadProgress = (progressEvent) => {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      setFileData((_fileData) => {
        return _fileData.map((x) => (x?.id === idx ? { ...x, status: percentCompleted } : x))
      })
    }

    let data = new FormData()
    data.append('file', file)

    axios
      .post('api/v1/file-upload', data, { onUploadProgress })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  const handleDrop = (fileList) => {
    const newFiles = Array.from(fileList).map((file: File, idx: number) => {
      const extension = file.name.slice(file.name.lastIndexOf('.'))

      const index = fileData.length + idx + 1

      return {
        // make negative so it won't overlap files from db
        id: -index,
        fileName: file.name,
        fileType: extension,
        date: format(new Date(), 'LLL d yyyy, hh:mm'),
        file,
      }
    })

    setFileData([...fileData, ...newFiles])

    fileList.forEach((file: File, idx: number) => {
      const index = fileData.length + idx + 1
      handleUpload(file, -index)
    })
  }

  const { getRootProps, isDragActive } = useDropzone({ onDrop })

  const { ...rootProps } = getRootProps()

  return (
    <Wrapper {...rootProps}>
      <Header>
        <Typography color="textSecondary" variant="body2">
          Documents ({fileData.length})
        </Typography>
        <UploadButton onUpload={handleDrop} />
      </Header>
      <FileList onDelete={handleDelete} fileList={fileData} />

      <DocumentDrop onUpload={handleDrop} show={isDragActive} />
    </Wrapper>
  )
}

export default Documents
