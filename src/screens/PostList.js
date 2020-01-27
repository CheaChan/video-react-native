import React from 'react';
import {StyleSheet, ActivityIndicator, FlatList, View, Text, TouchableOpacity } from 'react-native';
// import Post from '../components/Post';
import { WebView } from "react-native-webview";
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
      // _isMounted = false;
        super();
        this.state = {
          items:[],
          page: 1,
          isLoading: false,
          isMounted: true,
        }
    }
    componentDidMount() {
      // this._isMounted = true;
      this.setState({isLoading:true},this.getData)
    }
    getData = async () => {
      fetch('http://flexi-post.herokuapp.com/api/articles/', {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
            this.setState({
              items: this.state.items.concat(json.data),
              isLoading: false,
              isMounted: !this.state.isMounted,
            });
        })
        .catch(error => {
          console.error(error);
        });
    }
    // componentDidMount(){
    //     // this._isMounted = true;
    //     // this.setState({isLoading: !this.isLoading})
    //     this._get('http://flexi-post.herokuapp.com/api/articles').then(
    //       json => {
    //         this.setState({items: json.data, isLoading: !this.state.isLoading})
    //       }
    //     )
    // }
    // componentWillUnmount() {
    //   this.state.isLoading = false;
    // }
    renderRow = ({item}) => {
      const OriginalVideo = item.video_url;
      const SplitedVideo = OriginalVideo.split("watch?v=");
      const Embed = SplitedVideo.join("embed/");
      return (<TouchableOpacity style={styles.post} onPress={() => this.props.navigation.navigate('Details',{id: item.id})}>
        <WebView style={styles.VideoSocial}
          allowsInlineMediaPlayback={true}
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
          // domStorageEnabled={true}
          // mediaPlaybackRequiresUserAction = {true}
          // scrolling={true}
          // allowTransparency={true}
          // showinfo={false}
          // controls={0}
          // modestbranding={true}
          source={{ uri: Embed }}
        />
        {/* <Image style={styles.postImage} source={{uri: this.props.item.profiles.large}}></Image> */}
        <Text style={styles.postText}>{item.title}</Text>
        <Text style={styles.postText}>{item.category_name}</Text>
      </TouchableOpacity>  )
    }
    handleLoadMore = () => {
      console.log('handleLoadMore');
      this.setState(
        {
          isLoading: true
        },
        this.getData
      )
    }
    renderFooter = () => {
      console.log('renderFooter');
      return(
        this.state.isLoading ?
        <View style={styles.footerLoader}>
          <ActivityIndicator size="large" color="#f4511e"/>
        </View>: null
      )
    }
    render(){
      // console.log(!this.state.items.length +"##"+ this.state.isLoading +"##"+this.state.items.length);
        if(this.state.isMounted){
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
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          ListFooterComponent={this.renderFooter}
          /> 
        )
    }
    // _get = async (endpoint) => {
    //     const res = await fetch(endpoint);
    //     const data = await res.json();
    //     // if (this._isMounted) {
    //         return data;
    //     // }  
    // }
    
  }
const styles = StyleSheet.create({
container: {
    marginTop: 5,
    backgroundColor: '#f5f5f0',
},
loader: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
},
footerLoader: {
    marginTop: 5,
    alignItems: 'center'
},
post: {
  backgroundColor:'#f5f5f0',
  borderBottomColor:'#ccc',
  borderBottomWidth: 1,
  marginBottom: 5,
  width: '100%',
  shadowColor: '#000',
  shadowOpacity:0.2,
  shadowRadius:1,
  shadowOffset:{
    width:3,
    height:3
  }
},
VideoSocial: {
  width: '100%',
  height:190,
},
postText: {
  paddingLeft: '2%',
  paddingRight: '2%',
  fontSize: 16,
},
});