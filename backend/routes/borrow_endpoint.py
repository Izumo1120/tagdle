from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import List
from datetime import date
import mysql.connector as mydb
from mysql.connector import Error

from models.database import get_db_connection

borrow_endpoint = APIRouter()

class BorrowRequest(BaseModel):
    user_id: int
    item_id: int

@borrow_endpoint.post("/items/borrow")
def borrow(request: BorrowRequest):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # 現在借りているユーザーを確認
        cursor.execute("""
            SELECT user_id FROM Histories
            WHERE item_id = %s AND return_date IS NULL
            LIMIT 1;
        """, (request.item_id,))
        result = cursor.fetchone()

        # すでに貸し出されている
        if result:
            if result["user_id"] == request.user_id:
                # 同じユーザーなので何もしない
                return JSONResponse(content={"message": "すでにこのユーザーが借りています。処理はスキップされました。"})
            else:
                # 別のユーザーが借りている → エラー
                raise HTTPException(status_code=400, detail="別のユーザーがこの物品を借りています。")
        
        # 貸出されていない → 新たに貸出処理
        cursor.execute("""
            INSERT INTO Histories (item_id, user_id, borrow_date)
            VALUES (%s, %s, %s)
        """, (request.item_id, request.user_id, date.today()))

        cursor.execute("UPDATE Items SET status = TRUE WHERE id = %s", (request.item_id,))
        connection.commit()

        return JSONResponse(content={
            "message": "貸出処理が完了しました。",
                "item_id": request.item_id
            })

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
