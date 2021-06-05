import { useCallback, useState, useEffect } from 'react'
import { isEmpty as _isEmpty, omit as _omit } from 'lodash'

import styled, { css } from 'styled-components'
import { useDropzone } from 'react-dropzone'

import { Link, Typography } from '@material-ui/core'

import { post } from 'lib/fetch'
import Flex from '../Flex'
import File from './File'
import { FileStatus } from './types'
import CloudIcon from './CloudIcon'

const Stack = styled(Flex)`
  padding: 32px;

  > * + * {
    margin-top: 8px;
  }
`

const StackX = styled(Flex)`
  max-width: 100%;
  flex-wrap: wrap;

  > * {
    margin-top: 16px;
    margin-left: 16px;
  }
`

interface DropBackground {
  isDragActive: boolean
  isDragAccept: boolean
}

const Border = styled.div<DropBackground>`
  border-radius: 4px;
  outline: none;

  ${({ theme, isDragActive = false, isDragAccept = true }) => css`
    border: 2px dashed
      ${isDragActive
        ? isDragAccept
          ? theme?.palette?.primary?.main
          : theme?.palette?.error?.light
        : theme?.palette?.divider};
  `}
`

type Files = Record<string, File>
type Statuses = Record<string, FileStatus>
type Errors = Record<string, string>

export default () => {
  const [files, setFiles] = useState<Files>({} as Files)
  const [statuses, setStatuses] = useState<Statuses>({} as Statuses)
  const [errMessages, setErrMessages] = useState<Errors>({} as Errors)

  const handleRemove = (uuid: string) => {
    setFiles((x: Files) => _omit(x, uuid))
    setStatuses((y: Statuses) => _omit(y, uuid))
    setErrMessages((x: Errors) => _omit(x, uuid))
  }

  const submit = async (uuid: string, file: File) => {
    const data = new FormData()
    data.append('file', file)
    try {
      console.log(data)
      const resp = await post('/api/postprocessing/report', data)
      console.log(resp)
      setStatuses((x) => ({ ...x, [uuid]: 1 }))
    } catch (e) {
      setStatuses((x) => ({ ...x, [uuid]: 0 }))
      setErrMessages((x) => ({ ...x, [uuid]: e.message }))
    }
  }

  useEffect(() => {
    for (let [k, v] of Object.entries(files)) {
      if (!(k in statuses)) {
        submit(k, v)
      }
    }
  }, [JSON.stringify(files)])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const incoming = acceptedFiles.reduce<Files>((a: Files, file: File) => {
      const uuid = file.name
      return { ...a, [uuid]: file }
    }, {})

    setFiles((ff) => ({ ...ff, ...incoming }))
  }, [])

  const { getRootProps, getInputProps, isDragAccept, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  const { onClick, ...rootProps } = getRootProps()

  return (
    <div>
      <Border {...rootProps} isDragActive={isDragActive} isDragAccept={isDragAccept}>
        <input {...getInputProps()} />
        <Stack justify="center" align="center" direction="column">
          <StackX>
            {!_isEmpty(files) &&
              Object.entries(files).map(([uuid, file]) => (
                <File
                  key={uuid}
                  fileName={file.name}
                  status={statuses?.[uuid] ?? -1}
                  errorMessage={errMessages?.[uuid]}
                  onRemove={(_e) => handleRemove(uuid)}
                />
              ))}
          </StackX>
          <CloudIcon isDragAccept={isDragAccept} isDragActive={isDragActive} />
          <Typography color="textSecondary">
            {isDragActive && !isDragAccept ? (
              <>Only .xlsx files are supported</>
            ) : (
              <>
                Drag and drop your files for upload <Link onClick={onClick}>or Click Here</Link>
              </>
            )}
          </Typography>
        </Stack>
      </Border>
    </div>
  )
}
