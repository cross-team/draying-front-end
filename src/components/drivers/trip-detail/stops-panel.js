import React /* useState */ from 'react'
import {
  makeStyles,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/pro-light-svg-icons/'
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
    color: theme.palette.primary.contrastText,
  },
  headerIcons: {
    display: 'flex',
    alignItems: 'center',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
  },
}))

const StopsPanel = ({ draying }) => {
  const classes = useStyles()
  // const [edit, setEdit] = useState(false)
  // const [saving, setSaving] = useState(false)

  const handleClick = event => {}

  /*
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChange = event => {}

  const handleCancel = () => {
    setEdit(false)
  }

  const handleSave = () => {
    setSaving(true)
    updateDraying({
      variables: {
        drayingId: parseInt(draying.id),
        field: 'Booking',
        value: booking,
      },
    })
  }
  */

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Typography className={classes.headerText}>Stops</Typography>
          <div className={classes.headerIcons}>
            {/* {saving && <CircularProgress color="secondary" />} */}
            <IconButton onClick={handleClick}>
              <FontAwesomeIcon className={classes.headerText} icon={faPlus} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.details}>
        <TextField
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          startadornment={
            <InputAdornment position="start">
              <IconButton>
                <FontAwesomeIcon
                  className={classes.headerText}
                  icon={faTimes}
                />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      {/* data && !data.updateDraying.success && (
        <Alert severity="error">{data.updateDraying.message}</Alert>
      ) */}
    </>
  )
}

export default StopsPanel
