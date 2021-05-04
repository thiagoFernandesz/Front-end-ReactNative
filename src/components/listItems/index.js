import React, 
      {useState 
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

function ListItem({ data, navigation }) {
  const [level, setLevel] = useState(data.nivel)
  const [idUser, setIdUser] = useState(data.id)
  const [avatar, setAvatar] = useState(data.image)

  async function handleDeactivation() {
    try {
      Alert.alert('Alerta', 'Desativar usuário?', [
        { text: 'Não', style: 'cancelar' },
        {
          text: 'Sim'
        },
      ])
    } catch (err) {
      Alert.alert('Não foi possível desativar esse usuário')
    }
  }

  function rightActions() {
    return (
      <View>
        {level === 0 ? (
          <TouchableOpacity
            style={styles.buttonAtivar}
            onPress={handleActivation}
          >
            <Text style={styles.textButton}>Ativar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonDesativar}
            onPress={handleDeactivation}
          >
            <Text style={styles.textButton}>Desativar</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={rightActions}>
      <TouchableOpacity
        style={styles.container}
        onPress={handleNavigationUpdate}
      >
        <View style={styles.divImage}>
          {avatar === '' ? (
            <Image
              style={styles.imageUser}
              source={require('../../../assets/ImageUserExample.png')}
            />
          ) : (
            <>
            </>
          )}
        </View>
        <View style={styles.divInfo}>
          <Text style={styles.text}>Nome: {data.name}</Text>
          <Text style={styles.text}>CPF: {data.cpf}</Text>
          {level === 0 ? (
            <Text style={styles.textDesativado}>Desativado</Text>
          ) : level === 1 ? (
            <Text style={styles.text}>Usuário comum</Text>
          ) : (
            <Text style={styles.text}>Administrador</Text>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 2,
    marginHorizontal: 8,
  },
  text: {
    fontSize: 17,
  },
  textDesativado: {
    fontSize: 17,
    color: '#ff0000',
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
  },
  divImage: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: '25%',
    height: '100%',
  },
  imageUser: {
    borderWidth: 3,
    maxWidth: 70,
    maxHeight: 70,
    borderRadius: 100,
    marginLeft: 5,
  },
  divInfo: {
    flex: 1,
    width: '70%',
    justifyContent: 'center',
  },
  buttonAtivar: {
    backgroundColor: '#2BAE66FF',
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
  buttonDesativar: {
    backgroundColor: '#ff0000',
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
})

export default ListItem
