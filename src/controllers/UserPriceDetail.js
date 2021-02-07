import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import '../styles/UserPriceDetail.scss';
import Button from 'react-bootstrap/Button'

export const UserPriceDetail = (props) => {
    return (
        <>
        <Tabs defaultActiveKey="basic" id="uncontrolled-tab-example">
            <Tab eventKey="basic" title="Basic">
                {/* <Sonnet /> */}
                <div className="tab-content-header">
                    <h5 className="title">
                        <b>Intro Package</b>
                        <span className="price">0.35 ETH</span>
                    </h5>
                    <p className="short-desc">
                        <span><i className="fa fa-hand-o-right"></i>Landing Page Design</span>
                        <span><i className="fa fa-hand-o-right"></i>Any Theme</span>
                        <span><i className="fa fa-hand-o-right"></i>Theme Install</span>
                        <span><i className="fa fa-hand-o-right"></i>3 Page Site</span>
                    </p>
                </div>
                <div class="tab-content-body">
                    <span style={{'marginRight':'10px'}}><b><i className="fa fa-clock-o"></i>1 Day Delivery</b></span>
                    <span><b><i className="fa fa-refresh"></i>Unlimited Revision</b></span>
                    <ul class="user-feature">
                        <li>3 Pages</li>
                        <li>Design Customization</li>
                        <li>Content Upload</li>
                        <li>Responsive Design</li>
                        <li>3 Plugins/Extensions</li>
                        <li>E-Commerce Functionality</li>
                        <li>15 Products</li>
                    </ul>
                    <Button variant="primary" size="md" block>
                        Place Order
                    </Button>
                </div>
            </Tab>
            <Tab eventKey="standard" title="Standard">
                {/* <Sonnet /> */}
            </Tab>
            <Tab eventKey="premium" title="Premium">
                {/* <Sonnet /> */}
            </Tab>
        </Tabs>
        <Button variant="outline-secondary" size="sm" block>
            Contact seller
        </Button>
        </>
    )
}