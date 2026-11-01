import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { KindleProvider, useKindle } from './src/context/KindleContext';

// Importando as 4 telas de src/screens/
import Tela1 from './src/screens/Tela1';
import Tela2 from './src/screens/Tela2';
import Tela3 from './src/screens/Tela3';
import Tela4 from './src/screens/Tela4';

const Tab = createBottomTabNavigator();

function KindleNavigator() {
  const { theme } = useKindle();

  const navTheme = theme.isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: theme.background,
          card: theme.tabBarBg,
          text: theme.text,
          border: theme.border,
          primary: theme.primary,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.background,
          card: theme.tabBarBg,
          text: theme.text,
          border: theme.border,
          primary: theme.primary,
        },
      };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.tabBarBg,
            borderTopColor: theme.border,
            height: 62,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: 0.4,
          },
          tabBarIcon: ({ color, size, focused }) => {
            if (route.name === 'index') {
              return (
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={size}
                  color={color}
                />
              );
            }
            if (route.name === 'Biblioteca') {
              return (
                <MaterialCommunityIcons
                  name={focused ? 'bookshelf' : 'book-multiple-outline'}
                  size={size + 2}
                  color={color}
                />
              );
            }
            if (route.name === 'Leitor') {
              return (
                <Ionicons
                  name={focused ? 'book' : 'book-outline'}
                  size={size}
                  color={color}
                />
              );
            }
            return (
              <Ionicons
                name={focused ? 'menu' : 'menu-outline'}
                size={size + 2}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="index"
          component={Tela1}
          options={{ title: 'PÁGINA INICIAL' }}
        />
        <Tab.Screen
          name="Biblioteca"
          component={Tela2}
          options={{ title: 'BIBLIOTECA' }}
        />
        <Tab.Screen
          name="Leitor"
          component={Tela3}
          options={{ title: 'EXPLORAR / LER' }}
        />
        <Tab.Screen
          name="Mais"
          component={Tela4}
          options={{ title: 'MAIS' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <KindleProvider>
      <KindleNavigator />
    </KindleProvider>
  );
}
