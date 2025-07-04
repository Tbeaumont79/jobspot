<?php

namespace App\DataFixtures;

use App\Entity\Sector;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class SectorFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $sector = new Sector();
        $sector->setName('IT');
        $manager->persist($sector);
        $this->addReference('sector-it', $sector);
        $manager->flush();
    }
}
