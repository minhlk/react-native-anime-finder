import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import ListView from '../../components/ListView/ListView.js';
import { getMovies } from '../../api/api.js';

interface EpisodeList {
  episodes: Array<EpisodeDetail>
}

interface EpisodeDetail {
  episode: string,
  title: string,
  image_url: string
}

const Details = ({ navigation, route } : any) => {
  const [isLoading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState<Array<EpisodeDetail>>([]);
  const [isError, setIsError] = useState(false);

  const convertToCommonItem = (item: EpisodeDetail) => {
    return {
      id: item['episode'],
      title: item['title'],
      imgUrl: item['image_url'],
      description: item['episode'],
    }
  }

  useEffect(() => {
    getMovies(route.params.id, (res: EpisodeList) => {
      setEpisodes(res.episodes);
      setLoading(false);
    }, (_: any) => {
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
