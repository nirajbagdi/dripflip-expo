'use client';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity style={styles.settingsButton}>
                        <Ionicons name="settings-outline" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* Profile Info */}
                <View style={styles.profileSection}>
                    <Image
                        source={{
                            uri: 'https://randomuser.me/api/portraits/women/44.jpg',
                        }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileName}>Sarah Johnson</Text>
                    <Text style={styles.profileEmail}>
                        sarah.johnson@example.com
                    </Text>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>24</Text>
                        <Text style={styles.statLabel}>Liked</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>5</Text>
                        <Text style={styles.statLabel}>Orders</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>3</Text>
                        <Text style={styles.statLabel}>Reviews</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="cart-outline"
                            size={24}
                            color="#6741d9"
                            style={styles.menuIcon}
                        />
                        <Text style={styles.menuText}>My Orders</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="heart-outline"
                            size={24}
                            color="#6741d9"
                            style={styles.menuIcon}
                        />
                        <Text style={styles.menuText}>Liked Items</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="location-outline"
                            size={24}
                            color="#6741d9"
                            style={styles.menuIcon}
                        />
                        <Text style={styles.menuText}>Shipping Addresses</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="card-outline"
                            size={24}
                            color="#6741d9"
                            style={styles.menuIcon}
                        />
                        <Text style={styles.menuText}>Payment Methods</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color="#6741d9"
                            style={styles.menuIcon}
                        />
                        <Text style={styles.menuText}>Notifications</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="help-circle-outline"
                            size={24}
                            color="#6741d9"
                            style={styles.menuIcon}
                        />
                        <Text style={styles.menuText}>Help & Support</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
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
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    settingsButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    profileEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    editButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#6741d9',
    },
    editButtonText: {
        color: '#6741d9',
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 15,
        paddingVertical: 20,
        borderRadius: 12,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    statDivider: {
        width: 1,
        height: '70%',
        backgroundColor: '#eee',
    },
    menuContainer: {
        backgroundColor: '#fff',
        marginTop: 15,
        borderRadius: 12,
        marginHorizontal: 15,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuIcon: {
        marginRight: 15,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    logoutText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        color: '#FF3B30',
    },
});
