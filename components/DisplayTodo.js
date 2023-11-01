import React, { useState } from "react";
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};
 console.log(mapDispatchToProps)
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
  };
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");
  return (
    <View className="displaytodos">
      <View className="buttons">

        <TouchableOpacity
          onPress={() => setSort("active")}
        >
         <Text> Active</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSort("completed")}
        >
         <Text> Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSort("all")}
        >
          <Text>All</Text>
        </TouchableOpacity>

      </View>

      <View>

          {props.todos.length > 0 && sort === "active"
            ? props.todos.map((item) => {
                return (
                  item.completed === false && (

                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />

                  )
                );
              })
            : null}
          {/* for completed items */}
          {props.todos.length > 0 && sort === "completed"
            ? props.todos.map((item) => {
                return (
                  item.completed === true && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            : null}
          {/* for all items */}
          {props.todos.length > 0 && sort === "all"
            ? props.todos.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    completeTodo={props.completeTodo}
                  />
                );
              })
            : null}

      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);