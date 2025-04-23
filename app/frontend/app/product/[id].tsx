'use client';

import { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Animated,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { productAPI } from '../../src/api/client';
import { formatPrice } from '../../src/utils';

const { width } = Dimensions.get('window');

export default function ProductDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // In a real app, we would fetch from the API
                // const response = await productAPI.getProductById(id as string);

                // For now, we'll use the mock data
                const response = await productAPI.search({});
                const foundProduct = response.products.find((p: any) => p.id === id);

                if (foundProduct) {
                    setProduct(foundProduct);
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }).start();
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        // In a real app, we would call the API to add the product to the cart
        alert(`Added ${product.name} to cart!`);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6741d9" />
                <Text style={styles.loadingText}>Loading product details...</Text>
            </View>
        );
    }

    if (error || !product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error || 'Product not found'}</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Stack.Screen
                options={{
                    title: product.name,
                    headerRight: () => (
                        <TouchableOpacity style={{ marginRight: 15 }}>
                            <Ionicons
                                name="heart-outline"
                                size={24}
                                color="#6741d9"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Animated.View style={{ opacity: 1 }}>
                {/* Product Image */}
                <Image
                    source={{ uri: product.image }}
                    style={styles.image}
                    resizeMode="cover"
                />

                {/* Brand Badge */}
                <View style={styles.brandBadge}>
                    <Text style={styles.brandText}>{product.brand}</Text>
                </View>

                {/* Product Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>${formatPrice(product.price)}</Text>

                    {/* Sustainability Badges */}
                    {product.sustainabilityBadge &&
                        product.sustainabilityBadge.length > 0 && (
                            <View style={styles.sustainabilityContainer}>
                                {product.sustainabilityBadge.map(
                                    (badge: string, index: number) => (
                                        <View key={index} style={styles.badge}>
                                            <Ionicons
                                                name="leaf"
                                                size={16}
                                                color="#4CAF50"
                                            />
                                            <Text style={styles.badgeText}>
                                                {badge}
                                            </Text>
                                        </View>
                                    )
                                )}
                            </View>
                        )}

                    {/* Description */}
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    {/* Size Selection */}
                    <Text style={styles.sectionTitle}>Select Size</Text>
                    <View style={styles.sizeContainer}>
                        {sizes.map((size) => (
                            <TouchableOpacity
                                key={size}
                                style={[
                                    styles.sizeButton,
                                    selectedSize === size &&
                                        styles.selectedSizeButton,
                                ]}
                                onPress={() => setSelectedSize(size)}
                            >
                                <Text
                                    style={[
                                        styles.sizeText,
                                        selectedSize === size &&
                                            styles.selectedSizeText,
                                    ]}
                                >
                                    {size}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Stock Status */}
                    <View style={styles.stockContainer}>
                        <Ionicons
                            name={
                                product.stock > 0
                                    ? 'checkmark-circle'
                                    : 'close-circle'
                            }
                            size={18}
                            color={product.stock > 0 ? '#4CAF50' : '#F44336'}
                        />
                        <Text
                            style={[
                                styles.stockText,
                                { color: product.stock > 0 ? '#4CAF50' : '#F44336' },
                            ]}
                        >
                            {product.stock > 0
                                ? `In Stock (${product.stock} available)`
                                : 'Out of Stock'}
                        </Text>
                    </View>

                    {/* Add to Cart Button */}
                    <TouchableOpacity
                        style={[
                            styles.addToCartButton,
                            !product.stock && styles.disabledButton,
                        ]}
                        onPress={handleAddToCart}
                        disabled={!product.stock}
                    >
                        <Ionicons name="cart" size={20} color="white" />
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>

                    {/* Delivery Info */}
                    <View style={styles.deliveryContainer}>
                        <View style={styles.deliveryItem}>
                            <Ionicons
                                name="rocket-outline"
                                size={24}
                                color="#6741d9"
                            />
                            <Text style={styles.deliveryText}>Fast Delivery</Text>
                        </View>
                        <View style={styles.deliveryItem}>
                            <Ionicons
                                name="refresh-outline"
                                size={24}
                                color="#6741d9"
                            />
                            <Text style={styles.deliveryText}>30 Days Return</Text>
                        </View>
                        <View style={styles.deliveryItem}>
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={24}
                                color="#6741d9"
                            />
                            <Text style={styles.deliveryText}>
                                Quality Guarantee
                            </Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#F44336',
        marginBottom: 20,
        textAlign: 'center',
    },
    backButton: {
        backgroundColor: '#6741d9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    image: {
        width: width,
        height: width * 1.2,
    },
    brandBadge: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    brandText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6741d9',
    },
    infoContainer: {
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6741d9',
        marginBottom: 15,
    },
    sustainabilityContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 15,
        marginRight: 8,
        marginBottom: 8,
    },
    badgeText: {
        color: '#4CAF50',
        fontSize: 12,
        marginLeft: 5,
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginTop: 10,
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#666',
        marginBottom: 20,
    },
    sizeContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    sizeButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    selectedSizeButton: {
        borderColor: '#6741d9',
        backgroundColor: '#6741d9',
    },
    sizeText: {
        fontSize: 14,
        color: '#333',
    },
    selectedSizeText: {
        color: 'white',
        fontWeight: 'bold',
    },
    stockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    stockText: {
        marginLeft: 8,
        fontSize: 14,
    },
    addToCartButton: {
        backgroundColor: '#6741d9',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    addToCartText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    deliveryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    deliveryItem: {
        alignItems: 'center',
        flex: 1,
    },
    deliveryText: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
    },
});
