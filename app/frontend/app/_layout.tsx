import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from '../src/context/CartContext';

export default function AppLayout() {
    return (
        <CartProvider>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#6741d9',
                    tabBarInactiveTintColor: '#888',
                    headerShown: false,
                    tabBarStyle: {
                        elevation: 0,
                        borderTopWidth: 1,
                        borderTopColor: '#f0f0f0',
                        height: 60,
                        paddingBottom: 10,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '500',
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Discover',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="compass" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="browse"
                    options={{
                        title: 'Browse',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="search" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="cart"
                    options={{
                        title: 'Cart',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="cart" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </CartProvider>
    );
}
