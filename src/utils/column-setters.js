import React from 'react'
import { useApolloClient } from "@apollo/react-hooks"

export default function useColumnSetters() {
  const client = useApolloClient()

  const setLeftHidden = (value) => {
    client.writeData({ data: { columnState: { leftHidden: value } } })
  }

  const setMiddleHidden = (value) => {
    client.writeData({ data: { columnState: { middleHidden: value } } })
  }

  const setRightHidden = (value) => {
    client.writeData({ data: { columnState: { rightHidden: value } } })
  }

  return [
    setLeftHidden,
    setMiddleHidden,
    setRightHidden
  ]
}