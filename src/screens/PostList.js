import React from 'react';
import {StyleSheet, ActivityIndicator, FlatList, View } from 'react-native';
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
  _isMounted = false;
    constructor(){
        super();
        this.state = {
          items:[]
        }
    }
    componentDidMount(){
        this._isMounted = true;
        this._get('http://flexi-post.herokuapp.com/api/articles').then(
          json => {
            this.setState({items: json.data})
          }
        )
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
  
    render(){
        if(this.state.items.length === 0){
          return(
            <View style={styles.loader}>
              <ActivityIndicator size="large"/>
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