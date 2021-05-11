import React, 
       {useState, 
        useEffect 
} from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  AsyncStorage
} from 'react-native'
//import { AsyncStorage } from '@react-native-async-storage/async-storage'
import  { useNavigation} from '@react-navigation/core'
import api from '../../services/api'

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState(null)
  const [password, setPassword] = useState(null)

  /*useEffect(() => {
    async() => {
      const token = await AsyncStorage.getItem('token')
      const user = JSON.parse(await AsyncStorage.getItem('user'))
    }
  }, [])*/

  async function signIn() {
    try {
      const response = await api.post('/auth/login', {
        usuario,
        password,
      })

      const { user, token } = response.data

      await AsyncStorage.multiSet([
        ['token', token],
        ['user', JSON.stringify(user)],
      ])

      setUsuario(null)
      setPassword(null)

      console.log(response.data.user)

      handleNavigation()
    } catch (response) {
      console.log('Deu ruim', response)
      Alert.alert(response.data.error)
    }
  }

  async function handleNavigation() {
    const user = JSON.parse(await AsyncStorage.getItem('user'))

    if (user.level === 1) navigation.navigate('DashboardUser')

    if (user.level === 999) navigation.navigate('DashboardAdm')

    return
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.form}>
        <View style={styles.divLogo}>
          <Image
            style={styles.logo}
            source={require('../../../assets/login.png')}
            style={{ width: 600, height: 150 }}
            resizeMode="contain"
          />
        </View>
        <TextInput
          placeholder="Insira seu E-mail ou CPF"
          style={styles.input}
          value={usuario}
          onChangeText={(value) => setUsuario(value)}
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity style={styles.btnEntrar} onPress={signIn}>
          <Text style={styles.btnTextEntrar}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCadastro}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.btnTextCadastro}>Crie sua conta aqui</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divLogo: {
    minWidth: '100%',
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
    padding: 6,
    marginBottom: 15,
  },
  form: {
    flex: 1,
    backgroundColor: '#858180',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  input: {
    backgroundColor: '#dddd',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 20,
    borderRadius: 7,
    padding: 15,
    fontWeight: 'bold'
  },
  btnEntrar: {
    backgroundColor: '#34d4b2',
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  btnTextEntrar: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  btnCadastro: {
    marginTop: 30,
  },
  btnTextCadastro: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
})
