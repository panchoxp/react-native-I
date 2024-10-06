import React, { useState } from 'react'

//firebase
import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';

export const RegistroScreen = ({navigation}:any) => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [hiddenPassword, sethiddenPassword] = useState<boolean>(true);

  function registrar() {
    if(password !== confirmPassword){
      Alert.alert('Error','Las contraseñas no coinciden.')
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        Alert.alert('Usuario registrado con exito')
        navigation.navigate("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(errorCode);
        switch (errorCode) {
          case 'auth/email-already-in-use':
            Alert.alert('Error', 'El correo ya existe');
            break;
          case 'auth/invalid-email':
            Alert.alert('Error', 'Correo invalido');
            break;
          case 'auth/missing-password':
            Alert.alert('Error', 'Ingrese una contraseña de 6 dígitos');
            break;
        }
      });
  }
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Registro</Text>
      <TextInput
        label="Email"
        mode='outlined'
        placeholder='Escriba el correo'
        keyboardType='email-address'
        value={email}
        onChangeText={text => setemail(text)}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Escriba la contraseña"
        value={password}
        secureTextEntry={hiddenPassword}
        onChangeText={text => setpassword(text)}
        right={<TextInput.Icon icon="eye" onPress={() => sethiddenPassword(!hiddenPassword)} />}
      />
            <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Escriba la contraseña"
        value={confirmPassword}
        secureTextEntry={hiddenPassword}
        onChangeText={text => setconfirmPassword(text)}
        right={<TextInput.Icon icon="eye" onPress={() => sethiddenPassword(!hiddenPassword)} />}
      />
      <Button icon="login" mode="contained" onPress={registrar}>
        Iniciar sesion
      </Button>

    </View>
  )
}
