import { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';

type FilterModalProps = {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: {
        minPrice?: number;
        maxPrice?: number;
        category?: string;
        brand?: string;
    }) => void;
};

const CATEGORIES = ['Shoes', 'Clothing', 'Accessories', 'Streetwear'];
const BRANDS = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Under Armour'];

export function FilterModal({ visible, onClose, onApply }: FilterModalProps) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [selectedBrand, setSelectedBrand] = useState<string>();

    const handleApply = () => {
        onApply({
            minPrice,
            maxPrice,
            category: selectedCategory,
            brand: selectedBrand,
        });
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Filters</Text>

                    <ScrollView>
                        <Text style={styles.sectionTitle}>Price Range</Text>
                        <View style={styles.priceRange}>
                            <Text>${minPrice}</Text>
                            <Text>${maxPrice}</Text>
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={1000}
                            value={maxPrice}
                            onValueChange={setMaxPrice}
                        />

                        <Text style={styles.sectionTitle}>Categories</Text>
                        <View style={styles.chipContainer}>
                            {CATEGORIES.map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    style={[
                                        styles.chip,
                                        selectedCategory === category &&
                                            styles.chipSelected,
                                    ]}
                                    onPress={() => setSelectedCategory(category)}
                                >
                                    <Text>{category}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.sectionTitle}>Brands</Text>
                        <View style={styles.chipContainer}>
                            {BRANDS.map((brand) => (
                                <TouchableOpacity
                                    key={brand}
                                    style={[
                                        styles.chip,
                                        selectedBrand === brand &&
                                            styles.chipSelected,
                                    ]}
                                    onPress={() => setSelectedBrand(brand)}
                                >
                                    <Text>{brand}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonCancel]}
                            onPress={onClose}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonApply]}
                            onPress={handleApply}
                        >
                            <Text style={styles.buttonApplyText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: '80%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
    },
    priceRange: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    chipSelected: {
        backgroundColor: '#6741d9',
    },
    buttons: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonCancel: {
        backgroundColor: '#f0f0f0',
    },
    buttonApply: {
        backgroundColor: '#6741d9',
    },
    buttonApplyText: {
        color: 'white',
    },
});
