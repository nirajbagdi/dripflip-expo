'use client';

import type React from 'react';
import { useRef, useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    PanResponder,
    Dimensions,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DiscoverCard from './DiscoverCard';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;
const SWIPE_OUT_DURATION = 250;

type SwipeableDeckProps = {
    data: any[];
    onSwipeLeft: (item: any) => void;
    onSwipeRight: (item: any) => void;
    onCardPress?: (item: any) => void;
    onEndReached?: () => void;
    renderNoMoreCards?: () => React.ReactNode;
};

export default function SwipeableDeck({
    data,
    onSwipeLeft,
    onSwipeRight,
    onCardPress,
    onEndReached,
    renderNoMoreCards,
}: SwipeableDeckProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
        null
    );
    const position = useRef(new Animated.ValueXY()).current;
    const rotation = position.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp',
    });

    const nextCardScale = position.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: [1, 0.9, 1],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        if (currentIndex >= data.length && onEndReached) {
            onEndReached();
        }
    }, [currentIndex, data.length, onEndReached]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });

                // Set swipe direction for visual feedback
                if (gesture.dx > 50) {
                    setSwipeDirection('right');
                } else if (gesture.dx < -50) {
                    setSwipeDirection('left');
                } else {
                    setSwipeDirection(null);
                }
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    forceSwipe('left');
                } else {
                    resetPosition();
                }
            },
        })
    ).current;

    const forceSwipe = (direction: 'left' | 'right') => {
        const x = direction === 'right' ? width * 1.5 : -width * 1.5;
        Animated.timing(position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: true,
        }).start(() => {
            onSwipeComplete(direction);
        });
    };

    const onSwipeComplete = (direction: 'left' | 'right') => {
        const item = data[currentIndex];
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        position.setValue({ x: 0, y: 0 });
        setSwipeDirection(null);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const resetPosition = () => {
        Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
        }).start();
        setSwipeDirection(null);
    };

    const handleSwipeLeft = () => {
        if (currentIndex >= data.length) return;
        setSwipeDirection('left');
        forceSwipe('left');
    };

    const handleSwipeRight = () => {
        if (currentIndex >= data.length) return;
        setSwipeDirection('right');
        forceSwipe('right');
    };

    const renderCards = () => {
        if (currentIndex >= data.length) {
            return renderNoMoreCards ? (
                renderNoMoreCards()
            ) : (
                <View style={styles.noMoreCardsContainer}>
                    <Text style={styles.noMoreCardsText}>No more products</Text>
                </View>
            );
        }

        return data
            .map((item, i) => {
                if (i < currentIndex) return null;

                if (i === currentIndex) {
                    return (
                        <Animated.View
                            key={item.id}
                            style={[
                                styles.cardContainer,
                                {
                                    transform: [
                                        { translateX: position.x },
                                        { translateY: position.y },
                                        { rotate: rotation },
                                    ],
                                    zIndex: 99,
                                },
                            ]}
                            {...panResponder.panHandlers}
                        >
                            <DiscoverCard
                                id={item.id}
                                name={item.name}
                                brand={item.brand}
                                price={item.price}
                                image={item.image}
                                description={item.description}
                                sustainabilityBadge={item.sustainabilityBadge}
                                isActive={true}
                                swipeDirection={swipeDirection}
                                onPress={() => onCardPress && onCardPress(item)}
                            />
                        </Animated.View>
                    );
                }

                // Next card with scale animation
                if (i === currentIndex + 1) {
                    return (
                        <Animated.View
                            key={item.id}
                            style={[
                                styles.cardContainer,
                                {
                                    transform: [{ scale: nextCardScale }],
                                    zIndex: 98,
                                },
                            ]}
                        >
                            <DiscoverCard
                                id={item.id}
                                name={item.name}
                                brand={item.brand}
                                price={item.price}
                                image={item.image}
                                description={item.description}
                                sustainabilityBadge={item.sustainabilityBadge}
                                isActive={false}
                            />
                        </Animated.View>
                    );
                }

                // Show one more card in the stack with less opacity
                if (i === currentIndex + 2) {
                    return (
                        <Animated.View
                            key={item.id}
                            style={[
                                styles.cardContainer,
                                {
                                    transform: [{ scale: 0.85 }],
                                    zIndex: 97,
                                    opacity: 0.7,
                                },
                            ]}
                        >
                            <DiscoverCard
                                id={item.id}
                                name={item.name}
                                brand={item.brand}
                                price={item.price}
                                image={item.image}
                                description={item.description}
                                sustainabilityBadge={item.sustainabilityBadge}
                                isActive={false}
                            />
                        </Animated.View>
                    );
                }

                return null;
            })
            .reverse();
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardsContainer}>{renderCards()}</View>

            {currentIndex < data.length && (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSwipeLeft}
                    >
                        <Ionicons name="close" size={30} color="#FF3B30" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSwipeRight}
                    >
                        <Ionicons name="heart" size={30} color="#4CD964" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    cardsContainer: {
        flex: 1,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        position: 'absolute',
        width: width * 0.9,
        height: height * 0.65,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        marginBottom: 20,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    noMoreCardsContainer: {
        width: width * 0.9,
        height: height * 0.65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
    },
    noMoreCardsText: {
        fontSize: 20,
        color: '#888',
        marginBottom: 20,
    },
});
