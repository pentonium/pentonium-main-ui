export const CategoryList = (props) => {
    return (
        <div className="row category-list">
                {props.categories.map((list , i) => {
                    return (
                    <div key={i} className="col-md-4">
                        <a  href={"/categories/"+props.id+'/'+list.id}>
                            <img src={list.image} className="category-image" alt={list.name} />
                            <span className="category-name">{list.name}</span>
                        </a>
                    </div>
                    )
                }) 
                }
        </div>
    )
}