import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type ProductCardProps = {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
        brand: string;
        sustainabilityBadge: string[];
    };
};

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}`} asChild>
            <TouchableOpacity style={styles.container}>
                <Image source={{ uri: product.image }} style={styles.image} />
                {product.sustainabilityBadge.length > 0 && (
                    <View style={styles.badge}>
                        <Ionicons name="leaf" size={12} color="green" />
                    </View>
                )}
                <View style={styles.info}>
                    <Text style={styles.brand}>{product.brand}</Text>
                    <Text style={styles.name} numberOfLines={1}>
                        {product.name}
                    </Text>
                    <Text style={styles.price}>${product.price}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 4,
    },
    info: {
        padding: 8,
    },
    brand: {
        fontSize: 12,
        color: '#666',
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6741d9',
    },
});
