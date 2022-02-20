import flask
import waitress
from flask_cors import CORS

import config
from factory.i_controller_factory import IControllerFactory
from factory.controller_factory import ControllerFactory


class App:
    def __init__(self, factory: IControllerFactory) -> None:
        self.factory = factory

    def run(self) -> None:
        app = flask.Flask(__name__)
        CORS(app)

        controllers = self.factory.get_controllers()

        for controller in controllers:
            app.register_blueprint(controller.initialize())

        waitress.serve(app, host=config.HOST, port=config.PORT)


if __name__ == '__main__':
    fac = ControllerFactory(config)
    App(fac).run()
