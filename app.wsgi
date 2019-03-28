#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/exeplore") # change the path here

from exeplore import app as application
application.secret_key = '059f6149da04da2e13915d6993322e7b'

