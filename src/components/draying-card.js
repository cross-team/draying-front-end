import React from 'react'

export default function DrayingCard({ draying }) {
  return (
    <div className="card">
      <div className="card-body">
        <p>Draying ID: {draying.id}</p>
        <p>Order ID: {draying.order.id}</p>
      </div>
    </div>
  )
}
