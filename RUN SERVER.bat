:REP
@echo START SERVER...
@set DEFAULT_DIR=C:\Users\User\Desktop\NODE.JS\git_tutorial\work\cwp-03\DEFAULT_DIR
@set M_CONN=2
@echo DEFAULT_DIR = %DEFAULT_DIR%
@echo MAX_CONNECTIONS = %M_CONN%
@node server.js
@echo PRESS KEY FOR RESTART SERVER
@PAUSE
@cls
@goto REP