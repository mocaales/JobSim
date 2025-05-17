import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from 'expo-auth-session';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {

    useWarmUpBrowser();

    console.log(AuthSession.makeRedirectUri());

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  
    const onPress = React.useCallback(async () => {
        try {
            const { createSessionId, signIn, signUp, setActive } = await 
            startOAuthFlow(); 

            if(createSessionId){
                setActive({ sessionId: createSessionId });
            } else{
                // use signIn or signUp to create a session
            }
        } catch (error) {
            console.log("OAuth error", error);
        }
    }, []);
  return (
    <View>
        <View style={styles.container}>
            <Image source={require('./../assets/images/Login.png')}style={styles.LoginSlika}/>
        </View>

        <View style={styles.SubContainer}>
            <Text style={styles.SubContainerText}>
            Welcome to <Text style={styles.darkText}>JobSim</Text>
            </Text>

            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text style={styles.btnText}>
                    Lets get started
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 100,
        backgroundColor: COLORS.black
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 20,
    },
    LoginSlika: {
        width: 220,
        height: 450,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#000'
    },
    SubContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -20
    },
    SubContainerText: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#777',
    },
    darkText: {
        color: COLORS.black,
    },
    btn:{
        backgroundColor: COLORS.black,
        padding: 16,
        borderRadius: 99,
        marginTop: 30,
    },
    btnText:{
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    }
};