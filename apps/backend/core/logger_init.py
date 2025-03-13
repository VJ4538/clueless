from loguru import logger


def init_logging():
    """
    The log config module is specifically defined to be used as a global log config for log
    """
    log_fmt = "{level: <10} | {time:MMM} {time:DD} {time:YYYY} | {time:hh:mm A} | {name: <20} [{line}] | {message}"
    logger.add("logs/{time:DD-MMM-YYYY}.log", rotation="1 day", format=log_fmt, retention="1 month", colorize=True)
    logger.info("Loguru library initialized")
    