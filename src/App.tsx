import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { Todo } from './types/Todo';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const resetUser = useCallback(() => {
    return setSelectedUserId(0);
  }, []);

  const loadTodos = useCallback(async () => {
    setTodos(await getTodos());
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          setUserId={setSelectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              id={selectedUserId}
              resetUser={resetUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
