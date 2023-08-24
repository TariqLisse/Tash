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

import {View} from 'react-native';

// Icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

// Colors
const {brand, darkLight, primary} = Colors;

// Keyboard Avoiding Wrapper
import KeyboardAvoidingWrapper from '../Components/KeyboardAvoidingWrapper';

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

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
                    onSubmit = {(values) => {
                        console.log(values);
                        navigation.navigate('Welcome');
                    }}
                >{({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
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
                    <MsgBox>. . .</MsgBox>
                    <StyledButton onPress = {handleSubmit}>
                        <ButtonText>
                            Login
                        </ButtonText>
                    </StyledButton>
                    <Line />
                    <StyledButton google = {true} onPress = {handleSubmit}>
                        <Fontisto name = "google" color = {primary} size = {25} />
                        <ButtonText google = {true}>
                            Continue with Google
                        </ButtonText>
                    </StyledButton>
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