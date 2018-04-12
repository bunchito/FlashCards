import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native';
import { white, purple } from './colors';

export function SubmitBtn ({ onPress, onLabel, onParentStyles, onChildStyles }) {
  return (
    <TouchableOpacity
      style={ [Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, onParentStyles] }
      onPress={ onPress }>
      <Text style={ [styles.submitBtnText, onChildStyles] }>{ onLabel }</Text>
    </TouchableOpacity>
  )
}

export function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={ onPress }>
      <Text style={[styles.textButton, style]}>{ children }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  textButton: {
    textAlign: 'center',
    color: purple
  }
});
