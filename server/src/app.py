import flask
import waitress
from flask_cors import CORS

import config
import controller.image_controller as image
import controller.query_controller as query
from factory.concrete_controller_service_factory import ConcreteControllerServiceFactory


app = flask.Flask(__name__)
CORS(app)

controller_service_factory = ConcreteControllerServiceFactory()

app.register_blueprint(image.construct_blueprint(
    factory=controller_service_factory,
    route_prefix=config.ROUTE_PREFIX
))

app.register_blueprint(query.construct_blueprint(
    factory=controller_service_factory,
    route_prefix=config.ROUTE_PREFIX
))

waitress.serve(app, host=config.HOST, port=config.PORT)
