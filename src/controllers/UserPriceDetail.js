import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';

export const UserPriceDetail = (props) => {
    function navigateToUpdate(){
        window.location.href=`/editdata/${props.hashId}/${props.offerContract}`;
    }

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
                        {/* <span><i className="fa fa-hand-o-right"></i>Landing Page Design</span>
                        <span><i className="fa fa-hand-o-right"></i>Any Theme</span>
                        <span><i className="fa fa-hand-o-right"></i>Theme Install</span>
                        <span><i className="fa fa-hand-o-right"></i>3 Page Site</span> */}
                        <span>{props.data.package}</span>
                    </p>
                </div>
                <div className="tab-content-body">
                    <span style={{'marginRight':'10px'}}><b><i className="fa fa-clock-o"></i>{props.data.duration} Month Delivery</b></span>
                    {/* <span><b><i className="fa fa-refresh"></i>Unlimited Revision</b></span> */}
                    <ul className="user-feature">
                        {props.data.features && props.data.features.length > 0 && props.data.features.map((feat , index) => {
                            return (<li key={index}>{feat}</li>)
                        })}
                        {/* <li>3 Pages</li>
                        <li>Design Customization</li>
                        <li>Content Upload</li>
                        <li>Responsive Design</li>
                        <li>3 Plugins/Extensions</li>
                        <li>E-Commerce Functionality</li>
                        <li>15 Products</li> */}
                    </ul>
                    <Button variant="primary" size="md" block>
                        Place Order
                    </Button>
                </div>
            </Tab>
            {/* <Tab eventKey="standard" title="Standard"> */}
                {/* <Sonnet /> */}
            {/* </Tab> */}
            {/* <Tab eventKey="premium" title="Premium"> */}
                {/* <Sonnet /> */}
            {/* </Tab> */}
        </Tabs>
        {/* <Button variant="secondary" size="sm" block>
            Contact seller
        </Button> */}
        <div className="description-action-buttons">
            <Button onClick={navigateToUpdate} variant="secondary" size="sm" block>
                Edit Job
            </Button>
            <Button className="delete-job" onClick={props.deleteHandler} variant="primary"  size="sm" block>
                Delete Job
            </Button>
        </div>
        </>
    )
}