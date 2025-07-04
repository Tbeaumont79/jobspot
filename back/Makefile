clean:
	rm -rf /var/cache
	symfony console cache:clear

install:
	symfony composer install
	symfony console doctrine:migrations:migrate
	symfony console doctrine:fixtures:load