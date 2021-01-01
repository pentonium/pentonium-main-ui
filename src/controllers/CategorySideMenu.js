export const CategorySideMenu = (props) => {
    return (
        <div>
            <ul>
                <li key="header" className="category-header">{props.name}</li>
                {props.categories.map((list ,i) => {
                    return <li key={i} className="category-side-list"><a href={"/categories/"+props.id+'/'+list.id}>{list.name}</a></li>
                }) 
                }
            </ul>
        </div>
    )
}