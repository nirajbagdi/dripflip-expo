'use client';

import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from '../src/utils';
import { useCart } from '../src/context/CartContext';

export default function CartScreen() {
    const router = useRouter();
    const { items, removeItem, updateQuantity, clearCart, getTotal } = useCart();
    const [processing, setProcessing] = useState(false);

    // Calculate cart totals
    const subtotal = getTotal();
    console.log('Subtotal:', subtotal);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 0 ? 10 : 0; // $10 shipping, free if cart is empty
    const total = subtotal + tax + shipping;

    const handleQuantityChange = (id: string, change: number) => {
        const item = items.find((item) => item.id === id);
        if (item) {
            updateQuantity(id, item.quantity + change);
        }
    };

    const handleRemoveItem = (id: string) => {
        Alert.alert(
            'Remove Item',
            'Are you sure you want to remove this item from your cart?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Remove',
                    onPress: () => removeItem(id),
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    const handleCheckout = () => {
        if (items.length === 0) {
            Alert.alert(
                'Empty Cart',
                'Add some items to your cart before checking out.'
            );
            return;
        }

        setProcessing(true);
        // Simulate API call for checkout process
        setTimeout(() => {
            setProcessing(false);
            Alert.alert(
                'Order Placed!',
                'Your order has been successfully placed.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            clearCart();
                            router.push('/');
                        },
                    },
                ],
                { cancelable: false }
            );
        }, 2000);
    };

    const renderCartItem = ({ item }: { item: any }) => (
        <View style={styles.cartItem}>
            <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
            </TouchableOpacity>

            <View style={styles.itemDetails}></View>

            <View style={styles.itemDetails}>
                <View style={styles.itemHeader}>
                    <View>
                        <Text style={styles.brandText}>{item.brand}</Text>
                        <Text style={styles.nameText} numberOfLines={2}>
                            {item.name}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleRemoveItem(item.id)}
                        style={styles.removeButton}
                    >
                        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                    </TouchableOpacity>
                </View>

                <View style={styles.itemVariants}>
                    <Text style={styles.variantText}>Size: {item.size}</Text>
                    <Text style={styles.variantText}>Color: {item.color}</Text>
                </View>

                <View style={styles.itemFooter}>
                    <Text style={styles.priceText}>${formatPrice(item.price)}</Text>

                    <View style={styles.quantityControl}>
                        <TouchableOpacity
                            onPress={() => handleQuantityChange(item.id, -1)}
                            style={[
                                styles.quantityButton,
                                item.quantity <= 1 && styles.quantityButtonDisabled,
                            ]}
                            disabled={item.quantity <= 1}
                        >
                            <Ionicons
                                name="remove"
                                size={16}
                                color={item.quantity <= 1 ? '#ccc' : '#333'}
                            />
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>{item.quantity}</Text>

                        <TouchableOpacity
                            onPress={() => handleQuantityChange(item.id, 1)}
                            style={styles.quantityButton}
                        >
                            <Ionicons name="add" size={16} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderEmptyCart = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyText}>
                Looks like you haven't added any items to your cart yet.
            </Text>

            <TouchableOpacity
                style={styles.shopButton}
                onPress={() => router.push('/')}
            >
                <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Shopping Cart</Text>
                <View style={{ width: 24 }} />
            </View>

            {items.length === 0 ? (
                renderEmptyCart()
            ) : (
                <>
                    <FlatList
                        data={items}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.cartList}
                        showsVerticalScrollIndicator={false}
                    />

                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>
                                ${formatPrice(subtotal)}
                            </Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tax</Text>
                            <Text style={styles.summaryValue}>
                                ${formatPrice(tax)}
                            </Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Shipping</Text>
                            <Text style={styles.summaryValue}>
                                ${formatPrice(shipping)}
                            </Text>
                        </View>

                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>
                                ${formatPrice(total)}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={handleCheckout}
                            disabled={processing || items.length === 0}
                        >
                            {processing ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <>
                                    <Text style={styles.checkoutButtonText}>
                                        Checkout
                                    </Text>
                                    <Ionicons
                                        name="arrow-forward"
                                        size={20}
                                        color="#fff"
                                    />
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    cartList: {
        padding: 15,
    },
    cartItem: {
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
    itemImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    itemDetails: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    brandText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    nameText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        width: '90%',
    },
    removeButton: {
        padding: 5,
    },
    itemVariants: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    variantText: {
        fontSize: 12,
        color: '#666',
        marginRight: 10,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6741d9',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 5,
    },
    quantityButton: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonDisabled: {
        opacity: 0.5,
    },
    quantityText: {
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 10,
        minWidth: 30,
        textAlign: 'center',
    },
    summaryContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        marginTop: 8,
        paddingTop: 12,
        marginBottom: 15,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6741d9',
    },
    checkoutButton: {
        backgroundColor: '#6741d9',
        borderRadius: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
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
    shopButton: {
        backgroundColor: '#6741d9',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    shopButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
