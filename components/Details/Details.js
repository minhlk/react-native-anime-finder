import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import Jikan from '../../api/jikan/jikan-node.js';
const mal = new Jikan();

const Details = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);

  navigation.setOptions({ title: route.params.title });

  const getMovies = async (ep_id) => {
    try {
      const response = await mal.findAnime(ep_id, 'videos');
      console.log(response)
      setEpisodes(response.episodes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies(route.params.ep_id);
  }, []);

  if (isLoading) return <ActivityIndicator />;

  return (
    <FlatList
      style={styles.container}
      enableEmptySections={true}
      data={episodes}
      keyExtractor={(item) => {
        return item.episode;
      }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity>
            <View style={styles.box}>
              <Image style={styles.image} source={{ uri: item.image_url }} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.title}</Text>
                <View style={styles.row}>
                  <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>{item.episode}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
      }} />
  )
}

export default Details;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  icon: {
    width: 30,
    height: 30,
  },
  image: {
    width: 100,
    height: 100
  },
  box: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    color: '#333',
    marginHorizontal: 40,
  },
  description: {
    fontSize: 15,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 10
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  iconFonts: {
    color: 'gray',
  },
  red: {
    color: '#FF4500',
  }
});
