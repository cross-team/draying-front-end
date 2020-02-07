import React, { useState } from 'react'
import AllStops from './all-stops'
import EditStop from './edit-stop'
import AddStops from './add-stop'
import AddLocation from './add-location'

const StopsPanel = ({ draying }) => {
  const [edit, setEdit] = useState(false)
  const [selectedStop, setSelectedStop] = useState()
  const [addS, setAddS] = useState(false)
  const [addL, setAddL] = useState(false)
  const [isTerminal, setIsTerminal] = useState(false)

  const content = () => {
    if (addL) {
      return <AddLocation setAddL={setAddL} />
    } else if (addS) {
      return <AddStops setAddS={setAddS} draying={draying} setAddL={setAddL} />
    } else if (edit) {
      return (
        <EditStop
          stop={selectedStop}
          stopLocation={edit}
          setEdit={setEdit}
          isTerminal={isTerminal}
          setIsTerminal={setIsTerminal}
          drayingId={draying.id}
        />
      )
    } else {
      return (
        <AllStops
          draying={draying}
          setEdit={setEdit}
          setAddS={setAddS}
          setIsTerminal={setIsTerminal}
          setSelectedStop={setSelectedStop}
        />
      )
    }
  }

  return content()
}

export default StopsPanel
