import { Row, Col } from 'react-bootstrap'


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
                    <a href={'/jobs/'+list.id}>   
                    <div className="card">
                        <img class="card-img-top" src={list.image} alt="Card image" />
                        <div class="card-body">
                        <h5 class="card-title">{list.jobTitle}</h5>
                        <p class="card-text">{list.description}</p>
                            <p class="card-text"><small class="text-muted">{list.budget}</small></p>
                        </div>
                    </div>
                    </a>
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