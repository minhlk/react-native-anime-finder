import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput
} from 'react-native';

import Jikan from '../../api/jikan/jikan-node.js';
const mal = new Jikan();

const Home = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('gal');
  const [isLoading, setLoading] = useState(true);

  const getItems = async () => {
    try {
      const response = await mal.search('anime', searchQuery, { page: 1 });
      setItems(response.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  const onSubmit = () => {
      setLoading(true);
      getItems();
  };

  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={{
      height: '100%',
    }}>
    <TextInput
      placeholder="Anime name..."
      onSubmitEditing={onSubmit}
      onChangeText={(query) => setSearchQuery(query)}
      value={searchQuery}
      style={styles.searchBar}
    />
    <FlatList
      style={styles.container}
      enableEmptySections={true}
      data={items}
      keyExtractor={(item) => {
        return item.mal_id;
      }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => { navigation.navigate('Details', { ep_id: item.mal_id, title: item.title }) }}>
            <View style={styles.box}>
              <Image style={styles.image} source={{ uri: item.image_url }} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.title}</Text>
                <View style={styles.row}>
                  <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>{item.synopsis}</Text>
                  <View style={styles.iconContainer}>
                    <Image style={styles.icon} source={{ uri: "https://img.icons8.com/color/70/000000/filled-like.png" }} />
                    <Text style={styles.iconFonts}>{item.score}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
      }} />
      </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchBar: {
    padding:10,
    margin:10,
  },
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
    marginTop: 10,
    color: '#333',
    marginHorizontal: 40,
  },
  description: {
    flex: 4,
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
