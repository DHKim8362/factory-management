import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";

function App() {

  const [items, setItems] = useState([]);

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

  return (
    <div style={{ padding: "20px" }}>

      <h1>품목관리</h1>

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