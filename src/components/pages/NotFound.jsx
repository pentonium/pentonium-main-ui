import React, { Component } from "react";

class NotFound extends Component {
    state = {  }
    render() { 
        return (
            <div className="not-found text-center">
                <h1>404</h1>
                <p>Oops! Something is wrong.</p>
                <button className="btn btn-secondary"><a href="/"><i className="icon-home"></i> Go back in initial page, is better.</a></button>
            </div>
         );
    }
}
 
export default NotFound;