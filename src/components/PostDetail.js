import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import { WebView } from "react-native-webview";

class PostDetail  extends React.Component{
  render(){
    const OriginalVideo = this.props.item.video_url;
    const SplitedVideo = OriginalVideo.split("watch?v=");
    const Embed = SplitedVideo.join("embed/");
    return(
        <View style={styles.post}>
          <WebView style={styles.VideoSocial}
            allowsInlineMediaPlayback={true}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mediaPlaybackRequiresUserAction = {true}
            scrolling={true}
            allowTransparency={true}
            source={{ uri: Embed }}
          />
          {/* <Image style={styles.postImage} source={{uri: this.props.item.profiles.large}}></Image> */}
          <Text style={styles.postText}>{this.props.item.title}</Text>
          <Text style={styles.postText}>Category: {this.props.item.category_name}</Text>
          <Text style={styles.postText}>Published on {this.props.item.published_date}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    post: {
      backgroundColor:'#f5f5f0',
      width: '100%',
      height: '55%',
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

export default PostDetail;
