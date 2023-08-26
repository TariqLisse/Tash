import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

// Formik
import {Formik} from 'formik';

// Styled Components
import {
    StyledContainer,
    InnerContainer,
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

import {View, Pressable, Platform, TouchableOpacity, StyleSheet, Text, ActivityIndicator} from 'react-native';

// DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';

// Icons
import {Octicons, Ionicons} from '@expo/vector-icons';

// Colors
const {brand, darkLight, primary} = Colors;

// Keyboard Avoiding Wrapper
import KeyboardAvoidingWrapper from '../Components/KeyboardAvoidingWrapper';

// API Client
import axios from 'axios';

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = ({type}, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatePicker();
                setDateOfBirth(currentDate.toDateString());
            }
        } else {
            toggleDatePicker();
        }
    };

    const confirmIOSDate = () => {
        setDateOfBirth(date.toDateString());
        toggleDatePicker();
    };
    
    // Form handling
    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://104.38.84.180:3000/user/signup';

        axios
        .post(url, credentials)
        .then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message, status);
            } else {
                console.log(data);
                navigation.navigate('Welcome', {...data});
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
                <PageTitle>From Ego To Empathy : Uniting The World</PageTitle>
                <SubTitle>Account Creation</SubTitle>

                <Formik
                    initialValues = {{name: '', email: '', dateOfBirth: '', password: '', confirmPassword: ''}}
                    onSubmit = {(values, {setSubmitting}) => {
                        values = {...values, dateOfBirth: dateOfBirth};
                        if (values.email == '' || values.password == '' || values.name == '' || values.dateOfBirth == '' || values.confirmPassword == '') {
                            handleMessage('Please Fill In All The Fields');
                            setSubmitting(false);
                        } else if (values.password !== values.confirmPassword) {
                            handleMessage('Passwords do not match');
                            setSubmitting(false);
                        }
                         else {
                            handleSignup(values, setSubmitting);
                        }
                    }}
                >{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                    <MyTextInput
                        label = "Username"
                        icon = "person"
                        placeholder = "Username"
                        placeholderTextColor = {darkLight}
                        onChangeText = {handleChange('name')}
                        onBlur = {handleBlur('name')}
                        value = {values.name}
                    />

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

                    {showPicker && (
                        <DateTimePicker
                         mode = 'date'
                         display = 'spinner'
                         value = {date}
                         onChange = {onChange}
                         />
                    )}

                    {showPicker && Platform.OS === 'ios' && (
                        <View
                        style = {{ flexDirection: 'row',
                    justifyContent: 'space-around'}}
                        >
                            <TouchableOpacity style = {[
                                styles.button,
                                styles.pickerButton,
                                { backgroundColor: '#11182711'}
                            ]}
                            onPress = {toggleDatePicker}
                            >
                                <Text style = {[
                                    styles.buttonText,
                                    { color: '#000000'}
                                ]}>Cancel</Text>
                            </TouchableOpacity>

                    

                    <TouchableOpacity style = {[
                        styles.button,
                        styles.pickerButton,
                    ]}
                    onPress = {confirmIOSDate}
                    >
                        <Text style = {[
                            styles.buttonText,
                            { color: '#000000'}
                        ]}>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                    </View>
                )}


                    {!showPicker && (
                    <Pressable onPress = {toggleDatePicker}>
                    <MyTextInput
                        label = "Date Of Birth"
                        icon = "calendar"
                        placeholder = "Mon Apr 17 2000"
                        value = {dateOfBirth}
                        placeholderTextColor = {darkLight}
                        onChangeText = {setDateOfBirth}
                        editable = {false}
                        onPressIn = {toggleDatePicker}
                    />
                    </Pressable>
                    )}

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

                    <MyTextInput
                        label = "Confirm Password"
                        icon = "lock"
                        placeholder = "* * * * * * * *"
                        placeholderTextColor = {darkLight}
                        onChangeText = {handleChange('confirmPassword')}
                        onBlur = {handleBlur('confirmPassword')}
                        value = {values.confirmPassword}
                        secureTextEntry = {hidePassword}
                        isPassword = {true}
                        hidePassword = {hidePassword}
                        setHidePassword = {setHidePassword}
                    />
                    <MsgBox type = {messageType}>{message}</MsgBox> 
                    
                    {!isSubmitting && (
                        <StyledButton onPress = {handleSubmit}>
                            <ButtonText>Create Account</ButtonText>
                        </StyledButton>
                    )}

                    {isSubmitting && (
                        <StyledButton disabled = {true}>
                            <ActivityIndicator size = 'large' color = {primary} />
                        </StyledButton>
                    )}
                    <Line />
                    <ExtraView>
                        <ExtraText>
                            Already have an account?  
                        </ExtraText>
                        <TextLink onPress = {() => navigation.navigate('Login')}>
                            <TextLinkContent>Sign In</TextLinkContent>
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

const styles = StyleSheet.create({
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: '#CFB53B',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff'
    },
    datePicker: {
        height: 120,
        marginTop: -10,
    },
    pickerButton: {
        paddingHorizontal: 20,
    },
})

export default Signup;