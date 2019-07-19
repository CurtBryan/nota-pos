import React, { useRef } from 'react';
import { Illustration, Group, useRender, Box } from 'react-zdog';
import '../Logo/Logo.css';


function Content() {

let isSpinning = true;

   const group = useRef()
  useRender(() => (
    group.current.rotate.y += isSpinning ? 0.003 : 0,
    group.current.rotate.x += isSpinning ? 0.003 : 0
  
    ))

  return (
    <Group ref={group}>
      <Box
        width="30"
        height="30"
        depth="30"
        color="#212e2e"
        leftFace="#212e2e"
        rightFace="#38494A"
        topFace="#435c5c"
        bottomFace='#4b6768'
        stroke= "false"
        fill
      />

    </Group>
  )
}

export default function Logo() {
  return (

    <div className='canvas'>
    <Illustration zoom={3}>
      <Content />
    </Illustration>
    </div>
  )
}
