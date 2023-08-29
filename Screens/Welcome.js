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
  Avatar,
} from './../Components/Styles';

const Welcome = ({ navigation, route }) => {
  // Extract name and email from route parameters
  const { name, email } = route.params;

  return (
    <>
      {/* Status bar */}
      <StatusBar style="dark" />
      <InnerContainer>
        {/* Welcome image */}
        <WelcomeImage resizeMode="cover" source={require('./../assets/Images/T.png')} />
        <WelcomeContainer>
          {/* Page title */}
          <PageTitle welcome={true}>Welcome!</PageTitle>

          {/* Subtitles displaying user's name and email */}
          <SubTitle welcome={true}>{name || 'Toby Gobert'}</SubTitle>
          <SubTitle welcome={true}>{email || 'tobygobert@gmail.com'}</SubTitle>

          {/* Avatar and Logout button */}
          <StyledFormArea>
            {/* User avatar */}
            <Avatar resizeMode="cover" source={require('./../assets/Images/icons8-user-default-96.png')} />
            <Line />

            {/* Logout button */}
            <StyledButton onPress={() => { navigation.navigate('Login') }}>
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
