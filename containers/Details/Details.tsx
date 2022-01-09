import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import ListView from '../../components/ListView/ListView.js';
import { fetchDetails } from '../../actions/fetchDetails';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface EpisodeDetail {
  episode: string,
  title: string,
  image_url: string
}

const Details = (props: any) => {
  const { navigation, route } = props;
  const convertToCommonItem = (item: EpisodeDetail) => {
    return {
      id: item['episode'],
      title: item['title'],
      imgUrl: item['image_url'],
      description: item['episode'],
    }
  }

  useEffect(() => {
    props.fetchDetails(route.params.id)
    navigation.setOptions({ title: route.params.title });
  }, []);

  if (props.isFetching) return <ActivityIndicator/>
  if (props.isError) return (<View><Text>Fail to fetch data</Text></View>);
  return <ListView items={props.detailsList} convertToCommonItem={convertToCommonItem} onItemPressed={() => console.log('pressed')} />
}


const mapStateToProps = state => ({
  detailsList: state.fetchDetails.detailsList,
  isFetching: state.fetchDetails.isFetching,
  isError: state.fetchDetails.isError
});

const mapDispatchToProps = dispatch => ({
  fetchDetails: bindActionCreators(fetchDetails, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details)
