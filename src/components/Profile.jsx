import React from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react';

function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className='shadow p-4 mb-4'>
        <div className='d-flex mb-3'>
          <h5>PROFILE</h5>
          <button className='btn btn-info ms-auto' onClick={() => setOpen(!open)}>
            {
              open ?
                <i class="fa-solid fa-angle-up"></i> :
                <i class="fa-solid fa-angle-down"></i>
            }
          </button>

        </div>
        <Collapse in={open}>
          <div>
            <div className='d-flex justify-content-center align-items-center mb-3'>
              <label htmlFor="profileImg">
                <input type="file" id='profileImg'  style={{display:'none'}}/>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8nduLri6L05xqs-bacr__BXeLl3_NtLmvUptzQ3fTGAUhLlzp5FI-NwEkGFgXI-yGtwI&usqp=CAU"
                  width={'180px'} alt=""  />
              </label>

            </div>
            <div >
              <input type="text" placeholder='GitHub link' className='form-control mb-3' />
              <input type="text" placeholder='LinkedIn link' className='form-control mb-3' />
              <button className='btn btn-info w-100'>UPDATE</button>
            </div>
          </div>
        </Collapse>

      </div>
    </>
  )
}

export default Profile