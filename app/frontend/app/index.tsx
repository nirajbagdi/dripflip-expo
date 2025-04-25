'use client';

import { useState } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SwipeableDeck from '../src/components/SwipeableDeck';
import { useProductQueue } from '../src/hooks/useProductQueue';
import { useCart } from '@/src/context/CartContext';

export default function Index() {
    const router = useRouter();
    const { products, loading, error, refreshProducts, handleSwipe } =
        useProductQueue();
    const [likedCount, setLikedCount] = useState(0);

    const onSwipeLeft = (item: any) => {
        handleSwipe(item.id, 'IGNORE');
    };

    const cartCtx = useCart();

    const onSwipeRight = (item: any) => {
        handleSwipe(item.id, 'LIKE');
        setLikedCount((prev) => prev + 1);

        cartCtx.addItem(item);
    };

    const onCardPress = (item: any) => {
        router.push(`/product/${item.id}`);
    };

    const renderNoMoreCards = () => (
        <View style={styles.noMoreCardsContainer}>
            <Ionicons
                name="checkmark-circle"
                size={60}
                color="#4CD964"
                style={styles.noMoreCardsIcon}
            />
            <Text style={styles.noMoreCardsTitle}>You're all caught up!</Text>
            <Text style={styles.noMoreCardsText}>
                You've seen all available products. Check back later for new
                arrivals.
            </Text>
            <TouchableOpacity style={styles.refreshButton} onPress={refreshProducts}>
                <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6741d9" />
                <Text style={styles.loadingText}>
                    Discovering fresh styles for you...
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={60} color="#FF3B30" />
                <Text style={styles.errorTitle}>Oops!</Text>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={refreshProducts}
                >
                    <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>DripFlip</Text>
                </View>

                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => router.push('/cart')}
                >
                    <Ionicons name="cart-outline" size={24} color="#333" />
                    {likedCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{likedCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <SwipeableDeck
                    data={products}
                    onSwipeLeft={onSwipeLeft}
                    onSwipeRight={onSwipeRight}
                    onCardPress={onCardPress}
                    renderNoMoreCards={renderNoMoreCards}
                />
            </View>

            {/* Help Text */}
            <View style={styles.helpTextContainer}>
                <Text style={styles.helpText}>
                    Swipe right to like, left to skip
                </Text>
            </View>
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
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6741d9',
    },
    cartButton: {
        position: 'relative',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#6741d9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpTextContainer: {
        paddingVertical: 15,
        alignItems: 'center',
    },
    helpText: {
        fontSize: 14,
        color: '#888',
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    errorTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
    },
    errorText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    retryButton: {
        backgroundColor: '#6741d9',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noMoreCardsContainer: {
        width: '90%',
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    noMoreCardsIcon: {
        marginBottom: 20,
    },
    noMoreCardsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    noMoreCardsText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    refreshButton: {
        backgroundColor: '#6741d9',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    refreshButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
