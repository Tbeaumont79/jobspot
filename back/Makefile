clean:
	rm -rf /var/cache
	symfony console cache:clear

install:
	symfony composer install
	symfony console d:m:c
	symfony console d:m:m
	symfony console doctrine:fixtures:load

start:
	symfony serve --allow-http

re:
	make clean
	make start
