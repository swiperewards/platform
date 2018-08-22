import React from 'react'

const Error = {
    padding: '12px',
    color: 'rgb(244, 67, 54)',
    fontSize: 11,
    position: 'absolute'
}

const RenderCheckbox = ({
    input,
    label,
    myValue,
    meta: { touched, error, invalid },
    children,
  }) => (
    <div>
        <div>
            <label className="checkBoxContainer">
                { 
                    myValue ? <input type="checkbox" {...input} checked /> : <input type="checkbox" {...input} />
                }
                <span className="checkmark"></span>
            </label>
            <span style={Error}>{touched ? error : ''}</span>
        </div>
    </div>
  )
  
  export{
    RenderCheckbox
  }