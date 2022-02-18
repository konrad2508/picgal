import flask
import waitress
from flask_cors import CORS

import config
import controllers.image_controller as image
import controllers.query_controller as query


app = flask.Flask(__name__)
CORS(app)

app.register_blueprint(image.construct_blueprint(
    route_prefix=config.ROUTE_PREFIX
))

app.register_blueprint(query.construct_blueprint(
    route_prefix=config.ROUTE_PREFIX
))

waitress.serve(app, host=config.HOST, port=config.PORT)
