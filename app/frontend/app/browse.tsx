import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import {
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProductSearch } from '../src/hooks/useProductSearch';
import { ProductCard } from '../src/components/ProductCard';
import { FilterModal } from '../src/components/FilterModal';

export default function BrowseScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const { products, loading, error, search } = useProductSearch();

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            if (query.trim()) {
                search({ query });
            }
        }, 300),
        [search]
    );

    const onSearchChange = (text: string) => {
        setSearchQuery(text);
        debouncedSearch(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    value={searchQuery}
                    onChangeText={onSearchChange}
                    placeholder="Search products..."
                    style={styles.input}
                />
                <TouchableOpacity
                    onPress={() => setShowFilters(true)}
                    style={styles.filterButton}
                >
                    <Ionicons name="filter" size={24} color="#6741d9" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#6741d9" />
                </View>
            ) : error ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : products.length > 0 ? (
                <FlatList
                    data={products}
                    numColumns={2}
                    renderItem={({ item }) => <ProductCard product={item} />}
                    keyExtractor={(item) => item.id}
                />
            ) : searchQuery ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.noResults}>No products found</Text>
                </View>
            ) : null}

            <FilterModal
                visible={showFilters}
                onClose={() => setShowFilters(false)}
                onApply={(filters) => {
                    search({ ...filters, query: searchQuery, page: 1 });
                    setShowFilters(false);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    searchBar: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 15,
        marginRight: 10,
    },
    filterButton: {
        padding: 8,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    noResults: {
        fontSize: 16,
        color: '#666',
    },
});
