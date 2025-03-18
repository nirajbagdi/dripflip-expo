import React from 'react';
import { useFonts } from 'expo-font';
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { CardItemT } from '../../app/types';
import styles, {
    DISLIKE_ACTIONS,
    FLASH_ACTIONS,
    LIKE_ACTIONS,
    STAR_ACTIONS,
    WHITE,
} from '../../assets/styles';

import { Raleway_200ExtraLight } from '@expo-google-fonts/raleway';
import { Quicksand_300Light } from '@expo-google-fonts/quicksand';
import { GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';

const CardItem = ({
    description,
    hasActions,
    hasVariant,
    image,
    isOnline,
    name,
}: CardItemT) => {
    // Custom styling
    const fullWidth = Dimensions.get('window').width;

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

    return (
        <View style={styles.containerCardItem}>
            {/* IMAGE */}
            <Image source={image} style={imageStyle} />
            {/* NAME */}
            <Text style={[nameStyle, styles.greatvibes]}>{name}</Text>
            {/* DESCRIPTION */}
            {description && (
                <Text style={[styles.descriptionCardItem, styles.quicksand]}>
                    {description}
                </Text>
            )}
            {/* STATUS */}
            {!description && (
                <View style={styles.status}>
                    <View style={isOnline ? styles.online : styles.offline} />
                    <Text style={styles.statusText}>
                        {isOnline ? 'Online' : 'Offline'}
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

export default CardItem;
