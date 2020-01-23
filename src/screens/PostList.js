import React from 'react';
import {StyleSheet, ActivityIndicator, FlatList, View, Text } from 'react-native';
import Post from '../components/Post';
export default class PostList extends React.Component {
  static navigationOptions = {
    title: 'List',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
    constructor(){
      _isMounted = false;
        super();
        this.state = {
          items:[],
          isLoading: true
        }
    }
    componentDidMount(){
        this._isMounted = true;
        // this.setState({isLoading: !this.isLoading})
        this._get('http://flexi-post.herokuapp.com/api/articles').then(
          json => {
            this.setState({items: json.data, isLoading: !this.state.isLoading})
          }
        )
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
    render(){
      // console.log(!this.state.items.length +"##"+ this.state.isLoading +"##"+this.state.items.length);
        if(this.state.isLoading){
          return(
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#f4511e"/>
            </View>
          )
        }
        if(this.state.items.length === 0){
          return(
            <View style={styles.loader}>
              <Text>No data</Text>
            </View>
          )
        }
        return(
          <FlatList 
          style={styles.container} 
          data={this.state.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <Post item={item}/>}
          /> 
        )
    }
    _get = async (endpoint) => {
        const res = await fetch(endpoint);
        const data = await res.json();
        if (this._isMounted) {
            return data;
        }  
    }
    
  }
const styles = StyleSheet.create({
container: {
    marginTop: 10,
    backgroundColor: '#f5f5f0',
},
loader: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
}
});