import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

// Formik
import {Formik} from 'formik';

// Styled Components
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from './../Components/Styles';

import {View, ActivityIndicator} from 'react-native';

// Icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

// Colors
const {brand, darkLight, primary} = Colors;

// Keyboard Avoiding Wrapper
import KeyboardAvoidingWrapper from '../Components/KeyboardAvoidingWrapper';

// API Client
import axios from 'axios';

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://104.38.84.180:3000/user/signin';

        axios
        .post(url, credentials)
        .then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message, status);
            } else {
                console.log(data);
                navigation.navigate('Welcome', {...data[0]});
            }
            setSubmitting(false);
        })
        .catch(error => {
            console.log(error);
            setSubmitting(false);
            handleMessage('An error occurred. Check your network and try again');
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return(
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style = "dark" />
            <InnerContainer>
                <PageLogo resizeMode = "cover" source = {require('./../assets/Images/Tash.png')} />
                <PageTitle>Elevating Humanity  Redefining Connections</PageTitle>
                <SubTitle>Enter the Matrix</SubTitle>

                <Formik
                    initialValues = {{email: '', password: ''}}
                    onSubmit = {(values, {setSubmitting}) => {
                        if (values.email == '' || values.password == '') {
                            handleMessage('Please Fill In All The Fields');
                            setSubmitting(false);
                        } else {
                            handleLogin(values, setSubmitting);
                        }
                    }}
                >{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                    <MyTextInput
                        label = "Email"
                        icon = "mail"
                        placeholder = "Email"
                        placeholderTextColor = {darkLight}
                        onChangeText = {handleChange('email')}
                        onBlur = {handleBlur('email')}
                        value = {values.email}
                        keyboardType = "email-address"
                    />

                    <MyTextInput
                        label = "Password"
                        icon = "lock"
                        placeholder = "* * * * * * * *"
                        placeholderTextColor = {darkLight}
                        onChangeText = {handleChange('password')}
                        onBlur = {handleBlur('password')}
                        value = {values.password}
                        secureTextEntry = {hidePassword}
                        isPassword = {true}
                        hidePassword = {hidePassword}
                        setHidePassword = {setHidePassword}
                    />
                    <MsgBox type = {messageType}>{message}</MsgBox>
                    {!isSubmitting &&<StyledButton onPress = {handleSubmit}>
                        <ButtonText>
                            Login
                        </ButtonText>
                    </StyledButton>}
                    
                    {isSubmitting &&<StyledButton disabled = {true}>
                        <ActivityIndicator size = 'large' color = {primary} />
                    </StyledButton>}



                    <Line />
                    <ExtraView>
                        <ExtraText>
                            Don't have an account? 
                        </ExtraText>
                        <TextLink onPress = {() => navigation.navigate('Signup')}>
                            <TextLinkContent>Create One</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledFormArea>)}

                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name = {icon} size = {30} color = {brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress = {() => setHidePassword(!hidePassword)}>
                    <Ionicons name = {hidePassword ? 'eye-off' : 'eye'} size = {30} color = {darkLight} />
                </RightIcon>
            )}
        </View>
    );
}

export default Login;