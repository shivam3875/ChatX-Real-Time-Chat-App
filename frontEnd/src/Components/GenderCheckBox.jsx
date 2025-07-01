import React from 'react'

const GenderCheckBox = ({oncheckboxchange,seletedgender}) => {
  return (
    <div className='flex'>
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">Male</span>
                <input type="checkbox" className="checkbox"
                 onChange={()=>oncheckboxchange("male")}
                 checked={seletedgender==="male"}
                />
            </label>
        </div>

        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">Female</span>
                <input type="checkbox"  className="checkbox" 
                 onChange={()=>oncheckboxchange("female")}
                 checked={seletedgender==="female"}
                />
            </label>
        </div>
    </div>
  )
}

export default GenderCheckBox
