import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const Opacity = () => {
  const [animation, setAnimation] = useState(new Animated.Value(1));

  const animatedStyles = {
    opacity: animation,
  };

  const onStartAnimation = () => {
    console.log('Start Animation');
    // type (on variable, {toFinalValue, timeTaken})
    // call to start
    // can take an optional callback
    Animated.timing(animation, {
      toValue: 0,
      duration: 350,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onStartAnimation()}>
        <Animated.View style={[styles.box, animatedStyles]} />
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
