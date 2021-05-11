import React, 
      {useState, 
       useEffect 
} from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Alert,
  Image,
  AsyncStorage
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { TextInputMask } from 'react-native-masked-text'

import Header from '../../components/Header'

export default function Profile({ navigation }) {
  const [idUser, setIdUser] = useState(null)
  const [name, setName] = useState(null)
  const [cpf, setCpf] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [cpfField, setCpfField] = useState(false)
  const [edit, setEdit] = useState(false)
  const [show, setShow] = useState(false)
  const [user, setUser] = useState('')
  
  useEffect(() => {
    (async function handleLoadUser() {
      console.log('Puxou dados!')
      const token = await AsyncStorage.getItem('token')
      const user = JSON.parse(await AsyncStorage.getItem('user'))
      console.log(user)
      setUser(user) 
    })()
    //handleLoadUser()
  }, [])

  /*async function handleLoadUser() {
    setIdUser(user.id)
    setName(user.name)
    setCpf(user.cpf)
    setEmail(user.email)
    setPassword(user.password)
  }*/

  async function handleUserUpdate() {
    try {
      if (!cpfField.isValid()) return Alert.alert('CPF invalido!')

      let response

      if (password === null) {
        response = await api.put(`/user/${idUser}`, {
          name,
          cpf: cpfField.getRawValue(),
          email,
        })
      } else {
        response = await api.put(`/user/${idUser}`, {
          name,
          cpf: cpfField.getRawValue(),
          email,
          password,
        })
      }

      const { updatedUser } = response.data

      Alert.alert('Alterado com sucesso!')
      setEdit(false)
      setShow(false)
    } catch (response) {
      Alert.alert(response.data.message)
    }
  }

  async function handleUpdatePhoto() { }

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAvoidingView behavior="padding" style={styles.divForm}>
        <View style={styles.divHeaderForm}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => {
              edit === true ? handleUpdatePhoto() : {}
            }}
          >
              <Image
                style={styles.imageUser}
                source={require('../../../assets/ImageUserExample.png')}
              />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setEdit(true)
              setShow(true)
            }}
            style={styles.icon}
          >
            <AntDesign name="edit" size={25} color="black" />
            <Text>Editar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divInfo}>
          <Text>Nome: </Text>
          <TextInput
            editable={edit}
            style={styles.input}
            value={user.name}
          />
        </View>
        <View style={styles.divInfo}>
          <Text>CPF: </Text>
          <TextInputMask
            editable={edit}
            //placeholder="CPF"
            type={'cpf'}
            style={styles.input}
            value={user.cpf}
          />
        </View>
        <View style={styles.divInfo}>
          <Text>E-mail: </Text>
          <TextInput
            editable={edit}
            style={styles.input}
            value={user.email}
          />
        </View>
        {show ? (
          <View style={styles.divInfo}>
            <Text>Senha: </Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              value={user.password}
            />
          </View>
        ) : (
          false
        )}
      </KeyboardAvoidingView>
      <View style={styles.divButton}>
        {show ? (
          <TouchableOpacity style={styles.btnSalvar} onPress={handleUserUpdate}>
            <Text style={styles.btnText}>Salvar Alterações</Text>
          </TouchableOpacity>
        ) : (
          false
        )}
        <TouchableOpacity
          style={styles.btnVoltar}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.btnText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#858180',
    alignItems: 'center',
  },
  icon: {
    zIndex: 1,
    alignItems: 'center',
    position: 'absolute',
    right: 1,
    top: 10,
    marginRight: 5,
  },
  header: {
    flex: 1,
    marginTop: 10,
    maxHeight: 130,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageUser: {
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#131313',
  },
  divForm: {
    maxWidth: '90%',
    flex: 1,
    maxHeight: 500,
  },
  divHeaderForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxHeight: 180,
  },
  divInfo: {
    marginVertical: 7.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#858180',
    width: '85%',
    color: '#222',
    fontSize: 20,
    borderRadius: 7,
    padding: 15,
  },
  divButton: {
    flex: 1,
    maxHeight: 180,
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnVoltar: {
    marginTop: 15,
    backgroundColor: '#34d4b2',
    minWidth: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  btnSalvar: {
    marginTop: 15,
    backgroundColor: '#34d4b2',
    minWidth: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
  },
})
