import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import Deck from './Deck';
import { white, purple, red } from '../utils/colors';

class DeckDetails extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title
    }
  }

  render() {
    /*
    let questions = true;

    if (typeof(this.props.decks[this.props.title].questions) === 'undefined' || this.props.decks[this.props.title].questions == null) {
    questions = false
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  }
  */
  //console.log(this.props.decks[this.props.title].questions.length)
  //console.log('type', typeof decks[title].questions)
  //console.log('hasQuestions', questions)
  
  const { title, decks } = this.props;

  return (
    <View style={ styles.container }>
      <View style={{ flex: 3 }}>
        <View style={{ flex: 0.8, flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}>
          <Deck onTitle={ title } onQuestions={ decks[title].questions ? decks[title].questions : 0 } onBorder={ 0 } />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={ [Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,  styles.addCard ] }
          onPress={ () => this.props.navigation.navigate('AddCard', { title: 'Add a Card', deck: title }) }>
          <Text style={ [styles.submitBtnText, { color: purple }] }>Add card</Text>
        </TouchableOpacity>

        {decks[title].questions != 0 && (
          <View>
            <TouchableOpacity style={ Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn }
              onPress={ () => this.props.navigation.navigate('Quiz', { title: 'Quiz', deck: title }) }>
              <Text style={ styles.submitBtnText }>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        )}

        { /* <Text> JSON.stringify(this.props.decks[title]) </Text> */ }
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  /*
  column: {
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: red,
  justifyContent: 'space-around',
},
*/
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
  alignItems: 'center',
  width: 200
},
submitBtnText: {
  color: white,
  fontSize: 22,
  textAlign: 'center',
},
addCard: {
  marginBottom: 30,
  backgroundColor: white,
  color: purple,
  borderColor: purple,
  borderWidth: 2
}
})

function mapStateToProps (decks, { navigation }) {
  const { title } = navigation.state.params
  return {
    decks,
    title,
  }
}

export default connect(mapStateToProps) (DeckDetails);
