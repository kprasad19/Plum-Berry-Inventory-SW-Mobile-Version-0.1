import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Layout } from '../components/Layout';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate, onLogout }) => {
  const menuItems = [
    {
      title: 'Product Catalog',
      icon: 'cube-outline' as const,
      route: 'ProductCatalog',
      color: '#3b82f6',
    },
    {
      title: 'Vendor Catalog',
      icon: 'people-outline' as const,
      route: 'VendorCatalog',
      color: '#10b981',
    },
    {
      title: 'Purchase Data',
      icon: 'cart-outline' as const,
      route: 'PurchaseData',
      color: '#f59e0b',
    },
    {
      title: 'Consumption Data',
      icon: 'trending-down-outline' as const,
      route: 'ConsumptionData',
      color: '#ef4444',
    },
    {
      title: 'Closing Stock',
      icon: 'archive-outline' as const,
      route: 'ClosingStock',
      color: '#8b5cf6',
    },
  ];

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('user');
            onLogout();
          },
        },
      ]
    );
  };

  return (
    <Layout title="INVENTORY MANAGEMENT" showBackButton={false}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.route}
              style={styles.menuItem}
              onPress={() => onNavigate(item.route)}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={32} color="white" />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#913472" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuGrid: {
    gap: 16,
    paddingBottom: 20,
  },
  menuItem: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#913472',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#913472',
  },
  logoutText: {
    color: '#913472',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});