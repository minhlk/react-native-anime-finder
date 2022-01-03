import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from './ListView.style.js';
import React from 'react';

const ListView = ({ items, convertToCommonItem, onItemPressed }) => {
  items = items.map(convertToCommonItem);
  return (
    <View style={{
      height: '100%',
    }}>
      <FlatList
        style={styles.container}
        enableEmptySections={true}
        data={items}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => onItemPressed(item)}>
              <View style={styles.box}>
                <Image style={styles.image} source={{ uri: item.imgUrl }} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.title}</Text>
                  <View style={styles.row}>
                    <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>{item.description}</Text>
                    {/* <View style={styles.iconContainer}>
                      <Image style={styles.icon} source={{ uri: "https://img.icons8.com/color/70/000000/filled-like.png" }} />
                      <Text style={styles.iconFonts}>{item.score}</Text>
                    </View> */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        }} />
    </View>
  );
}

export default ListView;
