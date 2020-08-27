import React from 'react';
import { StyleSheet, Text, View ,Alert,SafeAreaView,TouchableOpacity} from 'react-native';
import { Card,TextInput } from 'react-native-paper';
import firebase from 'firebase/app';                   //ここ書き方修正import firebase from 'firebase/app';                   //ここ書き方修正
import 'firebase/auth';
import 'firebase/firestore';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './LoginForm';


//import screens
import Single1 from './screens/Single1';
import Single2 from './screens/Single2';
import Stack1 from './screens/Stack1';
import Stack2 from './screens/Stack2';
import Tab1 from './screens/Tab1';
import Tab2 from './screens/Tab2';



const config = {
  apiKey: "AIzaSyCnLorva6IteJoYG_gJ97YSzI4RLA1wYB0",
  authDomain: "reactnative-firebase-751e9.firebaseapp.com",
  databaseURL: "https://reactnative-firebase-751e9.firebaseio.com",
  projectId: "reactnative-firebase-751e9",
  storageBucket: "reactnative-firebase-751e9.appspot.com",
  messagingSenderId: "202410725465"
};


// firebase.initializeApp(config);   //データベースの初期化
if (!firebase.apps.length) {         //この条件式がないと更新のたびに複数回呼び出してエラーがでる
    firebase.initializeApp(config);
}
const db = firebase.firestore();  //Firestoreのオブジェクトの取得



const Stack = createStackNavigator();

class HomeScreen extends React.Component {

state = {
  name: '山本太郎',
  num: 47,
  data:'',
};

firestoreInput = () =>{                    //データベースへの入力
const user="kkkk";
  db.collection(user).add({
      name:this.state.name,
      num: this.state.num,
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });

}

firestoreOutput = () =>{                    //データベースからのデータの取得(全件)
  db.collection("users").get().then((querySnapshot) => {
    var array = new Array();
      querySnapshot.forEach((doc) => {
          var data = doc.data();
          // console.log(typeof(data));
          console.log(data);    //{name: "ひらいだいち", num: "23"}
          array.push([doc.id, data.name, data.num]);   //連想配列？よくわからん
          // array.push(data.name);
          // array.push(data.num);
      });
      console.log(array);
      this.setState({data:array[0][1]+"さんは"+array[0][2]*2+"歳"});
  })
  .catch(function(error) {
      console.error("データを取得できません: ", error);
  });

}


changeName = (text) => {                //TextInputで名前の入力
     this.setState({ name: text})
  }


changeAge = (text) => {                 //TextInputで個数の入力
  this.setState({num:text})
}


  render() {
    return (
      <View style={styles.container}>
      <TextInput
        placeholder="名前"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={this.changeName}/>

        <TextInput
        placeholder="個数"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={this.changeAge}/>

        <Button
         icon={{name:"home"}}
         title="データの登録"
         style={styles.button1}
         type="clear"
         onPress={this.firestoreInput}
         />

         <Button
          icon={{name:"check"}}
          title="データの呼び出し"
          style={styles.button2}
          type="clear"
          onPress={this.firestoreOutput}
          />

          <Text>{this.state.data}</Text>

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

export default HomeScreen;
