import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  searchBar: {
    padding: 10,
    margin: 10,
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
