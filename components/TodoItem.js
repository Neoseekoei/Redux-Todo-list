import React, { useRef } from 'react';
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;

  const inputRef = useRef();

  const changeFocus = () => {
    inputRef.current.focus();
  };

  const update = (id, value) => {
    updateTodo({ id, item: value });
  };

  return (
    <View key={item.id} style={styles.card}>
      <Textarea
        ref={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => {
          if (e.nativeEvent.key === 'Enter') {
            update(item.id, inputRef.current.value);
          }
        }}
      />
      <View style={styles.btns}>
        <TouchableOpacity onPress={() => changeFocus()}>
          <FontAwesome name="edit" size={24} color="black" />
        </TouchableOpacity>
        {!item.completed && (
          <TouchableOpacity
            style={{ color: 'green' }}
            onPress={() => completeTodo(item.id)}
          >
            <FontAwesome name="check" size={24} color="green" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{ color: 'red' }}
          onPress={() => removeTodo(item.id)}
        >
          <FontAwesome name="close" size={24} color="red" />
        </TouchableOpacity>
      </View>
      {item.completed && <Text style={styles.completed}>done</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 140,
    backgroundColor: '#eee'
  },
  btns: {
    // Your button styles
  },
  completed: {
    // Your completed label styles
  },
});

export default TodoItem;