import React from 'react';
import { StatusBar } from 'expo-status-bar';

// Styled Components
import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from './../Components/Styles';

const Welcome = ({navigation}) => {

    return(
        <>
            <StatusBar style = "dark" />
            <InnerContainer> 
                <WelcomeImage resizeMode = "cover" source = {require('./../assets/Images/T.png')} />
                <WelcomeContainer>
                    <PageTitle welcome = {true}>Welcome!</PageTitle>
                    <SubTitle welcome = {true}>Tariq Lisse</SubTitle>
                    <SubTitle welcome = {true}>tariqlisse@gmail.com</SubTitle>
                    <StyledFormArea>
                    <Avatar resizeMode = "cover" source = {require('./../assets/Images/icons8-user-default-96.png')} />
                    <Line />
                   
                    <StyledButton onPress = {() => {navigation.navigate('Login')}}>
                        <ButtonText>
                            Logout
                        </ButtonText>
                    </StyledButton>
                    
                </StyledFormArea>

                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};

export default Welcome;