import React from 'react';
import { TextInput, TouchableOpacity, ScrollView, SafeAreaView, View, Text, Alert, Image, FlatList, ActivityIndicator } from 'react-native';
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import { Rating, AirbnbRating } from 'react-native-ratings';

import {
  Spinner, // The React component
  pendingTasksReducer, // The redux reducer
  pendingTask, // The action key for modifying loading state
  begin, // The action value if a "long" running task begun
  end, // The action value if a "long" running task ended
  endAll // The action value if all running tasks must end
} from 'react-redux-spinner';

import { homeFetchData } from "../../boot/actions";


const profile = require("../../../assets/profile.png");
const bel = require("../../../assets/bell.jpg");
const find = require("../../../assets/find.jpg");
const back = require("../../../assets/back.png");
const tasklogo = require("../../../assets/tasklogo.png");
const taskpending = require("../../../assets/taskpending.png");
const barcodeweb = require("../../../assets/barcodeweb.png");


const loading = require("../../../assets/loading.gif");


import SearchInput, { createFilter } from 'react-native-search-filter';

import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'task.db' });

class HomeScreenForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data_pencarian: ""
    }
    this.start()
  }

  async start()
  {
    await this.props.fetchDataHome();
  }


  handlesearch(text)
  {
    this.setState({
      data_pencarian: text
    })
  }

  

  
  form_utama()
  {
    if(JSON.stringify(this.props.data_product) == "[]")
    {
      return(
        <View>

                <Image
                  source={barcodeweb}
                  style={{ width: 350, height: 350, alignSelf: "center", marginTop: 15 }}
                />

          <View style={{justifyContent: "center", alignSelf: "center", marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: "bold", fontColor: "black"}}>
              muchammadfurqon.tech
            </Text>
          </View>

                
        </View>
      )
    }
    else if(JSON.stringify(this.props.data_product) != "[]")
    {
      
      if(this.state.data_pencarian != "")
      {
        var KEYS_TO_FILTERS_BY_TITLE = ['title', 'subject'];
        var data_product = this.props.data_product.products.filter(createFilter(this.state.data_pencarian, KEYS_TO_FILTERS_BY_TITLE))
      }
      else if(this.state.data_pencarian == "")
      {
        var data_product = this.props.data_product.products
      }

      
      return(
        <View>

        <View style={{width: "100%", height: 120, flexDirection: "row", backgroundColor: "black"}}>
          
          <View style={{width: "70%", backgroundColor: "black"}}>
            <TextInput
              placeholder="apa yang anda mau"
              onChangeText={(text)=>{this.handlesearch(text)}}
              style={{marginLeft: 10, marginTop: 10, borderColor: "grey", width: "100%", height: 45, borderWeight: 1, backgroundColor: "white"}}
            />
          </View>
          <View style={{width: "30%", backgroundColor: "black"}}>
                <Image
                  source={barcodeweb}
                  style={{ width: 100, height: 100, alignSelf: "center", marginTop: 10 }}
                />
          </View>
        </View>

        





            <FlatList
              data={data_product}
              numColumns={2}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    padding: 20,
                    justifyContent: "center",
                    alignSelf: "center"
                  }}
                >
                  <Image
                    source={{
                      uri: item.thumbnail,
                    }}
                    style={{ width: 150, height: 150, borderRadius: 18 }}
                  />
                  

                  <View style={{flexDirection: "row"}}>
                    <Rating
                      type='heart'
                      readonly
                      ratingCount={1}
                      imageSize={22}
                    />
                    <Text style={{fontSize: 10, fontWeight: "bold", fontColor: "black", marginLeft: 8}}>
                      {item.rating}
                    </Text>
                  </View>


                  <View style={{ width: 150 }}>
                    <Text style={{fontSize: 13, fontWeight: "bold", fontColor: "black"}}>
                      {item.title} ({item.brand})
                    </Text>
                  </View>
                  <Text style={{fontSize: 10, fontColor: "red"}}>
                    discount : {item.discountPercentage} %
                  </Text>

                  
                  
                  <Text style={{fontSize: 18, fontWeight: "bold", fontColor: "black"}}>
                    ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </Text>
                  
                </View>
              )}
            />

        </View>
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "white" }}>

        {this.form_utama()}

        
      </View>
    );
  }
}

const HomeScreen = reduxForm({
  form: "HomeScreen"
})(HomeScreenForm);

function bindAction(dispatch) {
  return {
    fetchDataHome: body_home => dispatch(homeFetchData())
  };
}
const mapStateToProps = state => ({
  data_product: state.homeReducer.data_product
});


export default connect(mapStateToProps, bindAction)(HomeScreen);