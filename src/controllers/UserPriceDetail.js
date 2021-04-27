import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';

export const UserPriceDetail = (props) => {

    return (
        <>
        <Tabs defaultActiveKey="basic" id="uncontrolled-tab-example">
            <Tab eventKey="basic" title="More Details">
                {/* <Sonnet /> */}
                <div className="tab-content-header">
                    <h5 className="title">
                        <b>Intro Package</b>
                        <span className="price">{props.data.price} ETH</span>
                    </h5>
                    <p className="short-desc">
                        <span>{props.data.package}</span>
                    </p>
                </div>
                <div className="tab-content-body">
                    <span style={{'marginRight':'10px'}}><b><i className="fa fa-clock-o"></i>{props.data.duration} Month Delivery</b></span>
                    <ul className="user-feature">
                        {props.data.features && props.data.features.length > 0 && props.data.features.map((feat , index) => {
                            return (<li key={index}>{feat}</li>)
                        })}
                    </ul>
                    <Button variant="primary" size="md" onClick={props.placeOrderHandler} block>
                        Place Order
                    </Button>
                </div>
            </Tab>
        </Tabs>
        <div className="description-action-buttons">
            <Button onClick={props.navigateToUpdate} variant="secondary" size="sm" block>
                Edit Job
            </Button>
            <Button className="delete-job" onClick={props.deleteHandler} variant="primary"  size="sm" block>
                Delete Job
            </Button>
        </div>
        </>
    )
}