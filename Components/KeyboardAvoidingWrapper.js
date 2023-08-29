import React from 'react';

// Import necessary components from 'react-native'
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Component to wrap content and provide keyboard avoiding behavior
const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      {/* Wrap the content in a ScrollView */}
      <ScrollView>
        {/* Wrap the content with a TouchableWithoutFeedback to dismiss the keyboard when tapped */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default KeyboardAvoidingWrapper;
