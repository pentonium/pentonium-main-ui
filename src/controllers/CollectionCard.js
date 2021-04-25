import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';


export const CollectionCard = (props) => {

    function viewAllItems(){
        window.location.href=props.link;
    };

    return (
        <>
        <Row className="collections">
            {props.items.map((list , i) => {
                return ( i <=3 &&
                <Col key={i} md={props.column ? parseInt(props.column , 10) : 3} xs={12}> 
                    <Link to={'/jobs/'+list.id}>   
                    <div className="card">
                        <img className="card-img-top" src={list.image} alt="Card image" />
                        <div className="card-body">
                        <h5 className="card-title">{list.jobTitle}</h5>
                        <p className="card-text">{list.description}</p>
                        <div className="card-bottom">
                            <span className="bottom-left">{list.categoryId}</span>
                            <span className="price-tag">{'$'+list.budget}</span>
                        </div>
                        </div>
                    </div>
                    </Link>
                </Col>
                )
            }) 
            }
        </Row>
        <div className="button-center-container"> 
         {props.items.length > 4 &&
            <button className="btn btn-secondary" onClick={() => viewAllItems()}>View All</button>
        }
        </div>
        </>
    )
}