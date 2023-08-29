import styled from 'styled-components';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

// Define the status bar height from device constants
const StatusBarHeight = Constants.statusBarHeight;

// Colors used throughout the application
export const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6D3713",
  green: "#0F9D58",
  red: "#EF4444",
}

export const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

// Styled components for various UI elements

// Container for the entire screen
export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${primary};
`;

// Container for the main content
export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

// Container for the welcome message
export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

// Image component for logos and images
export const PageLogo = styled.Image`
  width: 250px;
  height: 200px;
`;

// User avatar image component
export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

// Welcome image component
export const WelcomeImage = styled.Image`
  height: 50%;
  min-width: 100%;
`;

// Styled text for page titles
export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;

  ${(props) => props.welcome && `
    font-size: 35px;
  `}
`;

// Styled text for subtitles
export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};

  ${(props) => props.welcome && `
    margin-bottom: 5px;
    font-weight: normal;
  `}
`;

// Styled container for forms
export const StyledFormArea = styled.View`
  width: 90%;
`;

// Styled text input for forms
export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

// Styled label for input fields
export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

// Styled view for icons on the left side of inputs
export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

// Styled touchable component for icons on the right side of inputs
export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

// Styled button component
export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;

  ${(props) => props.google == true && `
    background-color: ${green};
    flex-direction: row;
    justify-content: center;
  `}
`;

// Styled text for button text
export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;

  ${(props) => props.google == true && `
    padding: 25px;
  `}
`;

// Styled text for messages or alerts
export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type == 'SUCCESS' ? green : red)};
`;

// Styled horizontal line
export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;

// Styled view for additional content
export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

// Styled text for additional content
export const ExtraText = styled.Text`
  justify-content: center;
  align-items: center;
  color: ${tertiary};
  font-size: 15px;
`;

// Styled touchable component for text links
export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

// Styled text for text link content
export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;
