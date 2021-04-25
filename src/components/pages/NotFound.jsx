import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
    state = {  }
    render() { 
        return (
            <div className="not-found text-center">
                <h1>404</h1>
                <p>Oops! Something is wrong.</p>
                <button className="btn btn-secondary"><Link to="/"><i className="icon-home"></i> Go back in initial page, is better.</Link></button>
            </div>
         );
    }
}
 
export default NotFound;