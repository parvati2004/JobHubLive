import React from 'react'
import { useState } from 'react'

const hooks = () => {
    const array = useState(0);
    const counter = array[0];
    const setCounter = array[1]

    function increaseCounter () {
        setCounter(counter + 1 )
    }
    console.log(array)
  return (
    <div>
      <h1>Counter : {counter} </h1>
      <button>Increase</button>
    </div>
  )
}

export default hooks
