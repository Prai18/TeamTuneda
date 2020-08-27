import React from 'react';
import { StyleSheet, Text, View ,Alert,SafeAreaView,TouchableOpacity} from 'react-native';
import { Card,TextInput } from 'react-native-paper';
import firebase from 'firebase/app';                   //ここ書き方修正
import 'firebase/auth';
import 'firebase/firestore';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();



// function hash(){
//   JSHmac("message", "SecretKey", CONSTANTS.HmacAlgorithms.HmacSHA256)
//   .then(hash => console.log(hash))
//   .catch(e => console.log(e));
// }
//
// hash();

class App extends React.Component {

state = {
  loggedIn: null,
};

UNSAFE_componentWillMount() {
    const firebaseConfig = {
      // 各自生成された値を入れる
      apiKey: "AIzaSyCnLorva6IteJoYG_gJ97YSzI4RLA1wYB0",
      authDomain: "reactnative-firebase-751e9.firebaseapp.com",
      databaseURL: "https://reactnative-firebase-751e9.firebaseio.com",
      projectId: "reactnative-firebase-751e9",
      storageBucket: "reactnative-firebase-751e9.appspot.com",
      messagingSenderId: "202410725465"
    }
    if (!firebase.apps.length) { // これをいれないとエラーになったのでいれてます。
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderForm() {
    if (this.state.loggedIn) {
      return(
        <SafeAreaView>
        <View style={{ height:600, justifyContent: 'center' }}>
        <NavigationContainer>{
            <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />

            </Stack.Navigator>
          }</NavigationContainer>
        </View>
        <TouchableOpacity onPress={() => firebase.auth().signOut()} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>ログアウト</Text>
        </TouchableOpacity>
        </SafeAreaView>
      )
    } else {
      return(<LoginForm />)
    }
  }


  render() {
    return (
      <View style={styles.container}>
      {this.renderForm()}
      </View>
 );
}
}


const styles = StyleSheet.create({
  container: {
    // alignItems:'center',   //iosのデザインがかなり崩れるから使わない
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E3D7A3',
    padding: 18,
  },
  button1:{
    margin:10,
  },
  button2:{
    margin:10,
  },
  textDBData:{
     justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default App;
