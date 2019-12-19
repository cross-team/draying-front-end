import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

export default function DrayingCard({ draying }) {
  return (
    <Card>
      <CardContent>
        <p>Draying ID: {draying.id}</p>
        <p>Order ID: {draying.order.id}</p>
      </CardContent>
    </Card>
  )
}
