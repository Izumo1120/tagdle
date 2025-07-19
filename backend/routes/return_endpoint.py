from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date
from models.database import get_db_connection

return_endpoint = APIRouter()

class ItemBase(BaseModel):
    name: str
    category_id: int
    identifier: str
    image_id: int
    location_id: int
    status: Optional[bool] = False
    qrcode_path: Optional[str] = None

class History(BaseModel):
    id: int
    item_id: int
    user_id: int
    borrow_date: date
    return_date: date

class Item(ItemBase):
    id: int
    created_at: Optional[date]

@return_endpoint.post("/items/{item_id}/return", response_model=Item)
def return_item(item_id: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # ステータスをFalseに（未貸出状態）
        cursor.execute("UPDATE Items SET status = 0 WHERE id = %s", (item_id,))
        conn.commit()

        cursor.execute("""
            SELECT id FROM Histories
            WHERE item_id = %s AND return_date IS NULL
            ORDER BY borrow_date DESC
            LIMIT 1
        """, (item_id,))
        history = cursor.fetchone()

        if history:
            cursor.execute("""
                UPDATE Histories
                SET return_date = %s
                WHERE id = %s
            """, (datetime.now(), history['id']))
            conn.commit()


        cursor.execute("SELECT * FROM Items WHERE id = %s", (item_id,))
        item = cursor.fetchone()
        if item is None:
            raise HTTPException(status_code=404, detail="Item not found")
        return item

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
