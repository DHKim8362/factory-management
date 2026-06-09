import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";

function App() {

  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
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

  async function deleteItem(id) {

    const confirmed = window.confirm(
      "정말 삭제하시겠습니까?"
    );
  
    if (!confirmed) return;
  
    const { error } = await supabase
      .from("items")
      .delete()
      .eq("id", id);
  
    if (error) {
      console.error(error);
      alert("삭제 실패");
      return;
    }
  
    loadItems();
  }

  const filteredItems = items.filter((item) => {

    const keyword = searchText.toLowerCase();
  
    return (
      item.item_code?.toLowerCase().includes(keyword) ||
      item.item_name?.toLowerCase().includes(keyword) ||
      item.drawing_no?.toLowerCase().includes(keyword)
    );
  
  });
  
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
      
      <hr />
      <h3>품목 검색</h3>

        <input
          type="text"
          placeholder="품목코드 또는 품목명 검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
         />
      <hr />
      

    </div>

      <table border="1">
        <thead>
          <tr>
            <th>품목코드</th>
            <th>품목명</th>
            <th>도면번호</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.item_code}</td>
              <td>{item.item_name}</td>
              <td>{item.drawing_no}</td>

              <td>
                <button onClick={() => deleteItem(item.id)}>삭제</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;