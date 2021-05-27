import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const Opacity = () => {
  const onStartAnimation = () => console.log('Start Animation');
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onStartAnimation()}>
        <Animated.View style={[styles.box]} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Opacity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 5,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
  },
});
