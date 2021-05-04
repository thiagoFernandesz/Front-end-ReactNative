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
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { TextInputMask } from 'react-native-masked-text'
import {AsyncStorage} from '@react-native-async-storage/async-storage'

import Header from '../../components/Header'

export default function Profile({ navigation }) {
  const [idUser, setIdUser] = useState(null)
  const [name, setName] = useState(null)
  const [cpf, setCpf] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [cpfField, setCpfField] = useState(false)
  const [nivel, setNivel] = useState(null)
  const [avatar, setAvatar] = useState({})
  const [edit, setEdit] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    handleLoadUser()
  }, [])

  async function handleLoadUser() {
    const user = JSON.parse(await AsyncStorage.getItem('user'))

    setIdUser(user.id)
    setName(user.name)
    setCpf(user.cpf)
    setEmail(user.email)
    setNivel(user.nivel)
  }

  async function handleUserUpdate() {
    try {
      if (!cpfField.isValid()) return Alert.alert('CPF invalido!')

      const data = new FormData()

      const path = avatar.uri.split('/')
      const nameImage = path[path.length - 1]

      data.append('avatar', {
        name: nameImage,
        uri: avatar.uri,
        type: avatar.type,
      })

      data.append('name', name)
      data.append('email', email)
      data.append('cpf', cpf)

      let response

      if (password === null) {
        response = (`/user/${idUser}`, data)
      } else {
        data.append('password', password)
        response = (`/user/${idUser}`, data)
      }

      const { updatedUser } = response.data

      await AsyncStorage.setItem('user', JSON.stringify(updatedUser))

      Alert.alert('Alterado com sucesso!')
      setEdit(false)
      setShow(false)

      return
    } catch (response) {
      Alert.alert(response.data.message)
    }
  }

  function handleNavigation() {
    if (nivel === 1) navigation.navigate('DashboardUser')
    else navigation.navigate('DashboardAdm')
  }

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAvoidingView behavior="padding" style={styles.divForm}>
        <View style={styles.divHeaderForm}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => {
              edit === true ? handlePickerCall() : {}
            }}
          >
            {avatar.uri ? (
              <Image style={styles.imageUser} source={{ uri: avatar.uri }} />
            ) : (
              <Image
                style={styles.imageUser}
                source={require('../../../assets/ImageUserExample.png')}
              />
            )}
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
            value={name}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={styles.divInfo}>
          <Text>CPF: </Text>
          <TextInputMask
            editable={edit}
            placeholder="CPF"
            type={'cpf'}
            style={styles.input}
            value={cpf}
            onChangeText={(text, ref = null) => {
              setCpf(text)
            }}
            ref={(ref) => {
              setCpfField(ref)
            }}
          />
        </View>
        <View style={styles.divInfo}>
          <Text>E-mail: </Text>
          <TextInput
            editable={edit}
            style={styles.input}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        {show ? (
          <View style={styles.divInfo}>
            <Text>Senha: </Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              value={password}
              onChangeText={(value) => setPassword(value)}
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
        <TouchableOpacity style={styles.btnVoltar} onPress={handleNavigation}>
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
    backgroundColor: '#dddd',
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
