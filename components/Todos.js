import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");

  const add = () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        completed: false,
      });
      setTodo("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.header}>My ToDo List</Text>
        <View style={styles.topView}>
          <TextInput
            style={styles.input}
            placeholder="Enter todo"
            onChangeText={(text) => setTodo(text)}
            value={todo}
          />
          <TouchableOpacity style={styles.addButton} onPress={() => add()}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <View>
          {props.todos.length > 0 &&
            props.todos.map((item) => {
              return <Text style={styles.list} key={item.id}>{item.item}</Text>;
            })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  

  topView:{
    flexDirection:'row',
    marginBottom:30
  },

  header: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 100,
  },

  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginRight:20,
    borderRadius:10
  },
  addButton: {
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width:90,
    textAlign:'center',
    paddingLeft:30,
    paddingTop:10,
    height:40
  },

  list:{
    color:'white',
    fontSize:20,
    borderWidth:1,
    marginTop:15,
    backgroundColor:'#4367de',
    borderColor:'#4367de',
    borderRadius:15,
    paddingLeft:20,
    height:40,
    paddingTop:5
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
