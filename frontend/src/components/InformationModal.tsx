import { Modal, Box, Typography, Stack, CircularProgress } from '@mui/material'
import type { InformationModalProps } from '../interfaces/information-modal-props.interface'
import type { InformationModal } from '../interfaces/information-modal.interface'
import type { SyntheticEvent } from 'react'

const style = {
  top: '50%',
  left: '50%',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  border: '2px solid transparent',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  width: 400,
  p: 2
}

const InformationModal = ({ informationModal, resetInformationModal }: InformationModalProps) => {
  const { title, visible, loading, message } = informationModal

  const handleOnClose = (_: SyntheticEvent, reason: string) => {
    if (reason !== 'backdropClick') {
      resetInformationModal()
    }
  }

  return (
    <>
      <Modal
        open={visible}
        onClose={handleOnClose}
        aria-labelledby="information-modal-title"
        aria-describedby="information-modal-description"
      >
        <Box sx={style}>
          <Typography id="information-modal-title" variant="h6" component="h2">
            {title}
          </Typography>

          <Stack alignItems="center" justifyContent="center" my={1} gap={1}>
            <Typography id="information-modal-description" align="center">
              {message}
            </Typography>

            {loading && <CircularProgress size={25} />}
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

export default InformationModal
