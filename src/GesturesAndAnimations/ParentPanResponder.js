import React, {useMemo, useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const getDirectionAndColor = ({moveX, moveY, dx, dy}) => {
  console.log('Fn get DC');
  const draggedDown = dy > 30;
  const draggedUp = dy < -30;
  const draggedLeft = dx < -30;
  const draggedRight = dx > 30;
  const isRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width;
  const isBlue = moveY > height - 50 && moveX > 0 && moveX < width;
  let dragDirection = '';

  if (draggedDown || draggedUp) {
    if (draggedDown) {
      dragDirection += 'dragged down ';
    }
    if (draggedUp) {
      dragDirection += 'dragged up ';
    }
  }

  if (draggedLeft || draggedRight) {
    if (draggedLeft) {
      dragDirection += 'dragged left ';
    }
    if (draggedRight) {
      dragDirection += 'dragged right ';
    }
  }

  if (isRed) {
    return `red ${dragDirection}`;
  }
  if (isBlue) {
    return `blue ${dragDirection}`;
  }
  if (dragDirection) {
    return dragDirection;
  }
};

const PanResponderExample = () => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [zoneText, setZoneText] = useState('Still Touchable');

  const panResponderRef = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) =>
          !!getDirectionAndColor(gestureState),
        onPanResponderMove: (evt, gestureState) => {
          // logic
          console.log('Pan Responder is moving');
          const drag = getDirectionAndColor(gestureState);
          setZoneText(drag);
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
      }),
    [],
  );

  const onStartAnimation = () => {
    console.log('Starting animation----');
    setZoneText('I got touched with a parent pan responder');
  };

  return (
    <View style={styles.container} {...panResponderRef.panHandlers}>
      <View style={styles.zone1} />
      <View style={styles.center}>
        <TouchableOpacity onPress={() => onStartAnimation()} style={styles.btn}>
          <Text style={styles.text}>{zoneText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.zone2} />
    </View>
  );
};

export default PanResponderExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zone1: {
    top: 40,
    left: 0,
    right: 0,
    height: 50,
    position: 'absolute',
    backgroundColor: 'red',
  },
  zone2: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    position: 'absolute',
    backgroundColor: 'blue',
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
  },
  btn: {
      borderColor: 'green',
      borderWidth: 3,
  }
});
