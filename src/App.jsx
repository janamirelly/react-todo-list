import { useEffect, useState } from "react";
import { ChecklistsWrapper } from "./components/ChecklistsWrapper";
import { Container } from "./components/Container";
import { FabButton } from "./components/FabButton";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Heading } from "./components/Heading";
import { IconPlus, IconSchool } from "./components/icons";
import { SubHeading } from "./components/SubHeading";
import { ToDoItem } from "./components/ToDoItem";
import { ToDoList } from "./components/ToDoList";

function App() {
  // Inicializa a partir do localStorage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("completed");
    return saved ? JSON.parse(saved) : [];
  });

  // Salva no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);

  function handleAddTask() {
    const newTask = {
      id: Date.now(),
      description: "Nova tarefa",
      completed: false,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTodos((prev) => [...prev, newTask]);
  }

  function handleDeleteTask(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    setCompleted((prev) => prev.filter((t) => t.id !== id));
  }

  function handleEditTask(id, newDescription) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, description: newDescription } : t))
    );
    setCompleted((prev) =>
      prev.map((t) => (t.id === id ? { ...t, description: newDescription } : t))
    );
  }

  function handleToggleComplete(id, checked) {
    if (checked) {
      const task = todos.find((t) => t.id === id);
      if (!task) return;
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setCompleted((prev) => [...prev, { ...task, completed: true }]);
    } else {
      const task = completed.find((t) => t.id === id);
      if (!task) return;
      setCompleted((prev) => prev.filter((t) => t.id !== id));
      setTodos((prev) => [...prev, { ...task, completed: false }]);
    }
  }

  return (
    <main>
      <Container>
        <Header>
          <Heading>
            <IconSchool /> Plano de estudos
          </Heading>
        </Header>

        <ChecklistsWrapper>
          <SubHeading>Para estudar</SubHeading>
          <ToDoList>
            {todos.map((t) => (
              <ToDoItem
                key={t.id}
                item={t}
                onDelete={() => handleDeleteTask(t.id)}
                onEdit={(newDesc) => handleEditTask(t.id, newDesc)}
                onToggle={(checked) => handleToggleComplete(t.id, checked)}
              />
            ))}
          </ToDoList>

          <SubHeading>Concluído</SubHeading>
          <ToDoList>
            {completed.map((t) => (
              <ToDoItem
                key={t.id}
                item={t}
                onDelete={() => handleDeleteTask(t.id)}
                onEdit={(newDesc) => handleEditTask(t.id, newDesc)}
                onToggle={(checked) => handleToggleComplete(t.id, checked)}
              />
            ))}
          </ToDoList>

          <Footer>
            <FabButton onClick={handleAddTask}>
              <IconPlus />
            </FabButton>
          </Footer>
        </ChecklistsWrapper>
      </Container>
    </main>
  );
}

export default App;
