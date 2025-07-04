<?php

namespace App\DataFixtures;

use App\Entity\Candidate;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class CandidateFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $candidate = new Candidate();
        $candidate->setSkills('PHP, Symfony, Laravel, React, Vue, Angular, Node, Python, Java, C#');
        $candidate->setYearsOfExperience(5);
        $candidate->setAvailableAt(new \DateTimeImmutable('now'));
        $candidateUser = $this->getReference('candidate-user', User::class);
        $candidateUser->setCandidate($candidate);

        $manager->persist($candidate);
        $manager->persist($candidateUser);
        $this->addReference('main-candidate', $candidate);
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}
