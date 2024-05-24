import React, { Children, Fragment } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export const ReactToastifyProvider = ({children}) => {
  return (
    <Fragment>
        <ToastContainer/>
        {children}
    </Fragment>
    )
}
