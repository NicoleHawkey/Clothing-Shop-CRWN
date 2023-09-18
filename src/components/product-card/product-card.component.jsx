import { ProductCardContainer, Footer, Price, Name } from './product-card.styles';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`}/>
                <Footer>
                    <Name>{name}</Name>
                    <Price>{price}</Price>
                </Footer>
                <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
        </ProductCardContainer>
    )
};

export default ProductCard;