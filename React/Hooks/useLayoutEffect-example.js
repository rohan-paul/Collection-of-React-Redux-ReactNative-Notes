import React, { useState, useLayoutEffect, useRef } from "react"
import ShapeSizer from "./ShapeSizer"

export default function TheShape(props) {
  const [percentage, setPercentage] = useState(50)
  const [height, setHeight] = useState(null)

  useLayoutEffect(() => {
    setHeight(shapeRef.current.offsetHeight)
  }, [percentage])

  const shapeRef = useRef(null)

  const style = {
    width: `100px`,
    height: `${percentage}%`,
    background: props.color,
    borderRadius: props.shape === "circle" ? "50%" : 0,
  }

  return (
    <React.Fragment>
      <main>
        <div ref={shapeRef} className="shape__main" style={style}>
          {height}
        </div>
      </main>
      <ShapeSizer handleChange={percentage => setPercentage(percentage)} />
    </React.Fragment>
  )
}

/* Explanation
1. In the above the below div
        <div ref={shapeRef} className="shape__main" style={style}>
          {height}
        </div>

will ONLY show the {height} with useLayoutEffect() and NOT with useEffect()
*/

/* More example -
https://codesandbox.io/s/oo47nj9mk9
*/
