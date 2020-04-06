import React, { useReducer, ReactElement, useEffect, useCallback } from "react";
import { TodoContext } from "./todoContext";
import {
  TodoItems,
  TodoItem,
  Actions,
  Types,
  TodoContextType,
} from "../../types";

export interface TodoStateType {
  todos: TodoItems;
  isLoading: boolean;
  error: Error | null;
}

const initState: TodoStateType = {
  todos: [],
  isLoading: false,
  error: null,
};

export const reducer = (
  state: TodoStateType,
  action: Actions
): TodoStateType => {
  switch (action.type) {
    case Types.ADD_TODO: {
      return { ...state, todos: [action.payload, ...state.todos] };
    }
    case Types.REMOVE_TODO: {
      const todos = state.todos.filter(({ id }) => id !== action.payload);
      return { ...state, todos };
    }
    case Types.TOGGLE_TODO: {
      const todos = state.todos.map((el) => {
        if (el.id !== action.payload.id) {
          return { ...el };
        } else return { ...el, ...{ isComplete: action.payload.value } };
      });
      return { ...state, todos };
    }
    case Types.EDIT_TODO: {
      const todos = state.todos.map((el) => {
        if (el.id !== action.payload.id) {
          return { ...el };
        } else return { ...el, ...{ text: action.payload.value } };
      });
      return { ...state, todos };
    }
    case Types.SET_TODOS: {
      return { ...state, todos: action.payload };
    }
    case Types.SET_ERROR: {
      return { ...state, error: action.payload };
    }
    case Types.SET_LOADING: {
      return { ...state, isLoading: action.payload };
    }
  }
};

const BASE_URL = "https://react-native-tst.firebaseio.com/todos";



export const TodoState: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  
  const [state, dispatch] = useReducer(reducer, initState);

  const getById = useCallback(
    (id: string | null) => {
      if (!id) {
        return null;
      }
      return state.todos.find((el) => el.id === id) || null;
    },
    [state]
  );

  const showLoader = useCallback(
    () => dispatch({ type: Types.SET_LOADING, payload: true }),
    []
  );
  const hideLoader = useCallback(
    () => dispatch({ type: Types.SET_LOADING, payload: false }),
    []
  );
  const setError = useCallback(
    (e: Error) => dispatch({ type: Types.SET_ERROR, payload: e }),
    []
  );
  const clearError = useCallback(
    () => dispatch({ type: Types.SET_ERROR, payload: null }),
    []
  );

  const addTodo: TodoContextType["addTodo"] = async (todo: TodoItem) => {
    const response = await fetch(`${BASE_URL}.json`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ text: todo.text, isComplete: false }),
    });
    const json = await response.json();

    dispatch({
      type: Types.ADD_TODO,
      payload: { id: json.name, text: todo.text, isComplete: false },
    });
  };
  const removeTodo: TodoContextType["removeTodo"] = async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}.json`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    const json = await response.json();

    dispatch({ type: Types.REMOVE_TODO, payload: id });
  };
  const editTodo: TodoContextType["editTodo"] =  async (id: string, value: string, isComplete) => {
    const response = await fetch(`${BASE_URL}/${id}.json`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({text: value})
      });

    dispatch({ type: Types.EDIT_TODO, payload: { id, value} });
  };
  const toggleTodo: TodoContextType["toggleTodo"] = async (id: string, isComplete: boolean) =>{
    const response = await fetch(`${BASE_URL}/${id}.json`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({isComplete})
    });

  
    dispatch({ type: Types.TOGGLE_TODO, payload: {id, value: isComplete} })
  
  }

  const setTodos = useCallback(async () => {
    try {
      clearError();
      showLoader();

      const response = await fetch(`${BASE_URL}.json`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      const json = (await response.json()) as {
        [key: string]: { isComplete: boolean; text: string };
      };
      const todos: TodoItems = Object.entries(
        json
      ).map(([id, { isComplete, text }]) => ({ id, isComplete, text }));

      dispatch({ type: Types.SET_TODOS, payload: todos });
    } catch (e) {
      setError(e);
    } finally {
      hideLoader();
    }
  }, []);

  useEffect(() => {
    setTodos();
  }, [setTodos]);

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
        getById,
        addTodo,
        removeTodo,
        editTodo,
        toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
