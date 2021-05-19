import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";

export const UserPriceDetail = (props) => {
  return (
    <>
      <Tabs defaultActiveKey="basic" id="uncontrolled-tab-example">
        <Tab eventKey="basic" title={null}>
          {/* <Sonnet /> */}
          <div className="tab-content-header">
            <h5 className="title">
              <i className="fa fa-clock-o"></i>&nbsp;{props.data.duration} Days
              Delivery
            </h5>
            <span className="price">{props.data.price} Dai</span>
            <p className="short-desc">
              <span>{props.data.package}</span>
            </p>
          </div>
          <div className="tab-content-body">
            <ul className="user-feature">
              {props.data.features &&
                props.data.features.length > 0 &&
                props.data.features.map((feat, index) => {
                  return <li key={index}>{feat}</li>;
                })}
            </ul>
            <br />
            <Button
              variant="primary"
              disabled={props.loader}
              size="md"
              onClick={props.placeOrderHandler}
              block
            >
              {props.loader ? "Loading…" : "Place Order"}
            </Button>
          </div>
        </Tab>
      </Tabs>
      {props.account == props.provider && (
        <div className="description-action-buttons">
          <Button
            onClick={props.navigateToUpdate}
            disabled={props.loader}
            variant="secondary"
            size="sm"
            block
          >
            {props.loader ? "Loading…" : "Edit Job"}
          </Button>
          <Button
            className="delete-job"
            disabled={props.loader}
            onClick={props.deleteHandler}
            variant="primary"
            size="sm"
            block
          >
            {props.loader ? "Loading…" : "Delete Job"}
          </Button>
        </div>
      )}
    </>
  );
};
