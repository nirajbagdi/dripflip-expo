import { useState } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { CardItem } from './components';
import styles from '../assets/styles';
import DEMO from '../assets/data';
import Icon from './components/Icon';

import CardStack from './components/CardStack';
import Card from './components/Card';

const Index = () => {
    const [swiper, setSwiper] = useState<CardStack | null>(null);

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
                    loop
                    verticalSwipe={false}
                    renderNoMoreCards={() => null}
                    ref={(newSwiper): void => setSwiper(newSwiper)}
                >
                    {DEMO.map((item) => (
                        <Card key={item.id}>
                            <CardItem
                                hasActions
                                image={item.image}
                                name={item.name}
                                description={item.description}
                            />
                        </Card>
                    ))}
                </CardStack>
            </View>
        </ImageBackground>
    );
};

export default Index;
