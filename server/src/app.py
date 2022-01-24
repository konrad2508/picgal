import flask
import waitress
import config
import controllers.image_controller as image
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)

app.register_blueprint(image.construct_blueprint(
    route_prefix=config.ROUTE_PREFIX
))

waitress.serve(app, host=config.HOST, port=config.PORT)
