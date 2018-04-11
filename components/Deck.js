import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Deck extends Component {

  questionsRender = () => {
    const totalQuestions = this.props.onQuestions.length;

    // To avoid issue with Decks with 0 cards
    if (totalQuestions !== null && totalQuestions !== '') {
      if (totalQuestions === 1) {
        return <Text>{ totalQuestions } card</Text>
      } else {
        return <Text>{ totalQuestions } cards</Text>
      }
    }
  }

  render() {

    const { onTitle, onBorder } = this.props;

    return (
      <View style={ styles.container }>
        <View style={ [styles.column, styles.parent, { borderBottomWidth: onBorder }] }>
          <Text style={ [styles.column], { fontSize: 35 } }>{ onTitle }</Text>
          <Text style={ styles.column }>{ this.questionsRender() }</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  parent: {
    padding: 20
  }
});

export default Deck;
