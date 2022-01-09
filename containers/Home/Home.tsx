import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { getAnimesByName } from '../../api/api.js';
import ListView from '../../components/ListView/ListView.js';

interface AnimeList {
  results : Array<AnimeInfo>
}

interface AnimeInfo {
  mal_id: number,
  url: string,
  image_url: string,
  title: string,
  synopsis: string
}

const Home = ({ navigation } : any) => {
  const [items, setItems] = useState<Array<AnimeInfo>>([]);
  const [searchQuery, setSearchQuery] = useState('gal');
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  const searchAnime = () => {
    getAnimesByName(searchQuery, (res: AnimeList) => {
      console.log(res)
      setItems(res.results);
      setLoading(false);
    }, (_: any) => {
      setIsError(true);
      setLoading(false);
    });
  }
  useEffect(() => {
    searchAnime()
  }, []);

  const onSubmit = () => {
      setLoading(true);
      searchAnime();
  };

  const convertToCommonItem = (item: AnimeInfo) => {
    return {
      id: item.mal_id,
      title: item.title,
      imgUrl: item.image_url,
      description: item.synopsis,
    }
  }

  const onItemPressed = (item: any) => {
    navigation.navigate('Details', { id: item.id, title: item.title });
  }

  if (isLoading) return <ActivityIndicator />;
  if (isError) return (<View><Text>Fail to fetch data</Text></View>);

  return (
    <View style={{ height: '100%' }}>
      <TextInput
        placeholder="Anime name..."
        onSubmitEditing={onSubmit}
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        style={styles.searchBar}
      />
      <ListView items={items} convertToCommonItem={convertToCommonItem} onItemPressed={onItemPressed} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchBar: {
    padding:10,
    margin:10,
  }
});
