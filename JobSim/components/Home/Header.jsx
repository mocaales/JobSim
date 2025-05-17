import {View, Text, Image, } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { COLORS } from './../../constants/Colors';

export default function Header() {

    const {user} = useUser();

    return (
        <View style={styles.container}>
            <View style={styles.displayedName}>
                <Image source={{uri: user?.imageUrl}} style={styles.image}/>
                <View>
                    <Text style={{color: COLORS.white}}>Welcome</Text>
                    <Text style={styles.UserText}>{user?.fullName}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = {
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: COLORS.gray
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 99
    },
    displayedName: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    UserText: {
        fontSize: 18,
        color: COLORS.white,
    }
};