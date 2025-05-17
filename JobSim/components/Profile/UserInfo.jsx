import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';

export default function UserInfo() {

    const { user } = useUser();

  return (
    <View style={styles.container}>
        <Image source={{ uri: user?.imageUrl }} style={styles.UserImage} />
        <Text style={styles.UserNameDisplay}>{user?.fullName}</Text>
        <Text>{user?.primaryEmailAddress.emailAddress}</Text>
    </View>
  )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
    },
    UserImage: {
        width: 100,
        height: 100,
        borderRadius: 99
    },
    UserNameDisplay: {
        fontSize: 20,
        marginTop: 6,
        marginBottom: 6,    
    }
}