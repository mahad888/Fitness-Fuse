import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ExerciseCard = ({ exercise, onPress, category }) => {
  return (
    <TouchableOpacity onPress={() => onPress(exercise, category)}>
      <View style={styles.card}>
        <Image source={{ uri: exercise.image }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.title}>{exercise.name}</Text>
          <View style={styles.descriptionContainer}>
            <View style={styles.line} />
            <Text style={styles.description}>{exercise.des}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  image: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  line: {
    height: 14,
    width: 3,
    backgroundColor: 'red',
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    color: '#fff',
  },
});

export default ExerciseCard;
