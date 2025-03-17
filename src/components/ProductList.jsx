export const ProductList = ({ product}) => {
    return ()
}



const ProductListItem = ( product ) => {
    return (
        <div>
                <img src ={product.imgUrl} alt={product.name} />
                <div>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                    <p>{product.favorite}</p>
                </div>
        </div>
    )
}