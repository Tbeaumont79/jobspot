<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Sector;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class CompanyFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $company = new Company();
        $company->setName('Apple');
        $company->setDescription('Apple is a technology company that designs and sells smartphones, tablets, computers, and other consumer electronics.');

        $sector = $this->getReference('sector-it', Sector::class);
        $company->setSector($sector);

        $companyUser = $this->getReference('company-user', User::class);
        $companyUser->setCompany($company);

        $manager->persist($companyUser);
        $manager->persist($company);
        $this->addReference('main-company', $company);
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            SectorFixtures::class,
            UserFixtures::class,
        ];
    }
}
