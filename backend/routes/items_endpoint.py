from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import List
from datetime import date
import mysql.connector as mydb
from mysql.connector import Error

from models.database import get_db_connection

class ItemCreate(BaseModel):
    name: str
    category_id: int
    identifier: str
    image_id: int
    location_id: int
    status: bool
    created_at: date

class ItemResponse(BaseModel):
    id: int
    name: str
    category_id: int
    identifier: str
    image_id: int
    location_id: int
    status: bool
    qrpath: str
    created_at: date

items_endpoint = APIRouter()

@items_endpoint.get("/items",response_model=List[ItemResponse], tags=["items"])
def get_items():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Items")
        items = cursor.fetchall()
        json_items = jsonable_encoder(items)
        return JSONResponse(content=json_items, media_type="application/json; charset=utf-8")
        # return items
    except Error as e:
        return {"error": str(e)}
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

@items_endpoint.post("/items", tags=["items"])
def add_item(data: ItemCreate):
    try:
        # JSONデータを取得
        name = data.name
        category_id = data.category_id
        identifier = data.identifier
        image_id = data.image_id
        location_id = data.location_id
        status = data.status
        created_at = data.created_at
        

        # # バリデーション
        # if not title:
        #     return jsonify({"error": "Title is required"}), 400

        # # statusの値チェック
        # if status not in ['todo', 'doing', 'done']:
        #     return jsonify({"error": "Invalid status value"}), 400

        # # priorityの値チェック
        # if priority not in ['1', '2', '3']:
        #     return jsonify({"error": "Invalid priority value"}), 400

        # データベース処理
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                query = """
                INSERT INTO Items (name, category_id, identifier, image_id, location_id, status, created_at) 
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(query, (name, category_id, identifier, image_id, location_id, status, created_at))
            connection.commit()

            # 新しく追加されたタスクのIDを取得
            with connection.cursor() as cursor:
                cursor.execute("SELECT LAST_INSERT_ID()")
                item_id = cursor.fetchone()[0]

            return {
                "success": True, 
                "message": "Item added successfully",
                "task_id": item_id
            }, 201

        except Exception as e:
            connection.rollback()
            raise e
        finally:
            connection.close()

    except Exception as e:
        return {"error": str(e)}, 500

