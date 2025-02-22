import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { CardItem } from './components';
import styles from '../assets/styles';
import DEMO from '../assets/data';
import Icon from './components/Icon';

const Index = () => {
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
                {DEMO.map((item) => (
                    <CardItem
                        key={item.id}
                        hasActions
                        image={item.image}
                        name={item.name}
                        description={item.description}
                    />
                ))}
            </View>
        </ImageBackground>
    );
};

export default Index;
