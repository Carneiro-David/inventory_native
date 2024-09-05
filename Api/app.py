from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

items = [
    {
        "id": "1",
        "title": "Python Programming",
        "author": "Alice Johnson",
        "year": 2022,
        "cover": "https://via.placeholder.com/150"
    },
    {
        "id": "2",
        "title": "Data Science",
        "author": "Bob Smith",
        "year": 2023,
        "cover": "https://via.placeholder.com/150"
    }
]

# Récupérer tous les livres
@app.route("/items", methods=["GET"])
def get_items():
    return jsonify(items)


# Récupérer un Item par ID
@app.route("/items/<int:item_id>", methods=["GET"])
def get_item(item_id):
    item = next((item for item in items if item["id"] == item_id), None)

    if item is None:

        return jsonify({"message": "Item non trouvé"}), 404

    return jsonify(item)


# Créer un nouveau Item
@app.route("/items", methods=["POST"])
def add_item():
    new_item = request.json
    new_item["id"] = len(items) + 1
    items.append(new_item)

    return jsonify(new_item), 201


# Mettre à jour un Item
@app.route("/items/<int:item_id>", methods=["PUT"])
def update_item(item_id):

    item = next((item for item in items if item["id"] == item_id), None)

    if item is None:

        return jsonify({"message": "Item non trouvé"}), 404

    updated_data = request.json

    item.update(updated_data)

    return jsonify(item)


# Supprimer un Item
@app.route("/items/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):

    item = next((item for item in items if item["id"] == item_id), None)

    if item is None:

        return jsonify({"message": "Item non trouvé"}), 404

    items.remove(item)

    return jsonify({"message": "Item supprimé"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
