import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput
} from 'react-native';
import ListView from '../../components/ListView/ListView.js';
import { connect } from 'react-redux';
import { fetchAnime } from '../../actions/fetchAnime';
import { bindActionCreators } from 'redux';

interface AnimeInfo {
  mal_id: number,
  url: string,
  image_url: string,
  title: string,
  synopsis: string
}

const Home = ( props: any) => {
  const { navigation } = props;
  const [searchQuery, setSearchQuery] = useState('gal');
  
  useEffect(() => {
    props.fetchAnime(searchQuery);
  }, []);

  const onSubmit = () => {
    props.searchAnime(searchQuery);
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

  if (props.isFetching) {
    return <ActivityIndicator/>
  }
  if (props.isError) return (<View><Text>Fail to fetch data</Text></View>);

  return (
    <View style={{ height: '100%' }}>
      <TextInput
        placeholder="Anime name..."
        onSubmitEditing={onSubmit}
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        style={styles.searchBar}
      />
      <ListView items={props.animeList} convertToCommonItem={convertToCommonItem} onItemPressed={onItemPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    padding:10,
    margin:10,
  }
});

const mapStateToProps = state => ({
  animeList: state.fetchAnime.animeList,
  isFetching: state.fetchAnime.isFetching,
  isError: state.fetchAnime.isError
});

const mapDispatchToProps = dispatch => ({
  fetchAnime: bindActionCreators(fetchAnime, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)