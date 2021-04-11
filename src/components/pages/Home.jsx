import React, { Component } from "react";
import {  Row } from "react-bootstrap";
import FeaturedCollection from "../FeaturedCollection";
import RatedCollection from "../RatedCollection";
import NewCollection from "../NewCollection";

class Home extends Component {
    state = {  }
    render() { 
        return (
                <Row className="collections-list">
                <FeaturedCollection></FeaturedCollection>
                <RatedCollection></RatedCollection>
                <NewCollection></NewCollection>
                </Row>
         );
    }
}
 
export default Home;