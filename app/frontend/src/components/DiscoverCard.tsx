'use client';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { formatPrice } from '../utils';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.65;

const nameStyle = [
    {
        paddingTop: 15,
        paddingBottom: 7,
        color: '#363636',
        fontSize: 30,
    },
];

type DiscoverCardProps = {
    id: string;
    name: string;
    brand: string;
    price: number | string;
    image: string;
    description?: string;
    sustainabilityBadge?: string[];
    isActive?: boolean;
    swipeDirection?: 'left' | 'right' | null;
    onPress?: () => void;
};

export default function DiscoverCard({
    id,
    name,
    brand,
    price,
    image,
    description,
    sustainabilityBadge = [],
    isActive = false,
    swipeDirection,
    onPress,
}: DiscoverCardProps) {
    const router = useRouter();

    const handleCardPress = () => {
        if (onPress) {
            onPress();
        } else {
            router.push(`/product/${id}`);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.98}
            style={[styles.card, !isActive && styles.inactiveCard]}
            onPress={handleCardPress}
            disabled={!isActive}
        >
            <Image source={{ uri: image }} style={styles.image} />

            {/* Overlay gradient for better text readability */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.gradient}
                start={{ x: 0, y: 0.6 }}
                end={{ x: 0, y: 1 }}
            />

            {/* Brand badge */}
            <View style={styles.brandBadge}>
                <Text style={styles.brandText}>{brand}</Text>
            </View>

            {/* Sustainability badges if any */}
            {sustainabilityBadge.length > 0 && (
                <View style={styles.sustainabilityBadge}>
                    <Ionicons name="leaf" size={14} color="#fff" />
                    <Text style={styles.sustainabilityText}>Sustainable</Text>
                </View>
            )}

            {/* Product info */}
            <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={2}>
                    {name}
                </Text>
                <Text style={styles.price}>${formatPrice(price)}</Text>
            </View>

            {/* Swipe indicators */}
            {swipeDirection === 'left' && (
                <View style={[styles.swipeIndicator, styles.swipeLeft]}>
                    <Ionicons name="close" size={30} color="#fff" />
                    <Text style={styles.swipeText}>NOPE</Text>
                </View>
            )}

            {swipeDirection === 'right' && (
                <View style={[styles.swipeIndicator, styles.swipeRight]}>
                    <Ionicons name="heart" size={30} color="#fff" />
                    <Text style={styles.swipeText}>LIKE</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#fff',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
    },
    inactiveCard: {
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '40%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    brandBadge: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    brandText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    sustainabilityBadge: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(76, 175, 80, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sustainabilityText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 4,
    },
    infoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    swipeIndicator: {
        position: 'absolute',
        top: '45%',
        padding: 10,
        borderWidth: 4,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '-30deg' }],
    },
    swipeLeft: {
        left: 25,
        borderColor: '#FF3B30',
        backgroundColor: 'rgba(255, 59, 48, 0.8)',
    },
    swipeRight: {
        right: 25,
        borderColor: '#4CD964',
        backgroundColor: 'rgba(76, 217, 100, 0.8)',
    },
    swipeText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
        marginTop: 5,
    },
});
