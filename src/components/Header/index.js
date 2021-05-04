import React from 'react'
import { StyleSheet, 
         View, 
         Image 
} from 'react-native'

// Função do cabeçalho.
export default function Header() {
  return (
    <View style={styles.divLogo}>
      <Image
        style={{ width: 200, height: 50 }}
        resizeMode="contain"
        source={require('../../../assets/login.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  divLogo: {
    paddingTop: 15,
    backgroundColor: '#151515',
    alignItems: 'center',
    minWidth: '100%',
  },
})
