<?php

namespace App\DataFixtures;

use App\Entity\Tag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class TagFixtures extends Fixture
{

    public function load(ObjectManager $manager): void
    {
        $techLanguagesTags = ["PHP", "Symfony", "Laravel", "React", "Vue", "Angular", "Node", "Python", "Java",
         "C#", "C++", "C", "Ruby", "Go", "Kotlin", "Swift", "Dart", "Rust", "Scala", "Haskell", "Erlang",
         "Elixir", "OCaml", "F#", "Julia", "R", "SQL", "NoSQL", "Redis", "MongoDB", "PostgreSQL", "MySQL",
         "SQLite", "Oracle", "Elasticsearch", "Grafana", "InfluxDB", "TimescaleDB", "ClickHouse", "Snowflake", "Databricks", "Hadoop", "Spark",
         "Kafka", "RabbitMQ", "ActiveMQ", "NATS"];

         foreach ($techLanguagesTags as $techLanguageTag) {
            $tag = new Tag();
            $tag->setLabel($techLanguageTag);
            $manager->persist($tag);
            if (in_array($techLanguageTag, ["PHP", "Symfony", "Laravel", "React", "Vue", "Angular", "Node", "Python", "Java", "C#", "C++", "C"])) {
                $this->addReference('tag-' . strtolower($techLanguageTag), $tag);
            }
        }
        $manager->flush();
    }
}
