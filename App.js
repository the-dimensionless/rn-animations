/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Opacity from './src/animating-properties/index';

const App: () => Node = () => {
  return (
    <SafeAreaView style={styles.parent}>
      <Opacity />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});

export default App;
