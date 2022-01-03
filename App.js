import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './containers/Home/Home.js'
import Details from './containers/Details/Details.js'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={ Home }
          options={{ title: 'Anime List' }}
        />
        <Stack.Screen name="Details" component={ Details } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
