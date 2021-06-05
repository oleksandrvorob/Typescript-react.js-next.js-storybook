import Flex from '../Flex'
import CloudIcon from './CloudIcon'
import styled, { css } from 'styled-components'
import { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Typography } from '@material-ui/core'

interface DocumentDropProps {
  onUpload: (files: File[]) => void
  show: boolean
}

interface DropBackground {
  isDragActive: boolean
  isDragAccept: boolean
}

interface WrapperProps {
  show: boolean
}

const Wrapper = styled.div<WrapperProps>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
`

const Stack = styled(Flex)`
  margin-top: 8rem;
  padding: 32px;

  > * + * {
    margin-top: 8px;
  }
`

const Border = styled.div<DropBackground>`
  border-radius: 4px;
  outline: none;
  height: 100%;

  ${({ theme }) => css`
    border: 4px dashed ${theme?.palette?.action?.disabled};
  `}
`

const DocumentDrop: FC<DocumentDropProps> = ({ onUpload, show }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onUpload(acceptedFiles)
    },
    [onUpload],
  )

  const { getRootProps, isDragAccept, isDragActive } = useDropzone({ onDrop })

  const { ...rootProps } = getRootProps()

  return (
    <Wrapper show={show}>
      <Border {...rootProps} isDragAccept={isDragAccept} isDragActive={isDragActive}>
        <Stack justify="center" align="center" direction="column">
          <CloudIcon isDragAccept={isDragAccept} isDragActive={isDragActive} />
          <Typography color="textSecondary">Drop file here to upload</Typography>
        </Stack>
      </Border>
    </Wrapper>
  )
}

export default DocumentDrop
