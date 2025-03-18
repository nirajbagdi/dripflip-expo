import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import {
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProductSearch } from './hooks/useProductSearch';
import { ProductCard } from './components/ProductCard';
import { FilterModal } from './components/FilterModal';

export default function BrowseScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const { products, loading, error, pagination, searchProducts, loadMore } =
        useProductSearch();

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            searchProducts({ query });
        }, 300),
        []
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

            <FlatList
                data={products}
                numColumns={2}
                renderItem={({ item }) => <ProductCard product={item} />}
                keyExtractor={(item) => item.id}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => loading && <ActivityIndicator />}
            />

            <FilterModal
                visible={showFilters}
                onClose={() => setShowFilters(false)}
                onApply={(filters) => {
                    searchProducts({ ...filters, query: searchQuery, page: 1 });
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
});
