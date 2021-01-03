import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import FeaturedCollection from "../FeaturedCollection";
import RatedCollection from "../RatedCollection";
import '../../styles/Collections.scss';

class Home extends Component {
    state = {  }
    render() { 
        return (
                <Row className="collections-list">
                <FeaturedCollection></FeaturedCollection>
                <RatedCollection></RatedCollection>
                </Row>
         );
    }
}
 
export default Home;