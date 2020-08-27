import React from 'react';
import { StyleSheet, Text, View ,Alert} from 'react-native';
import { Card,TextInput } from 'react-native-paper';
import firebase from 'firebase/app';                  //ここ書き方修正
import 'firebase/firestore';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default class Stack1 extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Stack1</Text>
            </View>
        );
    }
}
