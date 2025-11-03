import "./todo-item.style.css";
import { IconPencil, IconTrash } from "../icons";
import { useState } from "react";

export function ToDoItem({ item, onDelete, onEdit, onToggle }) {
  const styles = ["todo-item"];
  if (item.completed) styles.push("completed");

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.description);

  function startEdit() {
    setValue(item.description);
    setIsEditing(true);
  }

  function saveEdit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onEdit(trimmed);
    setIsEditing(false);
  }

  function cancelEdit() {
    setValue(item.description);
    setIsEditing(false);
  }

  return (
    <li className={styles.join(" ")}>
      <p className="date">
        {new Date(item.createdAt).toLocaleDateString("pt-BR")}
      </p>

      <div className="details">
        <input
          type="checkbox"
          className="checkbox"
          checked={item.completed}
          onChange={(e) => onToggle?.(e.target.checked)}
        />

        {isEditing ? (
          <div className="edit-mode">
            <input
              className="edit-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button className="btn" onClick={saveEdit}>
              Salvar
            </button>
            <button className="btn" onClick={cancelEdit}>
              Cancelar
            </button>
          </div>
        ) : (
          <p className="description">{item.description}</p>
        )}

        <div className="actions">
          <button className="btn" onClick={onDelete}>
            <IconTrash />
          </button>
          <button className="btn" onClick={startEdit}>
            <IconPencil />
          </button>
        </div>
      </div>
    </li>
  );
}
