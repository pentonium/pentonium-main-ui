import {Link} from 'react-router-dom';

export const CategoryList = (props) => {
    return (
        <div className="row category-list">
                {props.categories.map((list , i) => {
                    return (
                    <div key={i} className="col-md-4">
                        <Link  to={"/categories/"+props.id+'/'+list.id}>
                            <img src={list.image} className="category-image" alt={list.name} />
                            <span className="category-name">{list.name}</span>
                        </Link>
                    </div>
                    )
                }) 
                }
        </div>
    )
}