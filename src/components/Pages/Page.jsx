import * as React from "react";
import Menu from '../Menu/menu';
import 'bootstrap/dist/css/bootstrap.min.css';


export default ({children}) => (
    <>
        <Menu/>
        {children}
    </>
)