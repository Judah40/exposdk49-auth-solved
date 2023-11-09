import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../../useContext'
import { user } from '../../../useContext'
const signin = () => {
    const {user, login,logout} = useAuth()
    const handleLogin = () => {
        const newUser:user={usename:"Judah", password:"alvin", userToken:"bhdgbfjdsfhjsvjfjdbjkf", user:"doc"}
        login(newUser)
    }

  return (
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
     <TouchableOpacity 
     onPress={()=>{
        handleLogin()
     }}
     >
        <Text>
            Sign In
        </Text>
     </TouchableOpacity>
    </View>
  )
}

export default signin