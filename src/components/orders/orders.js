import React, { useState } from 'react'
import NewOrder from './new-order'

export default function Orders() {
  const [newOrder, setNewOrder] = useState(true)
  return <NewOrder open={newOrder} setOpen={setNewOrder} />
}
