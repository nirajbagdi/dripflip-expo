import { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

const CATEGORIES = ['Shoes', 'Clothing', 'Accessories', 'Streetwear'];
const BRANDS = [
    'Nike',
    'Adidas',
    'Puma',
    'New Balance',
    'Champion',
    'The North Face',
];

type FilterModalProps = {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: { category?: string; brand?: string }) => void;
};

export function FilterModal({ visible, onClose, onApply }: FilterModalProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [selectedBrand, setSelectedBrand] = useState<string>();

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Filters</Text>

                    <ScrollView>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <View style={styles.chipGroup}>
                            {CATEGORIES.map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    style={[
                                        styles.chip,
                                        selectedCategory === category &&
                                            styles.chipSelected,
                                    ]}
                                    onPress={() =>
                                        setSelectedCategory(
                                            selectedCategory === category
                                                ? undefined
                                                : category
                                        )
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.chipText,
                                            selectedCategory === category &&
                                                styles.chipTextSelected,
                                        ]}
                                    >
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.sectionTitle}>Brands</Text>
                        <View style={styles.chipGroup}>
                            {BRANDS.map((brand) => (
                                <TouchableOpacity
                                    key={brand}
                                    style={[
                                        styles.chip,
                                        selectedBrand === brand &&
                                            styles.chipSelected,
                                    ]}
                                    onPress={() =>
                                        setSelectedBrand(
                                            selectedBrand === brand
                                                ? undefined
                                                : brand
                                        )
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.chipText,
                                            selectedBrand === brand &&
                                                styles.chipTextSelected,
                                        ]}
                                    >
                                        {brand}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onClose}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => {
                                onApply({
                                    category: selectedCategory,
                                    brand: selectedBrand,
                                });
                                onClose();
                            }}
                        >
                            <Text style={styles.applyButtonText}>Apply</Text>
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
        maxHeight: '80%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    chipGroup: {
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
    chipText: {
        color: '#666',
    },
    chipTextSelected: {
        color: 'white',
    },
    buttons: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    applyButton: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#6741d9',
        borderRadius: 10,
    },
    applyButtonText: {
        color: 'white',
        fontWeight: '600',
    },
});
