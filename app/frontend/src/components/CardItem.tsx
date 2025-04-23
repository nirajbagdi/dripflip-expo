'use client';

import { useFonts } from 'expo-font';
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from './Icon';
import type { CardItemT } from '../../app/types';
import styles, { DISLIKE_ACTIONS, LIKE_ACTIONS } from '../../assets/styles';
import { formatPrice } from '../utils';

import { Raleway_200ExtraLight } from '@expo-google-fonts/raleway';
import { Quicksand_300Light } from '@expo-google-fonts/quicksand';
import { GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';

const CardItem = ({
    id,
    description,
    hasActions,
    hasVariant,
    image,
    isOnline,
    name,
    price,
    brand,
    sustainabilityBadge = [],
}: CardItemT) => {
    // Custom styling
    const fullWidth = Dimensions.get('window').width;
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        Raleway_200ExtraLight,
        Quicksand_300Light,
        GreatVibes_400Regular,
    });

    const imageStyle = [
        {
            borderRadius: 8,
            width: hasVariant ? fullWidth / 2 - 30 : fullWidth - 80,
            height: hasVariant ? 170 : 350,
            margin: hasVariant ? 0 : 20,
        },
    ];

    const nameStyle = [
        {
            paddingTop: hasVariant ? 10 : 15,
            paddingBottom: hasVariant ? 5 : 7,
            color: '#363636',
            fontSize: hasVariant ? 15 : 30,
        },
    ];

    const handlePress = () => {
        if (id) {
            router.push(`/product/${id}`);
        }
    };

    return (
        <View style={styles.containerCardItem}>
            {/* IMAGE */}
            <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
                <Image source={image} style={imageStyle} resizeMode="cover" />
            </TouchableOpacity>

            {/* BRAND */}
            {brand && <Text style={styles.brandText}>{brand}</Text>}

            {/* NAME */}
            <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
                <Text style={[nameStyle, styles.greatvibes]}>{name}</Text>
            </TouchableOpacity>

            {/* PRICE */}
            {price && <Text style={styles.priceText}>${formatPrice(price)}</Text>}

            {/* SUSTAINABILITY BADGE */}
            {sustainabilityBadge && sustainabilityBadge.length > 0 && (
                <View style={localStyles.badgesContainer}>
                    {sustainabilityBadge.map((badge, index) => (
                        <View key={index} style={localStyles.badgeContainer}>
                            <Icon name="leaf" color="#4CAF50" size={14} />
                            <Text style={localStyles.badgeText}>{badge}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* DESCRIPTION */}
            {description && (
                <View style={localStyles.descriptionContainer}>
                    <Text
                        style={[styles.descriptionCardItem, styles.quicksand]}
                        numberOfLines={4}
                    >
                        {description}
                    </Text>
                </View>
            )}

            {/* ACTIONS */}
            {hasActions && (
                <View style={styles.actionsCardItem}>
                    <TouchableOpacity style={[styles.button, styles.hello]}>
                        <Icon name="close" color={DISLIKE_ACTIONS} size={40} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.hello]}>
                        <Icon name="heart" color={LIKE_ACTIONS} size={40} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const localStyles = StyleSheet.create({
    badgesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 6,
        marginBottom: 6,
    },
    badgeText: {
        color: '#4CAF50',
        fontSize: 12,
        marginLeft: 4,
    },
    descriptionContainer: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
});

export default CardItem;
