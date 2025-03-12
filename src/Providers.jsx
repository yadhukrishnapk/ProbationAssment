import  { SWRConfig } from "swr";
import fetcher from "./services/fetcher";

import React from 'react'

const Providers = ({children}) => {
  return (
   <SWRConfig value={{fetcher,refreshInterval:3000}} >{children}</SWRConfig>
  )
}

export default Providers