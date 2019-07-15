import ReactDOM from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Illustration, Ellipse, Group, useRender, Shape } from 'react-zdog';
import '../Logo/Logo.css';

function Content() {


  const [visible, setVisible] = useState(true)

useEffect(() => {
    // Test taking an object away
    setTimeout(() => setVisible(false), 8000)
  }, [])

  const group = useRef()
  useRender(() => (group.current.rotate.y += 0.1))

  return (
    <Group ref={group}>
      <Shape
        path={[{ x: 0, y: -8 }, { x: 8, y: 8 }, { x: -8, y: 8 }]}
        translate={{ z: 10 }}
        color="#E62"
        stroke={3}
        fill
      />
      {visible && (
        <Ellipse diameter={20} translate={{ z: -10 }} stroke={5} color="#636" />
      )}
    </Group>
  )
}

export default function App() {
  return (
    <Illustration zoom={10}>
      <Content />
    </Illustration>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
