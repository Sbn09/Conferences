import * as React from "react";
import { Link } from "gatsby"


export default () => (
    <div className="navbar-wrapper">
        <Link className="h1" to="/">
            WebConférences
        </Link>
        <div className="navbar-nav">
            <Link className="connexion" to="/ConfList">
                Test
            </Link>
        </div>
        
    </div>
);