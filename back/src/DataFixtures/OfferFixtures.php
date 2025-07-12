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

        $offer2 = new Offer();
        $offer2->setTitle('Software Engineer 2');
        $offer2->setDescription('We are looking for a software engineer 2 with 5 years of experience in PHP, Symfony, Laravel, React, Vue, Angular, Node, Python, Java, C#');
        $offer2->setContractType('CDI');
        $offer2->setSalary('100000');
        $offer2->setCreatedAt(new \DateTimeImmutable('now'));
        $offer2->setStatus(StatusEnum::PENDING);
        $offer2->setCompany($company);

        $tagNames2 = ['php', 'symfony', 'laravel', 'react', 'vue', 'angular', 'node', 'python', 'java', 'c#', 'c++', 'c'];
        foreach ($tagNames2 as $tagName) {
            $tag = $this->getReference('tag-' . $tagName, Tag::class);
            $offer2->addTag($tag);
        }
        $manager->persist($offer2);
        $this->addReference('main-offer-2', $offer2);
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
