import React from 'react';
import { View, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native';
import firebase from 'firebase/app';                  //ここ書き方修正
import 'firebase/auth';
import 'firebase/firestore';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";


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

const db = firebase.firestore();



class LoginForm extends React.Component {



state = {
  email: '',
  password: '',
  error: '',
  loading: false,
  hash:'',
};

  onButtonPress=()=> {
    const { email, password } = this.state;
    this.setState({error: '', loading: true});

    firebase.auth().signInWithEmailAndPassword(email, password) //ログインの成功
      .then((this.onLoginSuccess.bind(this)))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password) //新規登録
          .then((this.onLoginSuccess.bind(this)))
          .catch((this.onLoginFail.bind(this)));
      });
  }


hash(email,password){   //ログインが成功したときに呼ばれ、個別のデータベースを作る
  JSHmac(email,password, CONSTANTS.HmacAlgorithms.HmacSHA256)
  .then(hash => db.collection(hash).add({
      email:this.state.email,
      password: this.state.password,
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  })
)
  .catch(e => console.log(e));
};

  onLoginSuccess() {
    this.setState({
      loading: false,
      error: ''
    });
    return(
    this.hash(this.state.email,this.state.password)
  )
  }

  onLoginFail() {
    this.setState({
      loading: false,
      error: 'Authentication Failed'
    });
  }

  loadSpinner() {
    if (this.state.loading) {
      return <ActivityIndicator size="small" />
    }

    return (//Reactのコンポーネントはトップレベル（一番上の階層）で1つにする必要があるから<div>でひとつにまとめてる
      <div>
      <TouchableOpacity onPress={this.onButtonPress} style={styles.buttonStyle}>
        <Text>
        ログイン
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.onButtonPress} style={styles.buttonStyle}>
        <Text>
        新規登録
        </Text>
      </TouchableOpacity>
      </div>
    )
  }

  render() {
    return (
      <View>
        <View>
          <TextInput
              placeholder="user@gmail.com"
              autoCorrect={false}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
        </View>
        <View style={styles.wrap}>
          <TextInput
              secureTextEntry
              placeholder="password"
              autoCorrect={false}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
        </View>

        <View style={styles.wrap}>
          {this.loadSpinner()}
        </View>
      </View>
    )
  }
}

const styles = {
  // スタイルを記述
  wrap: {
    padding: 10
  },
  textStyle: {
    alignSelf: 'center',
    color: '#ff9f',
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10,
    paddingTop: 10
  },
  buttonStyle: {
    flex:1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff'
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    height: 30,
    borderWidth: 1,
    borderColor: '#333'
  }
}
export default LoginForm;
