import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#6741d9',
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Discover',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="card" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="browse"
                options={{
                    title: 'Browse',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="search" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
