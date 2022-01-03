import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import ListView from '../../components/ListView/ListView.js';
import { getMovies } from '../../api/api.js';

const Details = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const [isError, setIsError] = useState(false);

  const convertToCommonItem = (item) => {
    return {
      id: item['episode'],
      title: item['title'],
      imgUrl: item['image_url'],
      description: item['episode'],
    }
  }

  useEffect(() => {
    getMovies(route.params.id, (res) => {
      setEpisodes(res.episodes);
      setLoading(false);
    }, (_) => {
      setIsError(true);
      setLoading(false);
    });

    navigation.setOptions({ title: route.params.title });
    return () => {
      setEpisodes([])
    }
  }, []);

  if (isLoading) return <ActivityIndicator />;
  if (isError) return (<View><Text>Fail to fetch data</Text></View>);
  return <ListView items={episodes} convertToCommonItem={convertToCommonItem} onItemPressed={() => console.log('pressed')} />
}

export default Details;
