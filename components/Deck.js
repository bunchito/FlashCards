import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Deck ({ onQuestions, onTitle, onBorder }) {

  questionsRender = () => {

    const totalQuestions = onQuestions.length;

    if (totalQuestions !== null && totalQuestions !== '') {
      if (totalQuestions === 1) {
        return <Text>{ totalQuestions } card</Text>
      } else {
        return <Text>{ totalQuestions } cards</Text>
      }
    }
  }

  return (
    <View style={ styles.container }>
      <View style={ [styles.column, styles.parent, { borderBottomWidth: onBorder }] }>
        <Text style={ [styles.column], { fontSize: 35, paddingLeft: 10, paddingRight: 10 } }>{ onTitle }</Text>
        <Text style={ styles.column }>{ this.questionsRender() }</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  parent: {
    padding: 20
  }
});
