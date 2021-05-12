import React, 
      {useState, 
       useEffect 
} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { AsyncStorage } from '@react-native-async-storage/async-storage'
import Header from '../../components/Header'
import api from '../../services/api'

export default function Dashboard({ navigation }) {
  const [loggedUser, setLoggedUser] = useState([])

  /*useEffect(() => {
    checkToken()
  })*/

  function logOut() {

    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.divButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProfileUser')}
        >
          <Text style={styles.btnText}>Ver Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserList')}
        >
          <Text style={styles.btnText}>Listar Usuários</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSair} onPress={logOut}>
          <Text style={styles.btnText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#858180',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#34d4b2',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
  },
  divButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSair: {
    marginTop: 30,
    backgroundColor: '#34d4b2',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
})
