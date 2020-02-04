import React, { useState } from 'react'
import AllStops from './all-stops'
import EditStop from './edit-stop'

const StopsPanel = ({ draying }) => {
  const [edit, setEdit] = useState('')
  const [isTerminal, setIsTerminal] = useState(false)

  return (
    <>
      {edit ? (
        <EditStop
          stop={edit}
          setEdit={setEdit}
          isTerminal={isTerminal}
          setIsTerminal={setIsTerminal}
          drayingId={draying.id}
        />
      ) : (
        <AllStops
          draying={draying}
          setEdit={setEdit}
          setIsTerminal={setIsTerminal}
        />
      )}
    </>
  )
}

export default StopsPanel
