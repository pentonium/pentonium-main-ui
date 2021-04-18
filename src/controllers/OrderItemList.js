import { Row, Col } from 'react-bootstrap'


export const OrderItemList = (props) => {

    return (
        <>
        
            {props.items.map((list , i) => {
                return ( 
                <Row key={i} className="order-list-items">   
                    <Col  md={12} xs={12}> 
                        <Row className="order-item-row">
                        <Col className="img-col" md={1} sm={1}>
                            <div>
                                <img className="list-image"  src={list.image} alt="Card image" />
                            </div>
                        </Col>
                        <Col md={9} sm={9}>
                            <Row>
                                <Col md={6} sm={6}> 
                                    <p className="order-item-title">{list.jobTitle}</p>
                                    <p className="order-item-text">{list.description}</p>
                                </Col>  
                                <Col md={3}>
                                    <p className="order-item-title">3 months</p>
                                    <p className="order-item-text">Duration</p>
                                 </Col>   
                                 <Col md={3}>
                                    <p className="order-item-title">Active</p>
                                    <p className="order-item-text">Current Status</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={2} sm={2}>
                            <p className="order-item-price">{'$'+list.budget}</p>
                            <p className="order-subtext">Per Hour</p>
                        </Col>
                        </Row>
                    </Col>
                </Row>
                )
            }) 
            }
        </>
    )
}