from fastapi import APIRouter, Request, HTTPException, Query
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import List
from datetime import date
import mysql.connector as mydb
from mysql.connector import Error

from models.database import get_db_connection

qr_endpoint = APIRouter()

@qr_endpoint.get("/items/{identifier}/status")
def get_status(identifier: str, user_id: int = Query(..., description="ログイン中のユーザーID")):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("SELECT * FROM Items WHERE identifier = %s", (identifier,))
        item = cursor.fetchone()

        if not item:
            raise HTTPException(status_code=404, detail="物品が見つかりません")

        item_id = item["id"]
        status = item["status"]

        # status=False → 借りられていない → 借りられる状態
        if status == False:
            return JSONResponse(content={
                "status": 1,
                "item_id": item_id,
                "name": item["name"]})  # 貸出可能

        # status=True → 借りられている → ユーザーとの一致確認
        cursor.execute("""
            SELECT user_id FROM Histories
            WHERE item_id = %s AND return_date IS NULL
            ORDER BY borrow_date DESC LIMIT 1
        """, (item_id,))
        history = cursor.fetchone()

        if history and history["user_id"] == user_id:
            return JSONResponse(content={
                "status": 2,
                "item_id": item_id,
                "name": item["name"]}) # 自分 → 返却可能
        else:
            return JSONResponse(content={
                "status": 0,
                "item_id": item_id,
                "name": item["name"]})  # 他人 → 貸出中

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
