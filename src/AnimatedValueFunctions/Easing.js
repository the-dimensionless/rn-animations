import React, {useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const EasingComponent = () => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const animatedStyles = {
    transform: [
      {
        translateY: animation,
      },
    ],
  };

  // @todo Easing documentation
  const onStartAnimation = () => {
    console.log('Start Animation');
    Animated.timing(animation, {
      toValue: 200,
      duration: 500,
      useNativeDriver: true,
      // easing: Easing.back(5),
      // easing: Easing.bounce,
      // easing: Easing.elastic(3),
      easing: Easing.bezier(0.06, 1, 0.86, 0.28),
    }).start(() => {
      Animated.timing(animation, {
        toValue: -200,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onStartAnimation()}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default EasingComponent;

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
