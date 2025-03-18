import { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { CardItem } from '../src/components';
import styles from '../assets/styles';
import Icon from '../src/components/Icon';
import CardStack from '../src/components/CardStack';
import Card from '../src/components/Card';
import { searchProducts } from '../src/api/products';

const Index = () => {
    const [swiper, setSwiper] = useState<CardStack | null>(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await searchProducts({});
                setProducts(response.products);
            } catch (error) {
                console.error('Failed to load products:', error);
            }
        };

        loadProducts();
    }, []);

    return (
        <ImageBackground
            source={require('../assets/images/bg.png')}
            style={styles.bg}
        >
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 60,
                    right: 30,
                }}
            >
                <Icon name="cart" size={30} color="#6741d9" />
            </TouchableOpacity>

            <View style={styles.containerHome}>
                <CardStack
                    verticalSwipe={false}
                    renderNoMoreCards={() => null}
                    ref={(newSwiper): void => setSwiper(newSwiper)}
                >
                    {products.map((item) => (
                        <Card key={`card-${item.id}`}>
                            <CardItem
                                hasActions
                                image={{ uri: item.image }} // Changed from require to uri
                                name={item.name}
                                description={item.description || ''}
                            />
                        </Card>
                    ))}
                </CardStack>
            </View>
        </ImageBackground>
    );
};

export default Index;
