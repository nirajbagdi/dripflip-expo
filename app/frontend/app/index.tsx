import { useState, useRef } from 'react';
import {
    View,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    StyleSheet,
} from 'react-native';
import { CardItem } from '../src/components';
import styles from '../assets/styles';
import Icon from '../src/components/Icon';
import CardStack from '../src/components/CardStack';
import Card from '../src/components/Card';
import { useProductQueue } from '../src/hooks/useProductQueue';

const Index = () => {
    const [swiper, setSwiper] = useState<CardStack | null>(null);
    const { products, loading, error, refreshProducts, handleSwipe } =
        useProductQueue();
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
        null
    );
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const onSwipedLeft = (index: number) => {
        const product = products[index];
        if (product) {
            setSwipeDirection('left');
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setSwipeDirection(null), 1500);
            handleSwipe(product.id, 'IGNORE');
        }
    };

    const onSwipedRight = (index: number) => {
        const product = products[index];
        if (product) {
            setSwipeDirection('right');
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setSwipeDirection(null), 1500);
            handleSwipe(product.id, 'LIKE');
        }
    };

    if (loading) {
        return (
            <ImageBackground
                source={require('../assets/images/bg.png')}
                style={styles.bg}
            >
                <View
                    style={[
                        styles.containerHome,
                        { justifyContent: 'center', alignItems: 'center' },
                    ]}
                >
                    <ActivityIndicator size="large" color="#6741d9" />
                    <Text style={{ marginTop: 20, color: '#333', fontSize: 16 }}>
                        Loading products...
                    </Text>
                </View>
            </ImageBackground>
        );
    }

    if (error) {
        return (
            <ImageBackground
                source={require('../assets/images/bg.png')}
                style={styles.bg}
            >
                <View
                    style={[
                        styles.containerHome,
                        { justifyContent: 'center', alignItems: 'center' },
                    ]}
                >
                    <Text style={{ color: 'red', fontSize: 16, marginBottom: 20 }}>
                        {error}
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#6741d9',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 8,
                        }}
                        onPress={refreshProducts}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            Try Again
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require('../assets/images/bg.png')}
            style={styles.bg}
        >
            {/* <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 60,
                    right: 30,
                }}
            >
                <Icon name="cart" size={30} color="#6741d9" />
            </TouchableOpacity> */}

            <View style={styles.containerHome}>
                {swipeDirection === 'left' && (
                    <View
                        style={[localStyles.swipeIndicator, localStyles.swipeLeft]}
                    >
                        <Icon name="close" size={30} color="white" />
                        <Text style={localStyles.swipeText}>Ignored</Text>
                    </View>
                )}

                {swipeDirection === 'right' && (
                    <View
                        style={[localStyles.swipeIndicator, localStyles.swipeRight]}
                    >
                        <Icon name="heart" size={30} color="white" />
                        <Text style={localStyles.swipeText}>Liked!</Text>
                    </View>
                )}

                <CardStack
                    verticalSwipe={false}
                    renderNoMoreCards={() => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 300,
                            }}
                        >
                            <Text style={{ fontSize: 18, color: '#333' }}>
                                No more products
                            </Text>
                            <TouchableOpacity
                                style={{
                                    marginTop: 20,
                                    backgroundColor: '#6741d9',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 8,
                                }}
                                onPress={refreshProducts}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Refresh
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    ref={(newSwiper): void => setSwiper(newSwiper)}
                    onSwipedLeft={onSwipedLeft}
                    onSwipedRight={onSwipedRight}
                >
                    {products.map((item, index) => (
                        <Card key={`card-${item.id}`}>
                            <CardItem
                                hasActions
                                image={{ uri: item.image }}
                                name={item.name}
                                description={item.description || ''}
                                price={item.price}
                                brand={item.brand}
                                sustainabilityBadge={item.sustainabilityBadge}
                            />
                        </Card>
                    ))}
                </CardStack>
            </View>
        </ImageBackground>
    );
};

const localStyles = StyleSheet.create({
    swipeIndicator: {
        position: 'absolute',
        top: 50,
        zIndex: 1000,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
    },
    swipeLeft: {
        backgroundColor: '#AB274F',
        left: 20,
    },
    swipeRight: {
        backgroundColor: '#B644B2',
        right: 20,
    },
    swipeText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 16,
    },
    helpText: {
        position: 'absolute',
        bottom: -80,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    helpTextContent: {
        color: '#666',
        fontSize: 14,
    },
});

export default Index;
