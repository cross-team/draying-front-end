import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { size } from 'polished'

import { colors } from '../styles'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Loading = styled('div')(size(64), {
  display: 'block',
  margin: 'auto',
  fill: colors.grey,
  path: {
    transformOrigin: 'center',
    animation: `${spin} 1s linear infinite`,
  },
})

export default Loading
