<?php

namespace App\DataFixtures;

use App\Entity\Offer;
use App\Entity\Company;
use App\Entity\Tag;
use App\Enum\StatusEnum;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class OfferFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $company = $this->getReference('main-company', Company::class);
        $offer = new Offer();
        $offer->setTitle('Software Engineer');
        $offer->setDescription('We are looking for a software engineer with 5 years of experience in PHP, Symfony, Laravel, React, Vue, Angular, Node, Python, Java, C#');
        $offer->setContractType('CDI');
        $offer->setSalary('100000');
        $offer->setCreatedAt(new \DateTimeImmutable('now'));
        $offer->setStatus(StatusEnum::PENDING);
        $offer->setCompany($company);

        $tagNames = ['php', 'symfony', 'laravel', 'react', 'vue', 'angular', 'node', 'python', 'java', 'c#', 'c++', 'c'];
        foreach ($tagNames as $tagName) {
            $tag = $this->getReference('tag-' . $tagName, Tag::class);
            $offer->addTag($tag);
        }

        $manager->persist($offer);
        $this->addReference('main-offer', $offer);
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CompanyFixtures::class,
            TagFixtures::class,
        ];
    }
}
