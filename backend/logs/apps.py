from django.apps import AppConfig





class LogsConfig(AppConfig):
    name = 'logs'
    default_auto_field='django.db.models.BigAutoField'

    def ready(self):
      import logs.signals

