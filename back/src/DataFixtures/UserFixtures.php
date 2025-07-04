<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $adminUser = new User();
        $adminUser->setEmail('admin@admin.com');
        $hashedPassword = $this->passwordHasher->hashPassword($adminUser, 'admin');
        $adminUser->setPassword($hashedPassword);
        $adminUser->setRoles(['ROLE_ADMIN']);
        $manager->persist($adminUser);
        $this->addReference('admin-user', $adminUser);

        $candidateUser = new User();
        $candidateUser->setEmail('candidate@candidate.com');
        $hashedPassword = $this->passwordHasher->hashPassword($candidateUser, 'candidate');
        $candidateUser->setPassword($hashedPassword);
        $candidateUser->setRoles(['ROLE_CANDIDATE']);
        $manager->persist($candidateUser);
        $this->addReference('candidate-user', $candidateUser);

        $companyUser = new User();
        $companyUser->setEmail('company@company.com');
        $hashedPassword = $this->passwordHasher->hashPassword($companyUser, 'company');
        $companyUser->setPassword($hashedPassword);
        $companyUser->setRoles(['ROLE_COMPANY']);
        $manager->persist($companyUser);
        $this->addReference('company-user', $companyUser);

        $manager->flush();
    }
}
