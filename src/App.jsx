import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";

function App() {

  const [items, setItems] = useState([]);
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [drawingNo, setDrawingNo] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {

    const { data, error } = await supabase
      .from("items")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setItems(data);
  }

  async function addItem() {

    const { error } = await supabase
      .from("items")
      .insert([
        {
          item_code: itemCode,
          item_name: itemName,
          drawing_no: drawingNo
        }
      ]);
  
    if (error) {
      console.error(error);
      return;
    }
  
    loadItems();
  
    setItemCode("");
    setItemName("");
    setDrawingNo("");
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>품목관리</h1>

      <div>
      <input
        placeholder="품목코드"
        value={itemCode}
        onChange={(e) => setItemCode(e.target.value)}
      />

      <input
        placeholder="품목명"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <input
        placeholder="도면번호"
        value={drawingNo}
        onChange={(e) => setDrawingNo(e.target.value)}
      />

      <button onClick={addItem}>
        품목 추가
      </button>
    </div>

      <table border="1">
        <thead>
          <tr>
            <th>품목코드</th>
            <th>품목명</th>
            <th>도면번호</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.item_code}</td>
              <td>{item.item_name}</td>
              <td>{item.drawing_no}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;