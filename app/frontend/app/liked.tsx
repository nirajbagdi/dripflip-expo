'use client';

import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from '../src/utils';

// In a real app, this would come from an API or state management
const DUMMY_LIKED_PRODUCTS = [
    {
        id: '7',
        name: 'Adidas Ultraboost 22',
        brand: 'Adidas',
        price: 190,
        image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg',
    },
    {
        id: '11',
        name: 'Patagonia Better Sweater Fleece Jacket',
        brand: 'Patagonia',
        price: 139,
        image: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw6a983a41/images/hi-res/25528_BLK.jpg?sw=1000&sh=1000&sfrm=png&q=95&bgcolor=f5f5f5',
    },
];

export default function LikedScreen() {
    const router = useRouter();
    const [likedProducts, setLikedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setLikedProducts(DUMMY_LIKED_PRODUCTS);
            setLoading(false);
        }, 1000);
    }, []);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => router.push(`/product/${item.id}`)}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.brandText}>{item.brand}</Text>
                <Text style={styles.nameText} numberOfLines={2}>
                    {item.name}
                </Text>
                <Text style={styles.priceText}>${formatPrice(item.price)}</Text>
            </View>
            <TouchableOpacity style={styles.heartButton}>
                <Ionicons name="heart" size={24} color="#FF3B30" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6741d9" />
                <Text style={styles.loadingText}>Loading your liked items...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Your Liked Items</Text>
            </View>

            {likedProducts.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-outline" size={80} color="#ccc" />
                    <Text style={styles.emptyTitle}>No liked items yet</Text>
                    <Text style={styles.emptyText}>
                        Items you like while browsing will appear here
                    </Text>

                    <TouchableOpacity
                        style={styles.browseButton}
                        onPress={() => router.push('/')}
                    >
                        <Text style={styles.browseButtonText}>
                            Discover Products
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={likedProducts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    listContainer: {
        padding: 15,
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        overflow: 'hidden',
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    productInfo: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    brandText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6741d9',
    },
    heartButton: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    browseButton: {
        backgroundColor: '#6741d9',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    browseButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
