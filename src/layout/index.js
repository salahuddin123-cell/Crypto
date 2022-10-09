import React from 'react'
import Navbar from './Navbar'
import PropTypes from "prop-types";
const MainLayout = ({children}) => {
  return (
    <div className=' min-h-screen flex flex-col bg-deep'>
        <Navbar />
      {children}
    </div>
  )
}
MainLayout.propTypes = {
    children: PropTypes.node,
  };
export default MainLayout