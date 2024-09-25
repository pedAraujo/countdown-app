// countdown-frontend/App.js

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { EventProvider } from "./context/EventContext";
import AddEventScreen from "./screens/AddEventScreen";
import EditEventScreen from "./screens/EditEventScreen";
import EventListScreen from "./screens/EventListScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <EventProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="EventList">
                    <Stack.Screen
                        name="EventList"
                        component={EventListScreen}
                    />
                    <Stack.Screen name="AddEvent" component={AddEventScreen} />
                    <Stack.Screen
                        name="EditEvent"
                        component={EditEventScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </EventProvider>
    );
}
