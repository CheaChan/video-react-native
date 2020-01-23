import React from 'react';
import {StyleSheet, ActivityIndicator, FlatList, View } from 'react-native';
import PostDetailVideo from '../components/PostDetail';
export default class PostDetail extends React.Component {
  static navigationOptions = {
    title: 'Details',
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
    // componentDidMount() {
    //   this._isMounted = true;
    //   const {params} = this.props.navigation.state;
    //   fetch('http://flexi-post.herokuapp.com/api/articles/'+params.id, {
    //     method: 'GET',
    //   })
    //     .then(response => response.json())
    //     .then(json => {
    //       if (this._isMounted) {
    //         this.setState({
    //           items: json.data
    //         });
    //       }
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // }
    componentDidMount(){
      this._isMounted = true;
      const {params} = this.props.navigation.state;
       this._get('http://flexi-post.herokuapp.com/api/articles/'+params.id).then(
         json => {
           this.setState({items: json.data, isLoading: !this.state.isLoading})
         }
       )
    }
    componentWillUnmount(){
      this._isMounted = false;
    }
    render(){
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
          <PostDetailVideo item={this.state.items}/>
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