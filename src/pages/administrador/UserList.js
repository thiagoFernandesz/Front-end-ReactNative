import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    SafeAreaView,
    AsyncStorage,
    FlatList,
} from 'react-native'

import api from '../../services/api'
import ListItems from '../../components/listItems/index'


function UsersList({ navigation }) {
    const [users, setUsers] = useState('')

    useEffect(() => {
        (async () => {
            const response = await api.get('/application/usuarios')
            await AsyncStorage.setItem('users', JSON.stringify(response.data.users))
            setUsers(JSON.parse(await AsyncStorage.getItem('users')))
            console.log('Console do userlist', users)
        })()
    }, [])

    //const renderItem = ({ item }) => {     const backgroundColor = item._id === selectedId ? "#6e3b6e" : "#f9c2ff";
    console.log('ENTROU AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII', users)
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.divLogo}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/login.png')}
                />
            </View> 
            <Text style={styles.textInformativo}>
                </Text>
            <View style={styles.container}>
                <FlatList
                    data={users}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (<ListItems data={item} />)}
                    //renderItem={ renderItem } 
                    ItemSeparatorComponent={() => <View backgroundColor="#000" height={2} />}
                />
            </View>
        </SafeAreaView>
    )
    }

const styles = StyleSheet.create({
  screen: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#858180'
  },
  divLogo: {
      backgroundColor: '#191919',
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      width: '100%',
  },
  container: {
      flex: 1,
      width: '100%',
  },
  textInformativo: {
      fontSize: 15,
      marginBottom: 10,
      marginTop: 5,
      alignSelf: 'center',
  },
  logo:{
    height: 100,
    width: 100
  }
})

export default UsersList