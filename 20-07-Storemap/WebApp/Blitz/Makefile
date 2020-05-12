


all: runNode runAngular sql
	
runNode:
	node ../backend/server.js &

runAngular:
	ng serve --proxy-config proxy.conf.json &

stop:
	pkill "ng serve"
	pkill "node"
	
sqlStop:
	sudo service mysqld stop

sql:
	sudo service mysqld start
