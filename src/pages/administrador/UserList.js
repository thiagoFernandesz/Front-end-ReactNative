import React,
{
  useState,
  useEffect
} from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'

import ListItems from '../../components/listItems'
import Header from '../../components/Header'

function UsersList({ navigation }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    handleDataUserList()
  }, [])

  return (
    <View style={styles.screen}>
      <Header />
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.navigate('DashboardAdm')}
      >
        <SimpleLineIcons name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Avatar />
      </View>
      <View style={styles.divList}>
        <FlatList
          data={users}
          key={(item) => item._id}
          renderItem={({ item }) => (
            <ListItems data={item} navigation={navigation} />
          )}
          ItemSeparatorComponent={() => (
            <View backgroundColor="#151515" height={2} />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#151515',
  },
  textInformativo: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'center',
    color: '#fff',
  },
  header: {
    marginTop: 10,
    maxHeight: 120,
  },
  buttonBack: {
    position: 'absolute',
    left: 1,
    top: 23,
    marginLeft: 10,
    width: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divList: {
    flex: 1,
    width: '100%',
  },
})

export default UsersList
