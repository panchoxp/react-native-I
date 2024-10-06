import React, { useEffect, useState } from 'react'
import { styles } from '../theme/styles';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
//firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebaseConfig';

export const HomeScreen = () => {

  const [name, setname] = useState(String);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setname(user.displayName ?? 'NA')//trae el nombre, caso contrario coloca NA
            }
        });
    }, [])



  return (
    <View style={styles.root}>
      <Text variant="bodySmall">  Bienvenid@</Text>
      <Text variant="labelLarge">  {name}</Text>
    </View>

  )
}
