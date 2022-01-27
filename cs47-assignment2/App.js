'use strict';
import React, { Component } from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Image, ImageBackground,StatusBar, TouchableWithoutFeedbackBase } from 'react-native';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { Themes } from './assets/Themes';
import SwipeCards from 'react-native-swipe-cards';
import {Asset} from 'expo-asset';



class Card extends React.Component {
  constructor(props) {
    super(props);

  }
  
  render() {
    return (

      <View style={styles.card}>
        <ImageBackground source={this.props.image} style = {styles.thumbnail}>

          <Text style={styles.txt2}>
            {this.props.name}
          </Text>


        <Text style= {{left: '5%', top: '82%', fontFamily: 'Sydney', color: 'white', fontSize: '15%'}}>
          2 miles away
        </Text>
        </ImageBackground>
      </View>
    )
  }
}



class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
}


const cards = [
  {name: 'MTL', image: require("./assets/Profiles/mtl.jpg")},
  {name: 'Drell', image: require("./assets/Profiles/drell.jpg")},
  {name: 'Bob', image: require("./assets/Profiles/man1.jpg")},
  {name: 'Brubaker', image: require("./assets/Profiles/brubakercole.jpg")},
  {name: 'Sandra', image: require("./assets/Profiles/woman1.jpg")},
]

const cards2 = [

]

let outOfCards;
export default class extends React.Component {


  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      'Sydney': require('./assets/Fonts/Sydney-Serial-Regular.ttf'),

      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      'Sydney-Bold': {
        uri: require('./assets/Fonts/Sydney-Serial-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }



  
  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      outOfCards: false
    }
  }

  handleYup (card) {
    console.log("yup")
  }

  handleNope (card) {
    console.log("nope")
  }
  handleMaybe (card) {
    console.log("maybe")
  }
  

  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 0

    if (this.state.cards.length - index < CARD_REFRESH_LIMIT) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(cards2),
          outOfCards: true
        })
      }

    }

  }

  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    //stack={true}
    return (
      
      <View style={styles.container}>
        <View style={styles.header}> 
        <View style={styles.headerChild}>
            <Image source={require("./assets/Icons/menu_dark.png")} style={styles.snackImage}
            />
          </View>
          <View style={styles.headerChild}>
            <Text style = {{fontSize:30, fontFamily:'Sydney-Bold', color: 'white'}}> ensom 
            </Text>
          </View>
          <View style={styles.headerChild}>
            <Image source={require("./assets/Icons/moon.png")} style={styles.snackImage}
            />
          </View>
      </View>
      <View style={styles.swipe}> 
      
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved.bind(this)}
      />

      </View>

      <View style={styles.recording}> 
        <Text style={styles.hottestTake}>
            My hottest take
        </Text>
        <View style={styles.recordingflex}>
        <View style={styles.recordingflexChild}>
          <Image source={require("./assets/Icons/player_dark.png")} style = {{aspectRatio: 1, height: 55}}/>
          </View>
        <View style={styles.recordingflexChild}>  
          <Image source={require("./assets/Icons/audio_waveform_dark.png")} style = {{marginTop: '5%', marginLeft: '5%',height: 45, resizeMode: 'contain'}}/>
        </View>
        </View>
      
      </View>
      <View style={styles.flexParent}>
      <View style={styles.flexChild}>
          <Image source={require("./assets/Icons/discover_dark_legacy.png")} style={styles.snackImage}
          />
          <Text style={styles.txt // test to see if the font is loaded, feel free to remove this
        }>
          Discovery
          </Text>
        </View>
        <View style={styles.flexChild}>
          <Image source={require("./assets/Icons/heart_dark.png")} style={styles.snackImage}
          />
          <Text style={styles.txt // test to see if the font is loaded, feel free to remove this
        }>
          Matches
          </Text>
        </View>
        <View style={styles.flexChild}>
          <Image source={require("./assets/Icons/messages_dark.png")} style={styles.snackImage}
          />
          <Text style={styles.txt // test to see if the font is loaded, feel free to remove this
        }>
          DMS
          </Text>
        </View>
      </View>
     
      
    </View>

      
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1, // take up entire screen
    flexDirection: "column",
    backgroundColor: 'black',
    alignItems: "center"

  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    height: '10%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: '10%',
    flexDirection: "row"
    },
    thumbnail: {
      width: 340,
      height: 340,
    },
    text: {
      fontSize: 20,
      paddingTop: 10,
      paddingBottom: 10
    },
    noMoreCards: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
   swipe: {
    display: 'flex',
    height: '40%',
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginBottom: '5%',
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.58,
    shadowRadius: 5.00,
    },
    swipePhoto: {
      display: 'flex',
      height: '100%',
      width: '100%',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      
    },
    card: {
        marginTop: "0%",
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        color: 'white',
        borderWidth: 1,

        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        
    },
    noMoreCardsText: {
      fontSize: 22,
    },
    noMoreCards: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    recording: {
    display: "flex",
    height: '16%',
    width: '88%',
    backgroundColor: "#18191A",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginBottom: '40%',
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5.00,

    },
    recordingflex: {
      display: "flex",
      flexDirection: 'row',
      justifyContent: "flex-start",
      marginTop: '10%',
    },
    recordingflexChild: {
    width: "25%",
    height: "100%",
    display: "flex",
    flexDirection: "column", 
    marginRight: '20%',
    alignItems: "center"
    },
  flexParent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    height: "10%",
    width: "100%"
  },
  flexChild: {
    width: "25%",
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column", 
    marginTop: '1%',
    alignItems: "center"
  },
headerChild: {
    width: "25%",
    height: "100%",
    display: "flex",
    flexDirection: "column", 
    marginBottom: '4%',
    alignItems: "center",
    justifyContent: "flex-end",
  },
  snackImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  txt: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Sydney'
  },
  txt2: {
    fontSize: 30,
    textAlign: 'left',
    top: '2%',
    left: '5%',
    fontFamily: 'Sydney',
    color: 'white',

  },
  hottestTake: {
    fontSize: 25,
    textAlign: 'left',
    top: '15%',
    left: '5%',
    fontFamily: 'Sydney',
    color: 'white'
  },
  
});
