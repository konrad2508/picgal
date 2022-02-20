import flask
import waitress
from flask_cors import CORS

from config import Config, conf
from factory.i_controller_factory import IControllerFactory
from factory.controller_factory import ControllerFactory


class App:
    def __init__(self, cfg: Config, factory: IControllerFactory) -> None:
        self.factory = factory
        self.cfg = cfg

    def run(self) -> None:
        app = flask.Flask(__name__)
        CORS(app)

        controllers = self.factory.get_controllers()

        for controller in controllers:
            app.register_blueprint(controller.initialize())

        waitress.serve(app, host=self.cfg.HOST, port=self.cfg.PORT)


if __name__ == '__main__':
    fac = ControllerFactory(conf)

    App(conf, fac).run()
