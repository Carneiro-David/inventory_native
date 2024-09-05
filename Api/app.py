from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

items = [
    {
        "id": "1",
        "name": "Jambon de paris",
        "quantity": "100",
        "type": "viande",
        "price": "10",
        "description": "Jambon de paris pur boeuf",
        "cover": "https://via.placeholder.com/150"
    },
    {
        "id": "2",
        "name": "Fromage",
        "quantity": "50",
        "type": "laitier",
        "price": "5",
        "description": "Fromage à pâte dure",
        "cover": "https://via.placeholder.com/150"
    },
    {
        "id": "3",
        "name": "Pain",
        "quantity": "200",
        "type": "boulangerie",
        "price": "2",
        "description": "Pain frais",
        "cover": "https://via.placeholder.com/150"
    },
    {
        "id": "4",
        "name": "Pommes",
        "quantity": "80",
        "type": "fruits",
        "price": "3",
        "description": "Pommes fraîches",
        "cover": "https://via.placeholder.com/150"
    },
    {
        "id": "5",
        "name": "Yaourt",
        "quantity": "30",
        "type": "laitier",
        "price": "1.5",
        "description": "Yaourt nature",
        "cover": "https://via.placeholder.com/150"
    }
]

# Récupérer tous les items
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
