import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  TextField
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTimes, faCheck } from '@fortawesome/pro-light-svg-icons/'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const UPDATE_DRAYING = gql`
  mutation updateDraying($drayingId: Int, $field: String, $value: String) {
    updateDraying(drayingId: $drayingId, field: $field, value: $value) {
      success
      message
      updatedId
    }
  }
`

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: theme.palette.primary.contrastText
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1)
  }
}))

const OrderPanel = ({ draying }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [edit, setEdit] = useState(false)
  const [booking, setBooking] = useState('')
  debugger
  const [updateDraying, { data }] = useMutation(UPDATE_DRAYING)

  useEffect(() => setBooking(draying.booking), [draying.booking])

  const handleClick = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChange = event => {
    setBooking(event.target.value)
  }

  const handleEdit = () => {
    setEdit(true)
    handleClose()
  }

  const handleCancel = () => {
    setEdit(false)
    setBooking(draying.booking)
  }
  
  const handleSave = () => {
    updateDraying({ variables: {
      drayingId: parseInt(draying.id),
      field: 'Booking',
      value: booking
    }})
  }

  let doStatus = ''
  if (draying.containerStage.id === '2' || draying.containerStage.id === '3') {
    doStatus = 'On the Sea'
  } else if (draying.containerStage.id === '4' || draying.containerStage.id === '5') {
    doStatus = 'To Dispatch'
  } else if (draying.containerStage.id === '6') {
    doStatus = 'Dispatched'
  } else if (draying.containerStage.id === '9') {
    doStatus = 'Completed'
  } else if (draying.containerStage.id === '10') {
    doStatus = 'Reviewed'
  } else if (draying.containerStage.id === '11') {
    doStatus = 'Invoiced'
  }

  console.log(data)

  return (
    <>
      <AppBar position='static'>
        <Toolbar className={classes.header}>
          <Typography className={classes.headerText}>Order</Typography>
          <div>
            { edit && 
              <>
                <IconButton onClick={handleSave}>
                  <FontAwesomeIcon className={classes.headerText} icon={faCheck} />
                </IconButton>
                <IconButton
                  onClick={handleCancel}
                >
                  <FontAwesomeIcon className={classes.headerText} icon={faTimes} />
                </IconButton>
              </>
            }
            <IconButton onClick={handleClick}>
              <FontAwesomeIcon className={classes.headerText} icon={faEllipsisV} />
            </IconButton>
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit Order</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div className={classes.details}>
        <div>
          <Typography>{draying.order ? `#${draying.order.id}` : 'No order number was found for this trip.'}</Typography>
          { edit ? <TextField label='Booking' value={booking} onChange={handleChange} /> : <Typography>{`#${draying.booking}`}</Typography>}
        </div>
        <div>
          <Typography>{doStatus}</Typography>
          <Typography>{draying.client.companyName}</Typography>
        </div>
      </div>
    </>
  )
}

export default OrderPanel