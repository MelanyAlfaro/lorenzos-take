import { useState, useEffect } from "react";

import "./DragDropSection.css";

export function DragDropSection({ quest, setWizardButtonMode }) {
  // TODO: Check if this is always valid
  const instruction = "Drag and drop each idea into the correct colum.";
  // Elements of types text and type (negative | positive)
  const items = quest.dragAndDrop.items;

  // Save all the unplaced elemements, at the beggining all
  const [unplaced, setUnplaced] = useState(
    items.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
    })),
  );
  // Colums where to drag the items
  const [columns, setColumns] = useState({ positive: [], negative: [] });
  // Variable use to save the item that is moving, saves id, and from where it's been dragged
  const [draggingItem, setDraggingItem] = useState(null);
  // Saves the name of the are over with are dragging
  const [dragOverZone, setDragOverZone] = useState(null);

  const allPlaced = unplaced.length === 0;

  const allCorrect =
    allPlaced &&
    columns.positive.every((i) => i.type === "positive") &&
    columns.negative.every((i) => i.type === "negative");

  useEffect(() => {
    if (allCorrect) {
      setWizardButtonMode("next");
    } else {
      setWizardButtonMode("disabled");
    }
  }, [allCorrect, setWizardButtonMode]);

  function handleDragStart(event, id, from) {
    setDraggingItem({ id, from });
    event.dataTransfer.effectAllowed = "move";
  }

  function handleDrop(event, to) {
    // Otherwise the browers may block dropping
    event.preventDefault();
    // If there isn't a dragging item right now, we don't need to drop
    if (!draggingItem) return;
    const { id, from } = draggingItem;
    // If when dragging the user placed in the same place, dont do anything
    if (from == to) {
      setDraggingItem(null);
      setDragOverZone(null);
      return;
    }

    // Search and get the item inside unplaced or the colums
    const item =
      from === "unplaced"
        ? unplaced.find((element) => element.id === id)
        : columns[from].find((element) => element.id === id);

    // TODO: check if there is a better way to this
    if (!item) {
      console.warn(`Item ${id} not found in ${from}`);
      return;
    }

    // Take the dropped element from where it was before
    if (from === "unplaced") {
      setUnplaced((prevUnplaced) =>
        prevUnplaced.filter((item) => item.id !== id),
      );
    } else {
      setColumns((prevColumns) => {
        const updatedColumn = prevColumns[from].filter(
          (item) => item.id !== id,
        );
        return { ...prevColumns, [from]: updatedColumn };
      });
    }

    // At item to where it was drop
    if (to === "unplaced") {
      setUnplaced((prevUnplaced) => [...prevUnplaced, item]);
    } else {
      setColumns((prevColumns) => {
        const updatedColumn = [...prevColumns[to], item];
        return { ...prevColumns, [to]: updatedColumn };
      });
    }
  }

  function isCorrect(item, col) {
    return item.type === col;
  }

  return (
    <div className="drag-drop-container">
      <h1>Drag and Drop</h1>
      <p className="dragdrop-instruction">{instruction}</p>
      {/* Unplaced bank */}
      <div
        className={`dragdrop-bank ${dragOverZone === "unplaced" ? "dragdrop-bank-over" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOverZone("unplaced");
        }}
        onDragLeave={() => setDragOverZone(null)}
        onDrop={(event) => handleDrop(event, "unplaced")}
      >
        {unplaced.length === 0 ? (
          <span className="dragdrop-empty">All items placed!</span>
        ) : (
          unplaced.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(event) =>
                handleDragStart(event, item.id, "unplaced")
              }
              onDragEnd={() => {
                setDraggingItem(null);
                setDragOverZone(null);
              }}
              className={`dragdrop-chip-${draggingItem?.id === item.id ? "dragging" : ""}`}
            >
              {item.text}
            </div>
          ))
        )}
      </div>

      {/* Columns */}
      <div className="dragdrop-colums">
        {["positive", "negative"].map((column) => (
          <div
            key={column}
            className={`dragdrop-column dragdrop-column--${column} ${dragOverZone === column ? "dragdrop-column-over" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setDragOverZone(column);
            }}
            onDragLeave={() => setDragOverZone(null)}
            onDrop={(e) => handleDrop(e, column)}
          >
            <div className="dragdrop-column-header">
              <span>{column === "positive" ? "👍" : "👎"}</span>
              <span
                className={`dragdrop-column-title dragdrop-column-title--${column}`}
              >
                {column}
              </span>
            </div>

            <div className="drapdrop-colum-items">
              {columns[column].length === 0 ? (
                <span className="dragdrop-empty">Drop here</span>
              ) : (
                columns[column].map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(event) =>
                      handleDragStart(event, item.id, column)
                    }
                    onDragEnd={() => {
                      setDraggingItem(null);
                      setDragOverZone(null);
                    }}
                    className={`dragdrop-chip dragdrop-chip-placed
                      ${draggingItem?.id === item.id ? "dragdrop-chip-dragging" : ""}
                      ${allPlaced ? (isCorrect(item, column) ? "dragdrop-chip-correct" : "dragdrop-chip-wrong") : ""}
                    `}
                  >
                    {allPlaced && (
                      <span>{isCorrect(item, column) ? "✅" : "❌"}</span>
                    )}
                    {item.text}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Result message */}
      {allPlaced && (
        <div
          className={`dragdrop-result ${allCorrect ? "dragdrop-result--success" : "dragdrop-result--fail"}`}
        >
          {allCorrect
            ? "🎉 Perfect! All items are in the right place."
            : "Some items are in the wrong column. Try again!"}
        </div>
      )}
    </div>
  );
}
