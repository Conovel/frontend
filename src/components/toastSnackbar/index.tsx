import { useEffect, useState, useCallback } from 'react'
import { Snackbar, Alert } from '@mui/material'
import {  useLocation, useNavigate  } from 'react-router';

type Severity = 'error' | 'warning' | 'info' | 'success' // MUIのAlertの種類
type Variant = 'standard' | 'filled' | 'outlined' // MUIのAlertのvariant

interface Props {
  variant?: Variant
}

export default function ToastSnackbar({
  variant = 'standard',
}: Props) {
  const location = useLocation()
  const navigate = useNavigate()

  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastSeverity, setToastSeverity] = useState<Severity>('info')

  const hideDurationTime = 5000
  const verticalPosition = 'bottom' // 'top' | 'bottom'
  const horizontalPosition = 'center' // 'left' | 'center' | 'right'
  const ssnackberSx = {
    mb: 12,
    zIndex: 3000, // MUIのデフォルトは1400
  } 
  const alertSx = {
    width: '100%',
    boxShadow: 6,
  }
  
  const handleToastClose = useCallback((_event?: unknown, reason?: string) => {
    if (reason === 'clickaway') return
    setToastOpen(false)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const msg = params.get('message')
    const level = params.get('messageLevel')

    if (msg) {
      setToastMessage(msg)

      switch ((level || '').toLowerCase()) {
        case 'error':
          setToastSeverity('error')
          break
        case 'warning':
          setToastSeverity('warning')
          break
        case 'success':
          setToastSeverity('success')
          break
        default:
          setToastSeverity('info')
      }

      setToastOpen(true)

      // クエリを消してリロード時に再表示されないようにする
      // react-router の navigate がある場合は replace、なければ history API を使う
      try {
        navigate(location.pathname + location.hash, { replace: true })
      } catch {
        window.history.replaceState({}, document.title, location.pathname + location.hash)
      }
    }
  }, [location.search, location.pathname, location.hash, navigate])
  
  return (
    <Snackbar
      open={toastOpen}
      autoHideDuration={hideDurationTime}
      onClose={handleToastClose}
      anchorOrigin={{
        vertical: verticalPosition,
        horizontal: horizontalPosition,
      }}
      sx={{
        mb: ssnackberSx.mb,
        zIndex: ssnackberSx.zIndex,
      }}
    >
      <Alert
        onClose={handleToastClose}
        severity={toastSeverity}
        variant = {variant}
        sx={(theme) => ({
          width: alertSx.width,
          boxShadow: theme.shadows[alertSx.boxShadow],
        })}>
        {toastMessage}
      </Alert>
    </Snackbar>
  )
}