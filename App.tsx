import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataProvider } from './src/context/DataContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { ProductCatalogScreen } from './src/screens/ProductCatalogScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('Dashboard');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      setIsLoggedIn(!!user);
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('Dashboard');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('Dashboard');
  };

  if (isLoading) {
    return null; // You can add a loading screen here
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'ProductCatalog':
        return <ProductCatalogScreen onBack={handleBack} />;
      case 'VendorCatalog':
        // You can implement other screens similarly
        return <DashboardScreen onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'PurchaseData':
        return <DashboardScreen onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'ConsumptionData':
        return <DashboardScreen onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'ClosingStock':
        return <DashboardScreen onNavigate={handleNavigate} onLogout={handleLogout} />;
      default:
        return <DashboardScreen onNavigate={handleNavigate} onLogout={handleLogout} />;
    }
  };

  return (
    <DataProvider>
      {renderScreen()}
    </DataProvider>
  );
}