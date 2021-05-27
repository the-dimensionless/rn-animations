import React, {useEffect, useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const SpringValueFunction = () => {
  const [animation, setAnimation] = useState(new Animated.Value(1));

  const animatedStyles = {
    transform: [
      {
        scale: animation,
      },
    ],
  };

  useEffect(() => {
    console.log('Inside use Effect');
    const listenerId = animation.addListener(({value}) => {
      console.log('Animation Event listener val', value);
    });
    console.log('listener Id', listenerId);

    return () => {
      animation.removeListener(listenerId);
      console.log('listener removed with id', listenerId);
    };
  }, [animation]);

  // high tension, more springy spring.
  // high friction quicker spring will slow down.
  // low friction, bouncier
  const onStartAnimation = () => {
    console.log('Start Animation');
    Animated.spring(animation, {
      toValue: 2,
      friction: 2, // default is 7 (it slows it down)
      tension: 160, // (energy/springy) it paces it up
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
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

export default SpringValueFunction;

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
