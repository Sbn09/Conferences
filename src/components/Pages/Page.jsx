import * as React from "react";
import Menu from '../Menu/menu';


export default ({children}) => (
    <>
        <Menu/>
        {children}
    </>
)