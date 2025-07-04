<?php

namespace App\DataFixtures;

use App\Entity\Apply;
use App\Entity\Candidate;
use App\Entity\Offer;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ApplyFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $candidate = $this->getReference('main-candidate', Candidate::class);

        $offer = $this->getReference('main-offer', Offer::class);
        $apply = new Apply();
        $apply->setMessage('I am interested in this offer');
        $apply->setCreatedAt(new \DateTimeImmutable('now'));
        $apply->setStatus('pending');
        $apply->setOffer($offer);
        $apply->addCandidate($candidate);
        $manager->persist($apply);
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CandidateFixtures::class,
            OfferFixtures::class,
        ];
    }
}
